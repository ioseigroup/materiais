import { useEffect, useRef, type ReactNode } from "react";

/**
 * Cena de scroll: o vídeo ocupa a tela, fica preso enquanto a seção passa,
 * e o tempo do vídeo acompanha a rolagem. O conteúdo de cada momento flutua em vidro.
 *
 * O vídeo é carregado inteiro para a memória antes de ser usado, para que
 * qualquer ponto possa ser buscado na hora, para frente e para trás.
 */

export type Momento = {
  /** início e fim, de 0 a 1, dentro do percurso da cena */
  de: number;
  ate: number;
  pos?: "esq" | "dir" | "centro" | "lados" | "topo-esq" | "topo-dir" | "meio-esq" | "meio-dir";
  conteudo: ReactNode;
};

type Props = {
  video: string;
  poster: string;
  /** altura do percurso em porcentagem da altura da tela */
  altura?: number;
  tema?: "noite" | "claro";
  /** ponto do percurso (0 a 1) em que o tema passa a ser claro */
  claroEm?: number;
  /** foco horizontal do vídeo em telas estreitas, em porcentagem */
  foco?: number;
  marca?: ReactNode;
  momentos: Momento[];
  rotulo: string;
};

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
const FADE = 0.028;

export function Cena({ video, poster, altura = 600, tema = "noite", claroEm, foco = 50, marca, momentos, rotulo }: Props) {
  const secRef = useRef<HTMLElement | null>(null);
  const palcoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const barraRef = useRef<HTMLElement | null>(null);
  const dicaRef = useRef<HTMLDivElement | null>(null);
  const itensRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sec = secRef.current, v = videoRef.current, palco = palcoRef.current;
    if (!sec || !v || !palco) return;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vivo = true, url = "", raf = 0, perto = true, atual = 0, pronto = false;

    fetch(video)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.blob(); })
      .then((b) => { if (!vivo) return; url = URL.createObjectURL(b); v.src = url; v.load(); })
      .catch(() => { if (vivo) { v.src = video; v.load(); } });
    const aoCarregar = () => { pronto = true; try { v.pause(); } catch { /* sem efeito */ } };
    v.addEventListener("loadeddata", aoCarregar);
    // se o navegador recusar o vídeo vindo da memória, cai para o endereço direto
    const aoFalhar = () => { if (vivo && url && v.src.startsWith("blob:")) { URL.revokeObjectURL(url); url = ""; v.src = video; v.load(); } };
    v.addEventListener("error", aoFalhar);

    const progresso = () => {
      const r = sec.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      return curso > 0 ? clamp(-r.top / curso) : 0;
    };

    const pintar = (p: number) => {
      const n = momentos.length;
      for (let i = 0; i < n; i++) {
        const el = itensRef.current[i]; if (!el) continue;
        const m = momentos[i];
        const entra = i === 0 ? 1 : suave((p - m.de) / FADE);
        const sai = i === n - 1 ? 0 : suave((p - (m.ate - FADE)) / FADE);
        const op = Math.min(entra, 1 - sai);
        const y = semMovimento ? 0 : (1 - entra) * 34 - sai * 34;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        el.style.visibility = op <= 0.001 ? "hidden" : "visible";
        const ativo = op > 0.5;
        if (el.dataset.ativo !== String(ativo)) { el.dataset.ativo = String(ativo); if (ativo) el.removeAttribute("inert"); else el.setAttribute("inert", ""); }
      }
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (dicaRef.current) dicaRef.current.style.opacity = (1 - suave(p / 0.03)).toFixed(2);
      if (claroEm !== undefined) {
        const t = p >= claroEm ? "claro" : "noite";
        if (palco.dataset.tema !== t) palco.dataset.tema = t;
      }
    };

    const laco = () => {
      raf = 0;
      if (!vivo) return;
      const p = progresso();
      pintar(p);
      if (pronto && v.duration && isFinite(v.duration)) {
        const alvo = p * (v.duration - 0.05);
        atual = semMovimento ? alvo : atual + (alvo - atual) * 0.16;
        if (Math.abs(alvo - atual) < 0.004) atual = alvo;
        if (Math.abs(v.currentTime - atual) > 0.016 && !v.seeking) v.currentTime = atual;
        if (perto && Math.abs(alvo - atual) > 0.004) raf = requestAnimationFrame(laco);
      }
    };
    const pedir = () => { if (!raf && perto) raf = requestAnimationFrame(laco); };

    const io = new IntersectionObserver(([e]) => { perto = e.isIntersecting; pedir(); }, { rootMargin: "20% 0px" });
    io.observe(sec);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    v.addEventListener("loadeddata", pedir);
    v.addEventListener("seeked", pedir);
    pintar(progresso());

    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      v.removeEventListener("loadeddata", aoCarregar);
      v.removeEventListener("error", aoFalhar);
      v.removeEventListener("loadeddata", pedir);
      v.removeEventListener("seeked", pedir);
      if (url) URL.revokeObjectURL(url);
    };
    // os momentos são fixos por página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <section ref={secRef} className="io-cena" style={{ height: `${altura}vh` }} aria-label={rotulo}>
      <div ref={palcoRef} className="io-cena__palco" data-tema={tema} style={{ ["--io-foco" as string]: `${foco}%` }}>
        <video ref={videoRef} className="io-cena__video" poster={poster} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
        <div className="io-cena__veu" />
        {marca ? <div className="io-cena__marca">{marca}</div> : null}
        <div className="io-cena__grade">
          {momentos.map((m, i) => (
            <div
              key={i}
              ref={(el) => { itensRef.current[i] = el; }}
              className="io-momento"
              data-pos={m.pos ?? "esq"}
              data-ativo={i === 0 ? "true" : "false"}
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            >
              {m.conteudo}
            </div>
          ))}
        </div>
        <div ref={dicaRef} className="io-cena__dica" aria-hidden="true">
          Role para avançar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>
        <div className="io-cena__trilho" aria-hidden="true">
          <i ref={barraRef} />
          {momentos.slice(1).map((m, i) => <b key={i} style={{ left: `${m.de * 100}%` }} />)}
        </div>
      </div>
    </section>
  );
}

export default Cena;
