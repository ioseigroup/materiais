import { useEffect, useRef, useState } from "react";

/* Peças da página do SwiftMR, no mesmo sistema visual da página do I-RAD (.ir). */

export type Caso = { id: string; nome: string; detalhe: string; antes: string; depois: string; tempoAntes: string; tempoDepois: string };

/** Comparador: arraste o divisor para ver a aquisição convencional e a imagem com SwiftMR. */
export function Comparador({ casos }: { casos: Caso[] }) {
  const [i, setI] = useState(0);
  const [corte, setCorte] = useState(50);
  const [tocou, setTocou] = useState(false);
  const telaRef = useRef<HTMLDivElement | null>(null);
  const arrastando = useRef(false);
  const c = casos[i];
  // convite discreto: o divisor balança até a pessoa mexer
  useEffect(() => {
    if (tocou) return;
    let raf = 0; const t0 = performance.now();
    const passo = (t: number) => { setCorte(50 + Math.sin((t - t0) / 900) * 18); raf = requestAnimationFrame(passo); };
    const el = telaRef.current;
    const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(passo); });
    if (el) io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [tocou]);
  const mover = (x: number) => {
    const el = telaRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setCorte(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div className="sw-comp">
      <div className="sw-comp__casos" role="tablist" aria-label="Casos clínicos">
        {casos.map((k, n) => (
          <button key={k.id} type="button" role="tab" aria-selected={n === i} onClick={() => { setI(n); setCorte(50); setTocou(true); }}>
            <strong>{k.nome}</strong>
            <span>{k.detalhe}</span>
            <span className="sw-comp__tempos"><s>{k.tempoAntes}</s><b>{k.tempoDepois}</b></span>
          </button>
        ))}
      </div>
      <div
        ref={telaRef}
        className="sw-comp__tela"
        role="slider"
        tabIndex={0}
        aria-label="Divisor entre a imagem convencional e a imagem com SwiftMR"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(corte)}
        onPointerDown={(e) => { setTocou(true); arrastando.current = true; (e.currentTarget as Element).setPointerCapture?.(e.pointerId); mover(e.clientX); }}
        onPointerMove={(e) => { if (arrastando.current) mover(e.clientX); }}
        onPointerUp={() => { arrastando.current = false; }}
        onPointerCancel={() => { arrastando.current = false; }}
        onKeyDown={(e) => { setTocou(true); if (e.key === "ArrowLeft") setCorte((v) => Math.max(0, v - 4)); if (e.key === "ArrowRight") setCorte((v) => Math.min(100, v + 4)); }}
      >
        <img src={c.depois} alt={`${c.nome}, imagem com SwiftMR`} draggable={false} />
        <img src={c.antes} alt={`${c.nome}, aquisição convencional`} draggable={false} style={{ clipPath: `inset(0 ${100 - corte}% 0 0)` }} />
        <span className="sw-comp__rotulo" data-lado="esq">Convencional, {c.tempoAntes}</span>
        <span className="sw-comp__rotulo" data-lado="dir">SwiftMR, {c.tempoDepois}</span>
        <div className="sw-comp__fio" style={{ left: `${corte}%` }}>
          <span className="sw-comp__pega">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Números que sobem quando entram na tela. */
export function Numeros({ itens, fonte }: { itens: Array<{ valor: number; prefixo?: string; sufixo?: string; rotulo: string }>; fonte: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const passo = (agora: number) => { const k = Math.min(1, (agora - t0) / 1600); setT(1 - Math.pow(1 - k, 3)); if (k < 1) raf = requestAnimationFrame(passo); };
      raf = requestAnimationFrame(passo);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");
  return (
    <div ref={ref} className="sw-num">
      <div className="sw-num__grade">
        {itens.map((n) => (
          <div key={n.rotulo}>
            <span className="ir-num">{n.prefixo}{fmt(n.valor * t)}{n.sufixo}</span>
            <p>{n.rotulo}</p>
          </div>
        ))}
      </div>
      <p className="ir-nota">{fonte}</p>
    </div>
  );
}

/** Três caminhos para ganhar capacidade de RM. */
export function Caminhos({ colunas }: { colunas: Array<{ titulo: string; valor: string; itens: string[]; fecho: string; destaque?: boolean }> }) {
  return (
    <div className="sw-cam">
      {colunas.map((c) => (
        <div key={c.titulo} className="sw-cam__col" data-destaque={c.destaque ? "true" : "false"}>
          <p className="sw-cam__titulo">{c.titulo}</p>
          <p className="sw-cam__valor">{c.valor}</p>
          <ul>{c.itens.map((i) => <li key={i}>{i}</li>)}</ul>
          <p className="sw-cam__fecho">{c.fecho}</p>
        </div>
      ))}
    </div>
  );
}

/** Implantação em etapas, com a linha preenchendo ao entrar na tela. */
export function Passos({ itens }: { itens: Array<{ t: string; d: string }> }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisto(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ol ref={ref} className="sw-passos" data-visto={visto ? "true" : "false"}>
      {itens.map((s, i) => (
        <li key={s.t} style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
          <span className="sw-passos__n">{i + 1}</span>
          <strong>{s.t}</strong>
          <span>{s.d}</span>
        </li>
      ))}
    </ol>
  );
}

export function Vozes({ itens }: { itens: Array<{ fala: string; quem: string }> }) {
  return (
    <div className="sw-vozes">
      {itens.map((d) => (
        <blockquote key={d.quem}>
          <p>{d.fala}</p>
          <footer>{d.quem}</footer>
        </blockquote>
      ))}
    </div>
  );
}

/** Do exame ao laudo: equipamento, SwiftMR e PACS, com o pacote de imagens percorrendo o caminho. */
export function Fluxo({ etapas }: { etapas: Array<{ t: string; d: string }> }) {
  return (
    <div className="sw-fluxo">
      {etapas.map((e, i) => (
        <div key={e.t} className="sw-fluxo__etapa">
          <span className="sw-fluxo__n">{i + 1}</span>
          <strong>{e.t}</strong>
          <p>{e.d}</p>
          {i < etapas.length - 1 && <i className="sw-fluxo__seta" aria-hidden="true"><b /></i>}
        </div>
      ))}
    </div>
  );
}
