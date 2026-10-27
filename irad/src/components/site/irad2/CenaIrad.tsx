import { useEffect, useRef, type ReactNode } from "react";

/**
 * Cena de rolagem do I-RAD: o vídeo fica preso na tela e o tempo dele acompanha a rolagem.
 * Por cima do vídeo, uma camada desenhada em código (gráficos, contadores, painel)
 * e os textos em vidro, que entram e saem em cada momento.
 */

export type Momento = {
  de: number;
  ate: number;
  pos?: "esq" | "dir" | "topo-esq" | "topo-dir";
  tema?: "noite" | "claro";
  conteudo: ReactNode;
};

/** converte coordenadas do vídeo (0 a 1) para pixels da tela */
export type Conv = (vx: number, vy: number) => [number, number];

export type Quadro = {
  ctx: CanvasRenderingContext2D;
  p: number;
  w: number;
  h: number;
  /** área ocupada pelo vídeo na tela */
  area: { x: number; y: number; w: number; h: number };
  conv: Conv;
  estreito: boolean;
  topo: number;
  /** o próprio vídeo, para efeitos que reaproveitam o quadro atual (vidro desfocado) */
  video?: HTMLVideoElement;
};

type Props = {
  video: string;
  poster: string;
  altura?: number;
  /** pares [progresso da rolagem, segundo do vídeo], em ordem */
  mapa: Array<[number, number]>;
  momentos: Momento[];
  desenhar?: (q: Quadro) => void;
  rotulo: string;
};

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
const FADE = 0.022;

function tempoDo(mapa: Array<[number, number]>, p: number) {
  if (p <= mapa[0][0]) return mapa[0][1];
  for (let i = 1; i < mapa.length; i++) {
    const [p1, t1] = mapa[i];
    const [p0, t0] = mapa[i - 1];
    if (p <= p1) return t0 + ((p - p0) / Math.max(1e-6, p1 - p0)) * (t1 - t0);
  }
  return mapa[mapa.length - 1][1];
}

export function CenaIrad({ video, poster, altura = 900, mapa, momentos, desenhar, rotulo }: Props) {
  const secRef = useRef<HTMLElement | null>(null);
  const palcoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const telaRef = useRef<HTMLCanvasElement | null>(null);
  const barraRef = useRef<HTMLElement | null>(null);
  const dicaRef = useRef<HTMLDivElement | null>(null);
  const itensRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sec = secRef.current, v = videoRef.current, palco = palcoRef.current, tela = telaRef.current;
    if (!sec || !v || !palco || !tela) return;
    const ctx = tela.getContext("2d");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vivo = true, url = "", raf = 0, perto = true, atual = 0, pronto = false, ultimoP = -1;

    fetch(video)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.blob(); })
      .then((b) => { if (!vivo) return; url = URL.createObjectURL(b); v.src = url; v.load(); })
      .catch(() => { if (vivo) { v.src = video; v.load(); } });
    const aoCarregar = () => { pronto = true; try { v.pause(); } catch { /* sem efeito */ } pedir(); };
    v.addEventListener("loadeddata", aoCarregar);
    const aoFalhar = () => { if (vivo && url && v.src.startsWith("blob:")) { URL.revokeObjectURL(url); url = ""; v.src = video; v.load(); } };
    v.addEventListener("error", aoFalhar);

    const progresso = () => {
      const r = sec.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      return curso > 0 ? clamp(-r.top / curso) : 0;
    };

    const pintarCamada = (p: number) => {
      if (!ctx || !desenhar) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = palco.clientWidth, h = palco.clientHeight;
      if (tela.width !== Math.round(w * dpr) || tela.height !== Math.round(h * dpr)) {
        tela.width = Math.round(w * dpr); tela.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const vr = v.getBoundingClientRect(), pr = palco.getBoundingClientRect();
      const box = { x: vr.left - pr.left, y: vr.top - pr.top, w: vr.width, h: vr.height };
      const iw = v.videoWidth || 1280, ih = v.videoHeight || 720;
      const esc = Math.max(box.w / iw, box.h / ih);
      const dw = iw * esc, dh = ih * esc;
      const foco = parseFloat(getComputedStyle(palco).getPropertyValue("--ir-foco")) || 50;
      const ox = box.x + (box.w - dw) * (foco / 100), oy = box.y + (box.h - dh) / 2;
      const conv: Conv = (vx, vy) => [ox + vx * dw, oy + vy * dh];
      const estreito = w < 860;
      desenhar({ ctx, p, w, h, area: box, conv, estreito, topo: 0, video: v });
    };

    const pintar = (p: number) => {
      const n = momentos.length;
      let temaAtivo: string | undefined;
      for (let i = 0; i < n; i++) {
        const el = itensRef.current[i]; if (!el) continue;
        const m = momentos[i];
        const entra = i === 0 ? 1 : suave((p - m.de) / FADE);
        const sai = i === n - 1 ? 0 : suave((p - (m.ate - FADE)) / FADE);
        const op = Math.min(entra, 1 - sai);
        const y = semMovimento ? 0 : (1 - entra) * 30 - sai * 30;
        el.style.opacity = op.toFixed(3);
        // o primeiro box começa à esquerda, nas costas das pessoas, e desliza para a direita no primeiro scroll
        const caixa = el.firstElementChild as HTMLElement | null;
        const x = i === 0 && !semMovimento && window.innerWidth > 860 && caixa ? -(el.clientWidth - caixa.offsetWidth) * (1 - suave(p / 0.035)) : 0;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        el.style.visibility = op <= 0.001 ? "hidden" : "visible";
        const ativo = op > 0.5;
        if (ativo) temaAtivo = m.tema;
        if (el.dataset.ativo !== String(ativo)) { el.dataset.ativo = String(ativo); if (ativo) el.removeAttribute("inert"); else el.setAttribute("inert", ""); }
      }
      if (temaAtivo && palco.dataset.tema !== temaAtivo) palco.dataset.tema = temaAtivo;
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (dicaRef.current) dicaRef.current.style.opacity = (1 - suave(p / 0.03)).toFixed(2);
      pintarCamada(p);
    };

    const laco = () => {
      raf = 0;
      if (!vivo) return;
      const p = progresso();
      if (p !== ultimoP) { pintar(p); ultimoP = p; }
      if (pronto && v.duration && isFinite(v.duration)) {
        const alvo = Math.min(v.duration - 0.04, tempoDo(mapa, p));
        atual = semMovimento ? alvo : atual + (alvo - atual) * 0.2;
        if (Math.abs(alvo - atual) < 0.004) atual = alvo;
        if (Math.abs(v.currentTime - atual) > 0.02 && !v.seeking) v.currentTime = atual;
        if (perto && Math.abs(alvo - atual) > 0.004) raf = requestAnimationFrame(laco);
      }
    };
    const pedir = () => { if (!raf && perto) raf = requestAnimationFrame(laco); };
    const redesenhar = () => { ultimoP = -1; pedir(); };

    const io = new IntersectionObserver(([e]) => { perto = e.isIntersecting; pedir(); }, { rootMargin: "20% 0px" });
    io.observe(sec);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", redesenhar);
    v.addEventListener("seeked", pedir);
    if (document.fonts?.ready) document.fonts.ready.then(redesenhar);
    pintar(progresso());

    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", redesenhar);
      v.removeEventListener("loadeddata", aoCarregar);
      v.removeEventListener("error", aoFalhar);
      v.removeEventListener("seeked", pedir);
      if (url) URL.revokeObjectURL(url);
    };
    // a cena é fixa por página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <section ref={secRef} className="ir-cena" style={{ height: `${altura}vh` }} aria-label={rotulo}>
      <div ref={palcoRef} className="ir-cena__palco" data-tema={momentos[0]?.tema ?? "noite"}>
        <video ref={videoRef} className="ir-cena__video" poster={poster} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
        <div className="ir-cena__veu" />
        <canvas ref={telaRef} className="ir-cena__camada" aria-hidden="true" />
        <div className="ir-cena__grade">
          {momentos.map((m, i) => (
            <div
              key={i}
              ref={(el) => { itensRef.current[i] = el; }}
              className="ir-momento"
              data-pos={m.pos ?? "esq"}
              data-ativo={i === 0 ? "true" : "false"}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              {m.conteudo}
            </div>
          ))}
        </div>
        <div ref={dicaRef} className="ir-cena__dica" aria-hidden="true">
          Role para baixo e veja a sala em movimento
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>
        <div className="ir-cena__trilho" aria-hidden="true"><i ref={barraRef} /></div>
      </div>
    </section>
  );
}

export default CenaIrad;
