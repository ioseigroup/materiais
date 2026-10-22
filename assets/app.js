(() => {
  const PRODUTOS = {
    "iosei": { nome: "IOSEI", cor: "#26B9DA" },
    "swiftmr": { nome: "SwiftMR", cor: "#4C78FF" },
    "swiftsight": { nome: "SwiftSight", cor: "#7AA7FF" },
    "i-rad": { nome: "I-RAD", cor: "#5FD3E8" },
    "i-print": { nome: "I-PRINT", cor: "#AEB8C6" },
    "i-ris": { nome: "I-RIS", cor: "#5C86E0" },
    "i-pacs": { nome: "I-PACS", cor: "#2FA3B8" },
    "claripi": { nome: "ClariPI", cor: "#00C8FF" },
    "clariace": { nome: "ClariACE", cor: "#00C8FF", oculto: true },
    "clarict-ai": { nome: "ClariCT.AI", cor: "#00C8FF", oculto: true },
    "claripet-ct": { nome: "ClariPET-CT", cor: "#00C8FF", oculto: true },
    "ms-tecnologia": { nome: "MS Tecnologia", cor: "#9AA8BD" }
  };
  const TIPOS = {
    "brochure": ["Brochure", "Brochures"],
    "post": ["Post", "Posts"],
    "identidade": ["Identidade visual", "Identidade visual"]
  };
  const IDIOMAS = { pt: "Português", es: "Español", en: "English" };
  const IMG = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const VID = ["mp4", "mov", "webm", "m4v"];

  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const semQuebra = (t) => esc(t).replace(/(I-[A-Z]+|Clari[A-Z.\-]+)/g, '<span style="white-space:nowrap">$1</span>');
  const tam = (b) => b > 1048576 ? (b / 1048576).toFixed(1).replace(".", ",") + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
  const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const ICO_BAIXAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>';

  let itens = [];
  const estado = { produto: "todos", tipo: "todos", idioma: "pt", q: "" };

  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/lib/pdf.worker.min.js";
  }

  function aviso(txt) {
    const a = $("#aviso");
    a.textContent = txt;
    a.classList.add("ver");
    clearTimeout(aviso.t);
    aviso.t = setTimeout(() => a.classList.remove("ver"), 2200);
  }

  async function copiar(txt, ok) {
    try { await navigator.clipboard.writeText(txt); }
    catch (e) {
      const t = document.createElement("textarea");
      t.value = txt; document.body.appendChild(t); t.select();
      document.execCommand("copy"); t.remove();
    }
    aviso(ok);
  }

  const prodInfo = (p) => PRODUTOS[p] || { nome: p, cor: "#26B9DA" };
  const formatoItem = (it) => {
    const fs = [...new Set(it.arquivos.map((a) => a.formato.toUpperCase()))];
    return fs.length > 1 ? fs.slice(0, -1).join(", ") + " e " + fs[fs.length - 1] : fs[0];
  };
  const tamanhoItem = (it) => it.arquivos.reduce((s, a) => s + (a.tamanho || 0), 0);
  const capaClara = (it) => it.tipo === "identidade" && it.arquivos[0] && it.arquivos[0].formato !== "pdf";
  const escuroArquivo = (nome) => /negativ|branc|fundo-escuro|avatar/i.test(nome) && !/fundo-branco/i.test(nome);

  function rotuloArquivo(nome) {
    const base = nome.replace(/\.[^.]+$/, "").replace(/^[^_]+_/, "");
    const mapa = { "principal": "Principal", "estendida": "Estendida", "slogan": "Com slogan", "completa": "Completa",
      "reduzida": "Reduzida", "avatar": "Avatar", "cor": "cor", "negativa": "negativa", "mono-preto": "mono preta",
      "mono-branco": "mono branca", "mono-navy": "mono navy", "branca": "branca", "fundo-branco": "Fundo branco", "fundo-escuro": "Fundo escuro" };
    const partes = base.split("_").map((p) => mapa[p] || p);
    let r = partes.join(" ");
    r = r.charAt(0).toUpperCase() + r.slice(1);
    return r;
  }

  /* Filtros */
  function contar(chave, valor) {
    return itens.filter((it) => {
      const e = { ...estado, [chave]: valor };
      return passa(it, e);
    }).length;
  }

  function passa(it, e = estado) {
    if (e.produto !== "todos" && it.produto !== e.produto) return false;
    if (e.tipo !== "todos" && it.tipo !== e.tipo) return false;
    if (e.idioma !== "todos" && it.idioma !== e.idioma && it.idioma !== "neutro") return false;
    if (e.q) {
      const alvo = norm([it.titulo, prodInfo(it.produto).nome, (TIPOS[it.tipo] || [it.tipo])[0], it.evento, it.descricao, it.legenda].join(" "));
      if (!norm(e.q).split(/\s+/).every((w) => alvo.includes(w))) return false;
    }
    return true;
  }

  function montarProdutos() {
    const presentes = Object.keys(PRODUTOS).filter((p) => !PRODUTOS[p].oculto || itens.some((i) => i.produto === p));
    const opcoes = [["todos", "Todos", "#26B9DA"], ...presentes.map((p) => [p, PRODUTOS[p].nome, PRODUTOS[p].cor])];
    $("#produtos").innerHTML = opcoes.map(([v, n, c]) =>
      `<button class="prod" style="--cor:${c}" data-v="${v}" aria-pressed="${estado.produto === v}">${esc(n)}<small>${contar("produto", v)}</small></button>`
    ).join("");
  }

  function montarChips(alvo, chave, mapa, rotuloTodos) {
    const presentes = Object.keys(mapa);
    const opcoes = chave === "tipo"
      ? presentes.map((k) => [k, mapa[k][1]])
      : chave === "idioma"
      ? presentes.map((k) => [k, mapa[k]])
      : [["todos", rotuloTodos], ...presentes.map((k) => [k, Array.isArray(mapa[k]) ? mapa[k][1] : mapa[k]])];
    $(alvo).innerHTML = opcoes.map(([v, n]) => {
      return `<button class="chip" data-chave="${chave}" data-v="${v}" aria-pressed="${estado[chave] === v}">${esc(n)}</button>`;
    }).join("");
  }

  function card(it) {
    const p = prodInfo(it.produto);
    const n = it.arquivos.length;
    const qtd = n > 1 ? `<span class="card__qtd">${n} ${it.tipo === "logo" ? "versões" : "arquivos"}</span>` : "";
    const unico = n === 1 && !it.drive ? it.arquivos[0] : null;
    const rapido = it.drive
      ? `<a class="baixar-rapido" href="${esc(it.drive)}" target="_blank" rel="noopener" data-parar>${ICO_BAIXAR}Drive</a>`
      : unico
        ? `<a class="baixar-rapido" href="${esc(unico.caminho)}" download="${esc(unico.nome)}" data-parar>${ICO_BAIXAR}Baixar</a>`
        : `<button class="baixar-rapido" data-zip="${esc(it.id)}" data-parar>${ICO_BAIXAR}Baixar</button>`;
    return `<article class="card" tabindex="0" data-id="${esc(it.id)}" aria-label="${esc(it.titulo)}">
      <div class="card__capa ${capaClara(it) ? "card__capa--claro card__capa--logo" : ""}">
        ${it.capa ? `<img src="${esc(it.capa)}" alt="" loading="lazy">` : ""}${qtd}
      </div>
      <div class="card__prod" style="--cor:${p.cor}"><i></i>${esc(p.nome)}, ${esc((TIPOS[it.tipo] || [it.tipo])[0].toLowerCase())}</div>
      <h3>${semQuebra(it.titulo)}</h3>
      <div class="card__rodape">
        <span class="card__formato">${formatoItem(it)}, ${tam(tamanhoItem(it))}</span>
        ${rapido}
      </div>
    </article>`;
  }

  function render() {
    montarProdutos();
    montarChips("#tipos", "tipo", TIPOS, "Todos os tipos");
    montarChips("#idiomas", "idioma", IDIOMAS, "Todos os idiomas");
    const lista = itens.filter((i) => passa(i));
    $("#grade").innerHTML = lista.map(card).join("");
    $("#vazio").hidden = lista.length > 0;
    $("#vazio p").textContent = estado.produto !== "todos" && !estado.q
      ? `Ainda não há ${estado.tipo !== "todos" ? TIPOS[estado.tipo][1].toLowerCase() : "materiais"} de ${prodInfo(estado.produto).nome} por aqui.`
      : estado.idioma !== "pt" && !estado.q
      ? `Ainda não há materiais em ${IDIOMAS[estado.idioma].toLowerCase() === "english" ? "inglês" : "espanhol"} por aqui.`
      : "Nenhum material com esses filtros.";
    $("#contagem").textContent = lista.length === 1 ? "1 material" : `${lista.length} materiais`;
  }

  function pilha() {
    const capas = itens.filter((i) => i.tipo === "brochure" && i.capa).slice(0, 5);
    const pos = [
      { x: "-150px", y: "18px", r: "-13deg" },
      { x: "-72px", y: "-22px", r: "-6deg" },
      { x: "0px", y: "-36px", r: "0deg" },
      { x: "74px", y: "-14px", r: "6deg" },
      { x: "148px", y: "24px", r: "12deg" }
    ];
    const el = $("#pilha");
    const pequeno = matchMedia("(max-width: 900px)").matches;
    el.innerHTML = capas.map((c, k) => {
      const p = pos[k + Math.floor((5 - capas.length) / 2)];
      const f = pequeno ? 0.62 : 1;
      const sx = (v) => `${parseFloat(v) * f}px`;
      return `<figure data-id="${esc(c.id)}" style="--x:${sx(p.x)};--y:${sx(p.y)};--r:${p.r};z-index:${k === 2 ? 5 : 5 - Math.abs(2 - k)}"><img src="${esc(c.capa)}" alt=""></figure>`;
    }).join("");
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("aberta")));
  }

  /* Visor */
  let pdfTarefa = 0;

  async function mostrarPdf(palco, url) {
    const minha = ++pdfTarefa;
    palco.innerHTML = '<p class="palco__carregando">Carregando páginas</p>';
    try {
      const doc = await pdfjsLib.getDocument(url).promise;
      if (minha !== pdfTarefa) return;
      palco.innerHTML = "";
      const largura = Math.min(palco.clientWidth - 56, 900);
      for (let n = 1; n <= doc.numPages; n++) {
        if (minha !== pdfTarefa) return;
        const pg = await doc.getPage(n);
        const v1 = pg.getViewport({ scale: 1 });
        const escala = (largura / v1.width) * Math.min(window.devicePixelRatio || 1, 2);
        const vp = pg.getViewport({ scale: escala });
        const c = document.createElement("canvas");
        c.className = "palco__pagina";
        c.width = vp.width; c.height = vp.height;
        c.style.width = largura + "px";
        palco.appendChild(c);
        await pg.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise;
      }
    } catch (e) {
      palco.innerHTML = `<p class="palco__carregando">Não foi possível mostrar a prévia. Use o botão de download.</p>`;
    }
  }

  function abrir(id, empurrar = true) {
    const it = itens.find((i) => i.id === id);
    if (!it) return;
    const p = prodInfo(it.produto);
    const palco = $("#palco");
    const info = $("#info");
    palco.className = "visor__palco" + (capaClara(it) ? " visor__palco--claro" : "");
    pdfTarefa++;

    const a0 = it.arquivos[0];
    if (it.drive) {
      palco.innerHTML = it.capa ? `<img class="palco__img" src="${esc(it.capa)}" alt="Capa de ${esc(it.titulo)}">` : "";
    } else if (a0.formato === "pdf") {
      mostrarPdf(palco, a0.caminho);
    } else if (VID.includes(a0.formato)) {
      palco.innerHTML = `<video class="palco__video" src="${esc(a0.caminho)}" controls playsinline poster="${esc(it.capa || "")}"></video>`;
    } else {
      const varias = it.arquivos.length > 1;
      if (it.tipo === "identidade" && varias) {
        palco.className = "visor__palco visor__palco--claro";
        const ordem = ["principal_cor", "cor", "principal_negativa", "branca", "principal_mono-preto", "mono-preto", "principal_mono-branco", "mono-branco",
          "principal_mono-navy", "estendida_cor", "estendida_negativa", "slogan_cor", "completa_cor", "completa_negativa",
          "reduzida_cor", "reduzida_mono-preto", "reduzida_mono-branco", "avatar", "fundo-branco", "fundo-escuro"];
        const grupos = {};
        it.arquivos.forEach((a) => {
          const chave = a.nome.replace(/\.[^.]+$/, "");
          (grupos[chave] = grupos[chave] || []).push(a);
        });
        const pos = (k) => { const v = k.replace(/^[^_]+_/, ""); const i = ordem.indexOf(v); return i < 0 ? 99 : i; };
        const chaves = Object.keys(grupos).sort((x, y) => pos(x) - pos(y));
        palco.innerHTML = `<div class="galeria">${chaves.map((k) => {
          const fs = grupos[k].sort((x, y) => (x.formato === "svg") - (y.formato === "svg"));
          const ver = fs.find((f) => f.formato !== "svg") || fs[0];
          const rotulo = rotuloArquivo(ver.nome);
          const fundo = ver.formato === "jpg" ? "galeria__item--foto" : (escuroArquivo(ver.nome) ? "galeria__item--escuro" : "");
          return `<div class="galeria__item ${fundo}">
            <span class="galeria__img"><img src="${esc(ver.caminho)}" alt="${esc(rotulo)}" loading="lazy"></span>
            <span class="galeria__nome">${esc(rotulo)}</span>
            <span class="galeria__baixar">${fs.map((f) => `<a href="${esc(f.caminho)}" download="${esc(f.nome)}">${ICO_BAIXAR}${f.formato.toUpperCase()}<small>${tam(f.tamanho)}</small></a>`).join("")}</span>
          </div>`;
        }).join("")}</div>`;
      } else {
        palco.innerHTML = it.arquivos.map((a, k) => IMG.includes(a.formato)
          ? `<img class="palco__img ${varias ? "palco__img--varias" : ""}" src="${esc(a.caminho)}" alt="${esc(it.titulo)}, arquivo ${k + 1}" loading="lazy">`
          : "").join("");
      }
    }

    const dados = [
      ["Tipo", (TIPOS[it.tipo] || [it.tipo])[0]],
      ["Formato", formatoItem(it)],
      ["Tamanho", tam(tamanhoItem(it))],
      it.paginas ? ["Páginas", it.paginas] : null,
      it.dimensoes && it.arquivos.length === 1 ? ["Dimensões", it.dimensoes.replace("x", " x ") + " px"] : null,
      it.duracao ? ["Duração", `${Math.floor(it.duracao / 60)}:${String(it.duracao % 60).padStart(2, "0")}`] : null,
      it.idioma !== "neutro" ? ["Idioma", IDIOMAS[it.idioma] || it.idioma] : null,
      it.evento ? ["Evento", it.evento] : null,
      ["Atualizado em", new Date(it.data + "T12:00").toLocaleDateString("pt-BR")]
    ].filter(Boolean);

    let acoes;
    if (it.drive) {
      acoes = `<a class="btn btn--cheio" href="${esc(it.drive)}" target="_blank" rel="noopener">${ICO_BAIXAR}Baixar pelo Drive</a>`;
    } else if (it.arquivos.length === 1) {
      acoes = `<a class="btn btn--cheio" href="${esc(a0.caminho)}" download="${esc(a0.nome)}">${ICO_BAIXAR}Baixar ${esc(a0.formato.toUpperCase())}</a>`;
    } else {
      acoes = `<button class="btn btn--cheio" data-zip="${esc(it.id)}">${ICO_BAIXAR}Baixar todos (.zip)</button>`;
    }
    acoes += `<button class="btn btn--linha" data-link="${esc(it.id)}">Copiar link deste material</button>`;

    const lista = !it.drive && it.arquivos.length > 1 && it.tipo !== "identidade"
      ? `<div><h4>Arquivos</h4><div class="info__arquivos">${it.arquivos.map((a) =>
          `<a href="${esc(a.caminho)}" download="${esc(a.nome)}">${esc(a.nome)}<span>${tam(a.tamanho)}</span></a>`).join("")}</div></div>`
      : "";
    const legenda = it.legenda
      ? `<div><h4>Legenda aprovada</h4><div class="info__legenda">${esc(it.legenda)}</div>
         <button class="btn btn--linha" style="margin-top:10px;width:100%" data-legenda="${esc(it.id)}">Copiar legenda</button></div>`
      : "";

    info.innerHTML = `
      <div>
        <div class="card__prod" style="--cor:${p.cor}"><i></i>${esc(p.nome)}</div>
        <h2 id="visor-titulo">${semQuebra(it.titulo)}</h2>
      </div>
      ${it.descricao ? `<p class="info__desc">${esc(it.descricao)}</p>` : ""}
      <div class="info__acoes">${acoes}</div>
      ${legenda}
      ${lista}
      <dl class="info__dados">${dados.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;

    $("#visor").hidden = false;
    document.body.style.overflow = "hidden";
    $(".visor__fechar").focus();
    if (empurrar) history.pushState(null, "", "#m/" + it.id);
  }

  function fechar(voltar = true) {
    if ($("#visor").hidden) return;
    pdfTarefa++;
    $("#visor").hidden = true;
    $("#palco").innerHTML = "";
    document.body.style.overflow = "";
    if (voltar && location.hash.startsWith("#m/")) history.pushState(null, "", location.pathname + location.search);
  }

  async function baixarZip(id, botao) {
    const it = itens.find((i) => i.id === id);
    if (!it || !window.JSZip) return;
    const orig = botao.innerHTML;
    botao.disabled = true;
    botao.textContent = "Preparando pacote";
    try {
      const zip = new JSZip();
      await Promise.all(it.arquivos.map(async (a) => {
        const r = await fetch(a.caminho);
        zip.file(a.nome, await r.blob());
      }));
      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = it.id + ".zip";
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 4000);
    } catch (e) {
      aviso("Não deu para montar o pacote. Baixe os arquivos um a um.");
    }
    botao.disabled = false;
    botao.innerHTML = orig;
  }

  /* Eventos */
  document.addEventListener("click", (e) => {
    const t = e.target;
    const zip = t.closest("[data-zip]");
    if (zip) { e.stopPropagation(); baixarZip(zip.dataset.zip, zip); return; }
    if (t.closest("[data-parar]")) return;
    const link = t.closest("[data-link]");
    if (link) { copiar(location.origin + location.pathname + "#m/" + link.dataset.link, "Link copiado"); return; }
    const leg = t.closest("[data-legenda]");
    if (leg) { copiar(itens.find((i) => i.id === leg.dataset.legenda).legenda, "Legenda copiada"); return; }
    if (t.closest("[data-fechar]")) { fechar(); return; }
    const prod = t.closest(".prod");
    if (prod) { estado.produto = prod.dataset.v; render(); return; }
    const chip = t.closest(".chip");
    if (chip) { const k = chip.dataset.chave, v = chip.dataset.v; estado[k] = (k === "tipo" && estado[k] === v) ? "todos" : v; render(); return; }
    const c = t.closest(".card, .hero__pilha figure");
    if (c) abrir(c.dataset.id);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fechar();
    if (e.key === "Enter" && e.target.classList?.contains("card")) abrir(e.target.dataset.id);
  });
  $("#busca").addEventListener("input", (e) => { estado.q = e.target.value.trim(); render(); });
  $("#limpar").addEventListener("click", () => {
    Object.assign(estado, { produto: "todos", tipo: "todos", idioma: "pt", q: "" });
    $("#busca").value = ""; render();
  });
  window.addEventListener("popstate", () => {
    const m = location.hash.match(/^#m\/(.+)$/);
    if (m) abrir(decodeURIComponent(m[1]), false); else fechar(false);
  });

  fetch("data/materiais.json", { cache: "no-cache" })
    .then((r) => r.json())
    .then((d) => {
      itens = d;
      render();
      pilha();
      const m = location.hash.match(/^#m\/(.+)$/);
      if (m) abrir(decodeURIComponent(m[1]), false);
    })
    .catch(() => { $("#contagem").textContent = "Não foi possível carregar a lista de materiais. Atualize a página."; });
})();
