import { useEffect, useRef, useState, type ReactNode } from "react";
import { EXTERNOS } from "@/site/destinos";
import { Link } from "@tanstack/react-router";

export const Seta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

type BotaoProps = { para: string; busca?: Record<string, string>; vidro?: boolean; seta?: boolean; children: ReactNode };
/** Botão para rota interna, âncora (#) ou endereço externo (http). */
export function Botao({ para, busca, vidro, seta = true, children }: BotaoProps) {
  const classe = "io-botao" + (vidro ? " io-botao--vidro" : "");
  const miolo = <>{children}{seta ? <Seta /> : null}</>;
  const externo = EXTERNOS[para];
  if (externo) return <a className={classe} href={externo}>{miolo}</a>;
  if (para.startsWith("#")) return <a className={classe} href={para}>{miolo}</a>;
  if (para.startsWith("http")) return <a className={classe} href={para} target="_blank" rel="noreferrer">{miolo}</a>;
  return <Link className={classe} to={para as any} search={busca as any}>{miolo}</Link>;
}

export function Ligacao({ para, children }: { para: string; children: ReactNode }) {
  if (EXTERNOS[para]) return <a className="io-link" href={EXTERNOS[para]}>{children}<Seta /></a>;
  if (para.startsWith("http")) return <a className="io-link" href={para} target="_blank" rel="noreferrer">{children}<Seta /></a>;
  return <Link className="io-link" to={para as any}>{children}<Seta /></Link>;
}

/** Bloco que entra suavemente quando chega à tela. Já nasce visível se o navegador não observar. */
export function Surge({ children, className = "", como: Tag = "div" }: { children: ReactNode; className?: string; como?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.dataset.visto = "true"; return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.visto = "true"; io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref as never} className={("io-surge " + className).trim()}>{children}</Tag>;
}

/** Fundo que acompanha a rolagem da parte da página que vem depois da cena. */
export function FundoVivo() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; const pai = el?.parentElement?.parentElement; if (!el || !pai) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = pai.getBoundingClientRect(); const curso = r.height - window.innerHeight;
      const p = curso > 0 ? Math.max(0, Math.min(1, -r.top / curso)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("scroll", pedir); window.removeEventListener("resize", pedir); };
  }, []);
  return <div className="io-fundo" aria-hidden="true"><div ref={ref} className="io-fundo-vivo"><i /><b /></div></div>;
}

export type Caso = { id: string; nome: string; detalhe: string; antes: string; depois: string; tempoAntes: string; tempoDepois: string };

/** Comparador: arraste o divisor para ver a aquisição convencional e a imagem processada. */
export function Comparador({ casos, rotuloAntes, rotuloDepois }: { casos: Caso[]; rotuloAntes: string; rotuloDepois: string }) {
  const [i, setI] = useState(0);
  const [corte, setCorte] = useState(50);
  const telaRef = useRef<HTMLDivElement | null>(null);
  const arrastando = useRef(false);
  const c = casos[i];
  const mover = (x: number) => {
    const el = telaRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setCorte(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div className="io-comparador">
      <div className="io-abas" role="tablist" aria-label="Casos clínicos">
        {casos.map((k, n) => (
          <button key={k.id} type="button" role="tab" aria-selected={n === i} onClick={() => { setI(n); setCorte(50); }}>
            <strong>{k.nome}</strong>
            <span>{k.detalhe}</span>
            <span className="io-num">{k.tempoAntes} para {k.tempoDepois}</span>
          </button>
        ))}
      </div>
      <div
        ref={telaRef}
        className="io-comparador__tela"
        role="slider"
        tabIndex={0}
        aria-label="Divisor entre a imagem convencional e a imagem processada"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(corte)}
        onPointerDown={(e) => { arrastando.current = true; (e.currentTarget as Element).setPointerCapture?.(e.pointerId); mover(e.clientX); }}
        onPointerMove={(e) => { if (arrastando.current) mover(e.clientX); }}
        onPointerUp={() => { arrastando.current = false; }}
        onPointerCancel={() => { arrastando.current = false; }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setCorte((v) => Math.max(0, v - 4)); if (e.key === "ArrowRight") setCorte((v) => Math.min(100, v + 4)); }}
      >
        <img src={c.depois} alt={`${c.nome}, imagem processada`} draggable={false} />
        <img src={c.antes} alt={`${c.nome}, aquisição convencional`} draggable={false} style={{ clipPath: `inset(0 ${100 - corte}% 0 0)` }} />
        <span className="io-comparador__rotulo" data-lado="esq">{rotuloAntes} · {c.tempoAntes}</span>
        <span className="io-comparador__rotulo" data-lado="dir">{rotuloDepois} · {c.tempoDepois}</span>
        <div className="io-comparador__fio" style={{ left: `${corte}%` }}>
          <span className="io-comparador__pega">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Perguntas({ itens }: { itens: Array<{ p: string; r: string }> }) {
  return (
    <div className="io-perguntas">
      {itens.map((f) => (
        <details key={f.p}>
          <summary>{f.p}</summary>
          <p>{f.r}</p>
        </details>
      ))}
    </div>
  );
}
