#!/usr/bin/env python3
"""Ferramenta de manutencao da Central de Materiais IOSEI.

Uso:
  python3 tools/portal.py add --produto swiftmr --tipo brochure --titulo "Brochure SwiftMR" ARQUIVO [ARQUIVO...]
      opcoes: --idioma pt|es|en  --evento "CONAHP 2026"  --descricao "..."  --legenda "..."
              --drive URL (arquivo pesado fica no Drive; o portal guarda so a capa)
              --data AAAA-MM-DD  --sem-comprimir  --id slug-personalizado
  python3 tools/portal.py remove ID
  python3 tools/portal.py list
  python3 tools/portal.py size

Varios arquivos num mesmo add viram um unico item (ex.: carrossel de posts),
com download individual ou em pacote .zip no portal.
"""
import argparse, datetime, json, os, re, shutil, subprocess, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "materiais.json")
FILES = os.path.join(ROOT, "arquivos")
THUMBS = os.path.join(ROOT, "capas")

DRIVE_PASTA = "https://drive.google.com/drive/folders/1yaUApTPEGyFXMgdc77y6eUH4zON666Fc"  # MATERIAIS IOSEI, leitura publica
LIMITE_SITE_MB = 1024          # teto do GitHub Pages
ALERTA_SITE_MB = 750           # aviso antecipado
MAX_ARQUIVO_MB = 45            # acima disso, vai para o Drive
PDF_COMPRIMIR_ACIMA_MB = 4

PRODUTOS = ["iosei", "swiftmr", "swiftsight", "i-rad", "i-print", "i-ris", "i-pacs",
            "claripi", "clariace", "clarict-ai", "claripet-ct", "ms-tecnologia"]
TIPOS = ["brochure", "post", "identidade"]  # identidade = logos e manual de marca

IMG = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}
VID = {".mp4", ".mov", ".webm", ".m4v"}


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def load():
    if not os.path.exists(DATA):
        return []
    with open(DATA, encoding="utf-8") as f:
        return json.load(f)


def save(items):
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    items.sort(key=lambda i: i["data"], reverse=True)
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)


def mb(n):
    return n / 1024 / 1024


def site_size():
    total = 0
    for base, dirs, files in os.walk(ROOT):
        if any(p in base for p in (".git", os.sep + "tools")):
            continue
        for fn in files:
            total += os.path.getsize(os.path.join(base, fn))
    return total


def thumb_pdf(src, dst):
    import pymupdf
    d = pymupdf.open(src)
    pg = d[0]
    tb = pg.trimbox
    clip = tb if tb.width < pg.rect.width - 2 else None
    zoom = 900 / max((clip or pg.rect).width, (clip or pg.rect).height)
    pix = pg.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=clip)
    if pix.colorspace and pix.colorspace.n == 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    from PIL import Image
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    info = {"paginas": d.page_count}
    return info, im.size


def thumb_img(src, dst):
    from PIL import Image
    if src.lower().endswith(".svg"):
        import cairosvg, tempfile
        tmp = tempfile.mktemp(suffix=".png")
        cairosvg.svg2png(url=src, write_to=tmp, output_width=1200)
        src = tmp
    im = Image.open(src)
    size = im.size
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (0, 0, 0, 0))
        bg.alpha_composite(im)
        im = bg
        im.thumbnail((900, 900))
        dst = dst[:-4] + ".png"
        im.save(dst, "PNG", optimize=True)
    else:
        im = im.convert("RGB")
        im.thumbnail((900, 900))
        im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    return {"dimensoes": f"{size[0]}x{size[1]}"}, dst


def thumb_video(src, dst):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "1", "-i", src,
                    "-frames:v", "1", "-vf", "scale='min(900,iw)':-2", dst], check=True)
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height:format=duration", "-of", "json", src],
                         capture_output=True, text=True).stdout
    j = json.loads(out)
    st = j.get("streams", [{}])[0]
    dur = float(j.get("format", {}).get("duration", 0) or 0)
    return {"dimensoes": f"{st.get('width')}x{st.get('height')}", "duracao": round(dur)}


def web_pdf(src, dst, comprimir=True):
    """Versao para web: recorta marcas de corte e comprime imagens."""
    import pymupdf
    d = pymupdf.open(src)
    for pg in d:
        tb = pg.trimbox
        if tb.width < pg.rect.width - 2:
            pg.set_cropbox(tb)
    if comprimir and mb(os.path.getsize(src)) > PDF_COMPRIMIR_ACIMA_MB:
        try:
            d.rewrite_images(dpi_threshold=180, dpi_target=150, quality=78)
        except Exception as e:  # noqa
            print("  aviso: compressao de imagens falhou:", e)
    d.save(dst, garbage=4, deflate=True, clean=True)
    if os.path.getsize(dst) > os.path.getsize(src) and not comprimir:
        shutil.copy(src, dst)


def cmd_add(a):
    items = load()
    for p in a.arquivos:
        if not os.path.exists(p):
            sys.exit(f"Arquivo nao encontrado: {p}")
    if a.produto not in PRODUTOS:
        sys.exit(f"Produto invalido. Use: {', '.join(PRODUTOS)}")
    if a.tipo not in TIPOS:
        sys.exit(f"Tipo invalido. Use: {', '.join(TIPOS)}")
    iid = a.id or slugify(a.titulo)
    base = iid
    n = 2
    while any(i["id"] == iid for i in items):
        iid = f"{base}-{n}"; n += 1
    os.makedirs(os.path.join(FILES, a.produto), exist_ok=True)
    os.makedirs(THUMBS, exist_ok=True)

    arquivos = []
    meta = {}
    capa = None
    for k, src in enumerate(a.arquivos):
        ext = os.path.splitext(src)[1].lower()
        if len(a.arquivos) > 1:
            # varios arquivos: mantem o nome original (ex.: I-RAD_principal_negativa.png)
            stem = re.sub(r"[^A-Za-z0-9_.-]+", "-", unicodedata.normalize("NFKD", os.path.splitext(os.path.basename(src))[0]).encode("ascii", "ignore").decode()).strip("-")
            nome = f"{stem}{ext}"
            os.makedirs(os.path.join(FILES, a.produto, iid), exist_ok=True)
            dst = os.path.join(FILES, a.produto, iid, nome)
            tdst = os.path.join(THUMBS, f"{iid}-{k+1:02d}.jpg")
        else:
            nome = f"{iid}{ext}"
            dst = os.path.join(FILES, a.produto, nome)
            tdst = os.path.join(THUMBS, f"{iid}.jpg")
        if ext == ".pdf":
            info, _ = thumb_pdf(src, tdst)
            if not a.drive:
                web_pdf(src, dst, comprimir=not a.sem_comprimir)
            meta.update(info)
        elif ext in IMG:
            info, tdst = thumb_img(src, tdst)
            if not a.drive:
                shutil.copy(src, dst)
            meta.update(info)
        elif ext in VID:
            info = thumb_video(src, tdst)
            if not a.drive:
                shutil.copy(src, dst)
            meta.update(info)
        else:
            tdst = None
            if not a.drive:
                shutil.copy(src, dst)
        if not a.drive and mb(os.path.getsize(dst)) > MAX_ARQUIVO_MB:
            os.remove(dst)
            sys.exit(f"{os.path.basename(src)} ficou com {mb(os.path.getsize(src)):.0f} MB: "
                     f"suba no Drive e rode de novo com --drive URL")
        capa = capa or (os.path.relpath(tdst, ROOT) if tdst else None)
        if a.drive:
            arquivos.append({"nome": os.path.basename(src), "formato": ext[1:],
                             "tamanho": os.path.getsize(src)})
        else:
            arquivos.append({"nome": nome, "caminho": os.path.relpath(dst, ROOT),
                             "formato": ext[1:], "tamanho": os.path.getsize(dst),
                             "capa": os.path.relpath(tdst, ROOT) if tdst else None})

    item = {
        "id": iid, "titulo": a.titulo, "produto": a.produto, "tipo": a.tipo,
        "idioma": a.idioma, "data": a.data or datetime.date.today().isoformat(),
        "capa": capa, "arquivos": arquivos,
    }
    for campo in ("evento", "descricao", "legenda", "drive"):
        v = getattr(a, campo)
        if v:
            item[campo] = v
    item.update(meta)
    items.append(item)
    save(items)
    print(f"Adicionado: {iid} ({len(arquivos)} arquivo(s))")
    cmd_size(None)


def cmd_remove(a):
    items = load()
    alvo = [i for i in items if i["id"] == a.id]
    if not alvo:
        sys.exit("ID nao encontrado")
    it = alvo[0]
    for arq in it["arquivos"]:
        for k in ("caminho", "capa"):
            p = arq.get(k)
            if p and os.path.exists(os.path.join(ROOT, p)):
                os.remove(os.path.join(ROOT, p))
    if it.get("capa") and os.path.exists(os.path.join(ROOT, it["capa"])):
        os.remove(os.path.join(ROOT, it["capa"]))
    pasta = os.path.join(FILES, it["produto"], it["id"])
    if os.path.isdir(pasta):
        shutil.rmtree(pasta)
    save([i for i in items if i["id"] != a.id])
    print("Removido:", a.id)


def cmd_list(a):
    for i in load():
        tam = sum(x["tamanho"] for x in i["arquivos"])
        onde = "Drive" if i.get("drive") else "site"
        print(f"{i['data']}  {i['produto']:<12} {i['tipo']:<13} {mb(tam):6.1f} MB  {onde:<5} {i['id']}")


def cmd_size(a):
    t = mb(site_size())
    status = "ok"
    if t > ALERTA_SITE_MB:
        status = "ATENCAO: perto do limite, mover arquivos pesados para o Drive"
    print(f"Tamanho do site: {t:.1f} MB de {LIMITE_SITE_MB} MB ({t / LIMITE_SITE_MB:.0%}), {status}")


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    ad = sub.add_parser("add")
    ad.add_argument("arquivos", nargs="+")
    ad.add_argument("--titulo", required=True)
    ad.add_argument("--produto", required=True)
    ad.add_argument("--tipo", required=True)
    ad.add_argument("--idioma", default="pt")
    ad.add_argument("--evento")
    ad.add_argument("--descricao")
    ad.add_argument("--legenda")
    ad.add_argument("--drive")
    ad.add_argument("--data")
    ad.add_argument("--id")
    ad.add_argument("--sem-comprimir", action="store_true")
    ad.set_defaults(f=cmd_add)
    rm = sub.add_parser("remove"); rm.add_argument("id"); rm.set_defaults(f=cmd_remove)
    sub.add_parser("list").set_defaults(f=cmd_list)
    sub.add_parser("size").set_defaults(f=cmd_size)
    a = p.parse_args()
    a.f(a)


if __name__ == "__main__":
    main()
