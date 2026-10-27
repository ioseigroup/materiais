import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------
 * Peças da página do I-RAD. Sem dependências além do React.
 * ------------------------------------------------------------ */

export function Seta() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Marca o elemento como visto quando entra na tela (para animações de entrada). */
function useVisto<T extends HTMLElement>(limiar = 0.2) {
  const ref = useRef<T | null>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVisto(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisto(true); io.disconnect(); } }, { threshold: limiar });
    io.observe(el);
    return () => io.disconnect();
  }, [limiar]);
  return [ref, visto] as const;
}

/** Diz se o elemento está na tela agora (para pausar o que roda sozinho). */
function useNaTela<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [na, setNa] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setNa(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, na] as const;
}

export function Surge({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const [ref, visto] = useVisto<HTMLDivElement>(0.15);
  const P = Tag as "div";
  return <P ref={ref} className={`ir-surge ${className}`} data-visto={visto ? "true" : "false"}>{children}</P>;
}

/* ============================================================
 * HERO: mockup com monitor e tablet
 * ============================================================ */
export function TelasHero({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, raf = 0;
    const aplicar = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const sy = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
      if (imgRef.current) imgRef.current.style.transform = `translate3d(${mx * 12}px, ${my * 8 + sy * -30}px, 0)`;
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(aplicar); };
    const mover = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; pedir(); };
    addEventListener("pointermove", mover, { passive: true });
    addEventListener("scroll", pedir, { passive: true });
    return () => { removeEventListener("pointermove", mover); removeEventListener("scroll", pedir); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="ir-hero__telas">
      <div className="ir-hero__brilho" aria-hidden="true" />
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
}

/* ============================================================
 * LOGOS EM MOVIMENTO
 * ============================================================ */
export function Logos({ texto, itens }: { texto: string; itens: Array<{ src: string; nome: string }> }) {
  const dobro = [...itens, ...itens];
  return (
    <div className="ir-logos">
      <p>{texto}</p>
      <div className="ir-logos__trilho">
        <div className="ir-logos__fila">
          {dobro.map((l, i) => <img key={i} src={l.src} alt={i < itens.length ? l.nome : ""} aria-hidden={i >= itens.length} loading="lazy" />)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * SIMULADOR DO DIA: tempo de troca, slot real e exames no dia
 * ============================================================ */
const EXPEDIENTE = 12 * 60; // 07h às 19h
const DIAS_UTEIS = 22;

type Seg = { k: string; tipo: "e" | "t" | "x" | "o"; ini: number; dur: number };
function montarDia(protocolo: number, troca: number, ate?: number) {
  const segs: Seg[] = [];
  let t = 0, n = 0;
  while (t + protocolo <= EXPEDIENTE) {
    segs.push({ k: `e${n}`, tipo: ate !== undefined && n >= ate ? "x" : "e", ini: t, dur: protocolo });
    t += protocolo;
    const tr = Math.min(troca, EXPEDIENTE - t);
    if (tr > 0 && t + tr + protocolo <= EXPEDIENTE) segs.push({ k: `t${n}`, tipo: "t", ini: t, dur: tr });
    t += troca;
    n++;
  }
  return { segs, n };
}
const fmtMin = (m: number) => {
  const h = Math.floor(m / 60), r = Math.round(m % 60);
  return h ? `${h} h ${String(r).padStart(2, "0")} min` : `${r} min`;
};

export function SimuladorDia() {
  const [troca, setTroca] = useState(9);
  const [protocolo, setProtocolo] = useState(20);
  const [meta, setMeta] = useState(5);
  const metaEf = Math.min(meta, troca);
  const hoje = useMemo(() => montarDia(protocolo, troca), [protocolo, troca]);
  const naMeta = useMemo(() => montarDia(protocolo, metaEf, hoje.n), [protocolo, metaEf, hoje.n]);
  const ganhoDia = naMeta.n - hoje.n;
  const pct = (v: number, a: number, b: number) => ({ ["--p" as string]: `${((v - a) / (b - a)) * 100}%` });

  const fita = (segs: Seg[]) => (
    <div className="ir-dia__fita" aria-hidden="true">
      {segs.map((s) => (
        <span key={s.k} className={s.tipo} style={{ left: `${(s.ini / EXPEDIENTE) * 100}%`, width: `calc(${(s.dur / EXPEDIENTE) * 100}% - 1px)` }} />
      ))}
    </div>
  );

  return (
    <div className="ir-sim__painel">
      <div className="ir-controles">
        <div className="ir-controle">
          <label htmlFor="ir-troca">Tempo de troca <output htmlFor="ir-troca">{troca} min</output></label>
          <input id="ir-troca" type="range" min={2} max={15} step={1} value={troca} style={pct(troca, 2, 15)} onChange={(e) => setTroca(+e.target.value)} />
        </div>
        <div className="ir-controle">
          <label htmlFor="ir-prot">Tempo de protocolo <output htmlFor="ir-prot">{protocolo} min</output></label>
          <input id="ir-prot" type="range" min={10} max={40} step={1} value={protocolo} style={pct(protocolo, 10, 40)} onChange={(e) => setProtocolo(+e.target.value)} />
        </div>
        <div className="ir-controle">
          <label htmlFor="ir-meta">Meta de troca <output htmlFor="ir-meta">{meta} min</output></label>
          <input id="ir-meta" type="range" min={2} max={10} step={1} value={meta} style={pct(meta, 2, 10)} onChange={(e) => setMeta(+e.target.value)} />
        </div>
      </div>

      <div className="ir-dia">
        <div className="ir-dia__linha">
          <div className="ir-dia__rotulo"><strong>Como a sala opera hoje</strong><span><span className="ir-num">{hoje.n}</span> exames</span></div>
          {fita(hoje.segs)}
        </div>
        <div className="ir-dia__linha">
          <div className="ir-dia__rotulo"><strong>Com a troca na meta</strong><span><span className="ir-num">{naMeta.n}</span> exames</span></div>
          {fita(naMeta.segs)}
          <div className="ir-dia__horas" aria-hidden="true"><span>07h</span><span>10h</span><span>13h</span><span>16h</span><span>19h</span></div>
        </div>
        <div className="ir-legenda" aria-hidden="true">
          <span><i style={{ background: "var(--marinho)" }} />Exame</span>
          <span><i style={{ background: "repeating-linear-gradient(135deg, var(--ambar) 0 3px, rgba(240,162,55,.35) 3px 6px)" }} />Troca</span>
          <span><i style={{ background: "var(--ciano)" }} />Exame que passa a caber no dia</span>
        </div>
      </div>

      <div className="ir-resultado" aria-live="polite">
        <div><span className="ir-num">{protocolo + troca} min</span><span>Slot real hoje, contra {protocolo + metaEf} min com a troca na meta.</span></div>
        <div><span className="ir-num ir-acento">+{ganhoDia}</span><span>{ganhoDia === 1 ? "exame por dia" : "exames por dia"}, no mesmo expediente de 12 horas.</span></div>
        <div><span className="ir-num ir-acento">+{ganhoDia * DIAS_UTEIS}</span><span>exames por mês, em {DIAS_UTEIS} dias úteis. {fmtMin(hoje.n * (troca - metaEf))} a menos de troca por dia.</span></div>
      </div>
      <p className="ir-nota">Simulação ilustrativa com os valores escolhidos acima. Os resultados podem variar de acordo com o nível de ocupação e a demanda do centro.</p>
    </div>
  );
}

/* ============================================================
 * DUAS SALAS: performance não é produtividade
 * ============================================================ */
type Bloco = { tipo: "e" | "l" | "t" | "o"; dur: number };
function sequencia(padrao: Bloco[], total = 100) {
  const out: Array<Bloco & { ini: number }> = [];
  let t = 0, i = 0;
  while (t < total) { const b = padrao[i % padrao.length]; const d = Math.min(b.dur, total - t); out.push({ ...b, dur: d, ini: t }); t += b.dur; i++; }
  return out;
}
const SALA_LENTA = sequencia([{ tipo: "l", dur: 9.5 }, { tipo: "t", dur: 2.6 }]);
const SALA_OCIOSA = sequencia([
  { tipo: "e", dur: 5.2 }, { tipo: "t", dur: 0.9 }, { tipo: "e", dur: 5 }, { tipo: "t", dur: 0.9 }, { tipo: "e", dur: 5.4 }, { tipo: "o", dur: 14 },
  { tipo: "e", dur: 5 }, { tipo: "t", dur: 0.9 }, { tipo: "e", dur: 5.2 }, { tipo: "o", dur: 18 },
  { tipo: "e", dur: 5.1 }, { tipo: "t", dur: 0.9 }, { tipo: "e", dur: 5 }, { tipo: "t", dur: 0.9 }, { tipo: "e", dur: 5.3 }, { tipo: "o", dur: 16 },
]);

export function DuasSalas({ cabecalho, fecho }: { cabecalho: ReactNode; fecho: ReactNode }) {
  const [ref, visto] = useVisto<HTMLElement>(0.25);
  const fita = (segs: Array<Bloco & { ini: number }>) => (
    <div className="ir-sala__fita" aria-hidden="true">
      {segs.map((s, i) => (
        <span key={i} className={s.tipo} style={{ left: `${s.ini}%`, width: `calc(${s.dur}% - 1px)`, transitionDelay: `${(s.ini / 100) * 0.9}s` }} />
      ))}
    </div>
  );
  return (
    <section ref={ref} className="ir-bloco ir-salas" data-visto={visto ? "true" : "false"}>
      <div className="ir-faixa">
        {cabecalho}
        <div className="ir-salas__lista">
          <div className="ir-sala">
            <div><h3>Sala cheia, mas lenta</h3><p>Agenda lotada, exames longos e trocas demoradas.</p></div>
            {fita(SALA_LENTA)}
          </div>
          <div className="ir-sala">
            <div><h3>Sala eficiente, mas ociosa</h3><p>Exames rápidos, com horas paradas entre um bloco e outro.</p></div>
            {fita(SALA_OCIOSA)}
          </div>
        </div>
        <div className="ir-legenda" style={{ marginTop: 22 }} aria-hidden="true">
          <span><i style={{ background: "var(--marinho)" }} />Exame</span>
          <span><i style={{ background: "#5a6aa8" }} />Exame acima do tempo de protocolo</span>
          <span><i style={{ background: "repeating-linear-gradient(135deg, var(--ambar) 0 3px, rgba(240,162,55,.35) 3px 6px)" }} />Troca</span>
          <span><i style={{ boxShadow: "inset 0 0 0 1px rgba(224,72,79,.5)", background: "rgba(224,72,79,.12)" }} />Sala parada</span>
        </div>
        {fecho}
      </div>
    </section>
  );
}

/* ============================================================
 * EXPLORADOR DE INDICADORES
 * ============================================================ */
const C = { marinho: "#182455", ciano: "#26b9da", alerta: "#e0484f", ambar: "#f0a237", ok: "#24a873", fio: "rgba(18,26,61,.12)", claro: "#c9d3e3", lilas: "#5a6aa8" };

function GCiclo() {
  const exames = [
    ["Crânio", 6, 18, 5], ["Coluna lombar", 7, 22, 4], ["Joelho", 5, 15, 4], ["Abdome", 8, 26, 6], ["Ombro", 6, 17, 3],
  ] as const;
  const esc = 9.2;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Ciclo de cada exame dividido em preparo, protocolo e saída">
      {exames.map(([n, a, b, c], i) => {
        const y = 22 + i * 52;
        return (
          <g key={n}>
            <text x="0" y={y + 17} className="forte">{n}</text>
            <rect className="cresce" x={150} y={y} width={a * esc} height={26} rx={4} fill={C.claro} style={{ animationDelay: `${i * 0.08}s` }} />
            <rect className="cresce" x={150 + a * esc + 2} y={y} width={b * esc} height={26} rx={4} fill={C.marinho} style={{ animationDelay: `${i * 0.08 + 0.15}s` }} />
            <rect className="cresce" x={150 + (a + b) * esc + 4} y={y} width={c * esc} height={26} rx={4} fill={C.ambar} style={{ animationDelay: `${i * 0.08 + 0.3}s` }} />
            <text x={150 + (a + b + c) * esc + 14} y={y + 18} className="aparece">{a + b + c} min</text>
          </g>
        );
      })}
      <g transform="translate(150,288)"><g className="aparece">
        <rect width="12" height="8" rx="2" fill={C.claro} /><text x="18" y="8">Preparo</text>
        <rect x="100" width="12" height="8" rx="2" fill={C.marinho} /><text x="118" y="8">Protocolo</text>
        <rect x="210" width="12" height="8" rx="2" fill={C.ambar} /><text x="228" y="8">Saída e troca</text>
      </g></g>
    </svg>
  );
}

function GTroca() {
  const dias = [6.2, 7.8, 9.1, 5.4, 4.6, 7.4, 7];
  const nomes = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Hoje"];
  const meta = 5, base = 250, k = 22;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Mediana do tempo de troca nos últimos sete dias, contra a meta de 5 minutos">
      {dias.map((v, i) => {
        const x = 40 + i * 84, h = v * k;
        return (
          <g key={i}>
            <rect className="sobe" x={x} y={base - h} width={46} height={h} rx={5} fill={v > meta ? C.alerta : C.ok} opacity={i === 6 ? 1 : 0.8} style={{ animationDelay: `${i * 0.07}s` }} />
            <text x={x + 23} y={base - h - 8} textAnchor="middle" className="forte aparece">{String(v).replace(".", ",")}</text>
            <text x={x + 23} y={base + 22} textAnchor="middle">{nomes[i]}</text>
          </g>
        );
      })}
      <line x1="24" x2="630" y1={base - meta * k} y2={base - meta * k} stroke={C.ciano} strokeWidth="2" strokeDasharray="6 6" />
      <text x="24" y={base - meta * k - 8} className="meta">meta 5 min</text>
      <line x1="24" x2="630" y1={base} y2={base} stroke={C.fio} />
    </svg>
  );
}

function GProtocolo() {
  const p = [["Crânio", 21], ["Coluna lombar", 19], ["Angio crânio", 17], ["Abdome superior", 24], ["Joelho", 14], ["Coluna cervical", 16]] as const;
  const meta = 18, esc = 15, x0 = 170;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Tempo de protocolo por exame contra a meta de 18 minutos">
      {p.map(([n, v], i) => {
        const y = 14 + i * 44;
        const dentro = Math.min(v, meta) * esc, fora = Math.max(0, v - meta) * esc;
        return (
          <g key={n}>
            <text x="0" y={y + 16} className="forte">{n}</text>
            <rect x={x0} y={y + 2} width={30 * esc} height={20} rx={4} fill="#e4e9f1" />
            <rect className="cresce" x={x0} y={y + 2} width={dentro} height={20} rx={4} fill={C.marinho} style={{ animationDelay: `${i * 0.07}s` }} />
            {fora > 0 && <rect className="cresce" x={x0 + dentro} y={y + 2} width={fora} height={20} rx={4} fill={C.alerta} style={{ animationDelay: `${i * 0.07 + 0.4}s` }} />}
          </g>
        );
      })}
      <line x1={x0 + meta * esc} x2={x0 + meta * esc} y1="6" y2="278" stroke={C.ciano} strokeWidth="2" strokeDasharray="5 5" />
      <text x={x0 + meta * esc + 6} y="294" className="meta">meta 18 min</text>
    </svg>
  );
}

function GSlot() {
  // agenda planejada em slots de 15 min contra o slot real de 18 min: o atraso se acumula ao longo do dia
  const n = 9, plan = 15, real = 18, k = 3.1, x0 = 90;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Agenda planejada em slots de 15 minutos contra o slot real de 18 minutos, com o atraso acumulando ao longo do dia">
      <text x="0" y="62" className="forte">Agenda</text>
      <text x="0" y="132" className="forte">Real</text>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect className="aparece" x={x0 + i * plan * k} y={40} width={plan * k - 3} height={34} rx={4} fill="#e4e9f1" style={{ animationDelay: `${i * 0.05}s` }} />
          <rect className="aparece" x={x0 + i * real * k} y={110} width={real * k - 3} height={34} rx={4} fill={i * real + real > n * plan ? C.alerta : C.marinho} style={{ animationDelay: `${0.3 + i * 0.07}s` }} />
        </g>
      ))}
      <path d={`M${x0 + n * plan * k} 30 V160`} stroke={C.ciano} strokeWidth="2" strokeDasharray="5 5" />
      <text x={x0 + n * plan * k - 6} y="24" textAnchor="end" className="meta">fim da agenda planejada</text>
      <g className="aparece" style={{ animationDelay: "1s" }}>
        <path d={`M${x0 + n * plan * k} 190 H${x0 + n * real * k}`} stroke={C.alerta} strokeWidth="2" />
        <path d={`M${x0 + n * plan * k} 184 v12 M${x0 + n * real * k} 184 v12`} stroke={C.alerta} strokeWidth="2" />
        <text x={x0} y="232" className="forte">+{(real - plan) * n} min de atraso no fim do bloco</text>
        <text x={x0} y="256">3 minutos a mais por exame viram quase meia hora</text>
      </g>
    </svg>
  );
}

function GPrimeira() {
  const atrasos = [4, 12, 0, 22, 7, 31, 2, 15, 9, 26];
  const x0 = 50, base = 70, k = 6;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Horário da primeira imagem em dez dias, contra o início planejado às 7 horas">
      <line x1={x0 - 10} x2="630" y1={base} y2={base} stroke={C.ciano} strokeWidth="2" strokeDasharray="5 5" />
      <text x={x0 - 10} y={base - 32} className="meta">início planejado, 07:00</text>
      {atrasos.map((a, i) => {
        const x = x0 + i * 60, y = base + a * k;
        return (
          <g key={i}>
            <line className="aparece" x1={x} x2={x} y1={base} y2={y} stroke={a > 10 ? C.alerta : C.claro} strokeWidth="3" style={{ animationDelay: `${i * 0.06}s` }} />
            <circle className="aparece" cx={x} cy={y} r="8" fill={a > 10 ? C.alerta : C.marinho} style={{ animationDelay: `${i * 0.06 + 0.2}s` }} />
            <text x={x} y={y + 26} textAnchor="middle" className="aparece">07:{String(a).padStart(2, "0")}</text>
          </g>
        );
      })}
      <text x={x0 - 10} y="292">Cada ponto é um dia. Um atraso na primeira imagem empurra a agenda inteira.</text>
    </svg>
  );
}

function GLatencia() {
  const series = [3.2, 0.9, 4, 1.4, 2.6, 0.6, 3.6, 1.8, 2.4];
  let x = 20;
  const k = 27;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Séries de um protocolo com as pausas entre elas">
      <text x="20" y="60" className="forte">Um exame, série por série</text>
      {series.map((d, i) => {
        const pausa = i % 2 === 1;
        const el = (
          <g key={i}>
            <rect className="cresce" x={x} y={100} width={d * k - 2} height={64} rx={4} fill={pausa ? "transparent" : C.marinho} stroke={pausa ? C.alerta : "none"} strokeDasharray={pausa ? "4 4" : undefined} style={{ animationDelay: `${i * 0.08}s` }} />
            {pausa && <text x={x + (d * k) / 2} y={192} textAnchor="middle" className="aparece" fill={C.alerta}>{Math.round(d * 30)} s</text>}
          </g>
        );
        x += d * k;
        return el;
      })}
      <text x="20" y="262">Barra cheia: série em aquisição. Contorno tracejado: pausa entre uma série e a próxima.</text>
    </svg>
  );
}

function GOciosidade() {
  const turnos = [["Matutino", 82], ["Vespertino", 64], ["Noturno", 31]] as const;
  const h = 200, base = 240;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Ocupação e ociosidade da sala por turno">
      {turnos.map(([n, oc], i) => {
        const x = 70 + i * 190;
        return (
          <g key={n}>
            <rect x={x} y={base - h} width={90} height={h} rx={8} fill="none" stroke={C.alerta} strokeOpacity=".45" strokeDasharray="4 5" />
            <rect className="sobe" x={x} y={base - (h * oc) / 100} width={90} height={(h * oc) / 100} rx={8} fill={C.marinho} style={{ animationDelay: `${i * 0.1}s` }} />
            <text x={x + 45} y={base - (h * oc) / 100 - 10} textAnchor="middle" className="forte aparece">{oc}%</text>
            <text x={x + 45} y={base + 26} textAnchor="middle">{n}</text>
          </g>
        );
      })}
      <text x="70" y="292">Barra cheia: tempo ocupado. Contorno vazio: tempo em que a sala ficou disponível sem produzir.</text>
    </svg>
  );
}

function GOperadores() {
  const ops = [[4.8, 34], [5.6, 22], [6.1, 41], [7.4, 18], [8.9, 27], [9.6, 12], [4.2, 15], [11.2, 9]] as const;
  const x0 = 60, k = 46, meta = 6;
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Mediana de troca de cada operador contra a meta">
      <rect x={x0} y={30} width={(meta - 3) * k} height={210} fill="rgba(36,168,115,.08)" />
      <text x={x0 + 8} y={50} fill={C.ok} style={{ fontWeight: 600 }}>dentro da meta</text>
      <line x1={x0 + (meta - 3) * k} x2={x0 + (meta - 3) * k} y1="30" y2="240" stroke={C.ciano} strokeWidth="2" strokeDasharray="5 5" />
      <text x={x0 + (meta - 3) * k + 6} y="24" className="meta">meta {meta} min</text>
      {ops.map(([m, n], i) => (
        <circle key={i} className="aparece" cx={x0 + (m - 3) * k} cy={70 + ((i * 37) % 160)} r={6 + n / 5} fill={m <= meta ? C.ok : C.alerta} fillOpacity=".85" style={{ animationDelay: `${i * 0.07}s` }} />
      ))}
      <line x1={x0} x2="620" y1="240" y2="240" stroke={C.fio} />
      {[3, 5, 7, 9, 11].map((v) => <text key={v} x={x0 + (v - 3) * k} y="262" textAnchor="middle">{v} min</text>)}
      <text x={x0} y="292">Cada ponto é um operador. Quanto maior o ponto, mais trocas no período.</text>
    </svg>
  );
}

export const INDICADORES = [
  { t: "Ciclo do exame", d: "Tempo total entre a entrada do paciente e a conclusão do processo operacional.", valor: "30", un: "min por exame, em média", G: GCiclo },
  { t: "Tempo de troca", d: "Intervalo entre a retirada de um paciente, a preparação da sala e o início do próximo exame.", valor: "7", un: "min hoje", G: GTroca },
  { t: "Slot real", d: "O tempo que cada exame ocupa de verdade na agenda, protocolo mais troca, comparado ao slot planejado.", valor: "18", un: "min, contra 15 planejados", G: GSlot },
  { t: "Tempo de protocolo", d: "Tempo efetivamente utilizado na execução das sequências do exame.", valor: "3 de 6", un: "protocolos dentro da meta", G: GProtocolo },
  { t: "Horário da primeira imagem", d: "Mostra se a operação começa no horário planejado. Atrasos comprometem o dia inteiro.", valor: "07:10", un: "mediana da primeira imagem", G: GPrimeira },
  { t: "Latência entre séries", d: "Pausas e intervalos durante a execução do protocolo.", valor: "2 min 21 s", un: "de pausas em um exame", G: GLatencia },
  { t: "Ociosidade", d: "Períodos em que o equipamento permanece disponível sem produzir.", valor: "69%", un: "de ociosidade no turno da noite", G: GOciosidade },
  { t: "Operadores e turnos", d: "Variações operacionais e oportunidades de padronização.", valor: "3 de 8", un: "operadores dentro da meta de troca", G: GOperadores },
];

export function Explorador() {
  const [i, setI] = useState(0);
  const [parado, setParado] = useState(false);
  const [ref, naTela] = useNaTela<HTMLDivElement>();
  const DUR = 6000;
  useEffect(() => {
    if (parado || !naTela) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % INDICADORES.length), DUR);
    return () => window.clearTimeout(id);
  }, [i, parado, naTela]);
  const ind = INDICADORES[i];
  const G = ind.G;
  return (
    <div ref={ref} className="ir-exp">
      <div className="ir-exp__lista" role="tablist" aria-label="Indicadores do I-RAD" data-parado={parado || !naTela ? "true" : "false"} style={{ ["--dur" as string]: `${DUR}ms` }}>
        {INDICADORES.map((x, k) => (
          <button key={x.t} type="button" role="tab" aria-selected={k === i} id={`ir-ind-${k}`} aria-controls="ir-palco" onClick={() => { setI(k); setParado(true); }}>
            <strong>{x.t}</strong>
            <span><em>{x.d}</em></span>
          </button>
        ))}
      </div>
      <div className="ir-palco" id="ir-palco" role="tabpanel" aria-labelledby={`ir-ind-${i}`}>
        <div className="ir-grafico" key={i}>
          <div className="ir-palco__titulo">{ind.t}</div>
          <div className="ir-palco__valor">{ind.valor}<small>{ind.un}</small></div>
          <G />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * DADOS VIVOS: eventos soltos que viram indicadores
 * ============================================================ */
function useContar(alvo: number, ms: number, ativo: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ativo) return;
    let raf = 0; const t0 = performance.now();
    const passo = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(alvo * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(passo); };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [alvo, ms, ativo]);
  return v;
}

export function DadosVivos({ cabecalho }: { cabecalho: ReactNode }) {
  const [ref, visto] = useVisto<HTMLElement>(0.3);
  const cv = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, w = 0, h = 0, dpr = 1, vivo = true;
    type P = { x: number; y: number; vx: number; vy: number; faixa: number; a: number; r: number };
    const ps: P[] = [];
    const medir = () => { dpr = Math.min(2, devicePixelRatio || 1); w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    medir();
    const novo = (): P => ({ x: -10, y: Math.random() * h, vx: 0.6 + Math.random() * 1.2, vy: (Math.random() - 0.5) * 0.8, faixa: Math.floor(Math.random() * 3), a: 0, r: 0.8 + Math.random() * 1.8 });
    for (let i = 0; i < 230; i++) { const p = novo(); p.x = Math.random() * w * 0.5; ps.push(p); }
    const alvoY = (f: number) => h * (0.5 + (f - 1) * 0.27);
    const quadro = () => {
      if (!vivo) return;
      ctx.clearRect(0, 0, w, h);
      const xs = w * 0.52;
      for (const p of ps) {
        const prog = Math.max(0, Math.min(1, p.x / xs));
        const ty = alvoY(p.faixa);
        p.vy += (Math.random() - 0.5) * 0.2 * (1 - prog);
        p.y += p.vy * (1 - prog) + (ty - p.y) * 0.035 * prog * prog;
        p.vy *= 0.96;
        p.x += p.vx * (0.8 + prog * 1.6);
        p.a = Math.min(1, p.a + 0.03);
        const alpha = p.a * (p.x > xs ? Math.max(0, 1 - (p.x - xs) / 40) : 1);
        ctx.beginPath();
        ctx.fillStyle = prog > 0.7 ? `rgba(143,230,247,${0.9 * alpha})` : `rgba(168,179,207,${0.55 * alpha})`;
        ctx.arc(p.x, p.y, p.r * (1 + prog * 0.6), 0, Math.PI * 2);
        ctx.fill();
        if (p.x > xs + 40) Object.assign(p, novo());
      }
      // fios de chegada
      for (let f = 0; f < 3; f++) {
        const g = ctx.createLinearGradient(w * 0.3, 0, xs, 0);
        g.addColorStop(0, "rgba(38,185,218,0)"); g.addColorStop(1, "rgba(38,185,218,.45)");
        ctx.strokeStyle = g; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(w * 0.3, alvoY(f)); ctx.lineTo(xs, alvoY(f)); ctx.stroke();
      }
      if (!reduzido) raf = requestAnimationFrame(quadro);
    };
    let rodando = false;
    const io = new IntersectionObserver(([e]) => {
      const dentro = e.isIntersecting;
      if (dentro && !rodando) { rodando = true; vivo = true; quadro(); }
      if (!dentro && rodando) { rodando = false; vivo = false; cancelAnimationFrame(raf); }
    });
    io.observe(c);
    const ro = new ResizeObserver(medir); ro.observe(c);
    return () => { vivo = false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  const slot = useContar(18, 1600, visto);
  const troca = useContar(7, 1600, visto);
  const ocup = useContar(62, 1600, visto);
  return (
    <section ref={ref} className="ir-bloco ir-dados" data-visto={visto ? "true" : "false"}>
      <div className="ir-faixa ir-dados__grade">
        <div className="ir-dados__cab">{cabecalho}</div>
        <div className="ir-dados__vivo">
          <canvas ref={cv} aria-hidden="true" />
          <div className="ir-dados__kpis">
            <div className="ir-kpi"><span>Slot real</span><strong>{Math.round(slot)}<em>min</em></strong></div>
            <div className="ir-kpi"><span>Tempo de troca</span><strong>{Math.round(troca)}<em>min</em></strong></div>
            <div className="ir-kpi"><span>Taxa de ocupação</span><strong>{Math.round(ocup)}<em>%</em></strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * VITRINE: telas da V2
 * ============================================================ */
export function Vitrine({ telas }: { telas: Array<{ nome: string; src: string; texto: string }> }) {
  const [i, setI] = useState(0);
  const [parado, setParado] = useState(false);
  const [ref, naTela] = useNaTela<HTMLDivElement>();
  const DUR = 7000;
  useEffect(() => {
    if (parado || !naTela) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % telas.length), DUR);
    return () => window.clearTimeout(id);
  }, [i, parado, naTela, telas.length]);
  return (
    <div ref={ref}>
      <div className="ir-abas" role="tablist" aria-label="Telas do I-RAD" data-parado={parado || !naTela ? "true" : "false"} style={{ ["--dur" as string]: `${DUR}ms` }}>
        {telas.map((t, k) => (
          <button key={t.nome} type="button" role="tab" aria-selected={k === i} onClick={() => { setI(k); setParado(true); }}>
            {t.nome}{k === i ? <i key={`${i}-${parado}`} aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
      <div className="ir-tela">
        <div className="ir-tela__vidro">
          {telas.map((t, k) => <img key={t.nome} src={t.src} alt={`Tela ${t.nome} do I-RAD`} data-ativa={k === i ? "true" : "false"} loading={k === 0 ? "eager" : "lazy"} />)}
        </div>
      </div>
      <p className="ir-tela__legenda" aria-live="polite">{telas[i].texto}</p>
    </div>
  );
}

/* ============================================================
 * CITAÇÃO: as palavras acendem com a rolagem
 * ============================================================ */
export function Citacao({ texto, fichas }: { texto: string; fichas: Array<{ cor: string; rotulo: string; valor: string }> }) {
  const ref = useRef<HTMLElement | null>(null);
  // window.__t: tradução da prévia (PT/EN/ES), quando existir
  const tradutor = typeof window !== "undefined" ? (window as any).__t : undefined;
  const palavras = (tradutor ? tradutor(texto) : texto).split(" ");
  const [acesas, setAcesas] = useState(0);
  const [, setIdioma] = useState(0);
  useEffect(() => {
    const h = () => setIdioma((x) => x + 1);
    addEventListener("iosei-lang", h);
    return () => removeEventListener("iosei-lang", h);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setAcesas(palavras.length); return; }
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.85 - r.top) / (r.height * 0.75)));
      setAcesas(Math.round(p * palavras.length));
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => { removeEventListener("scroll", pedir); removeEventListener("resize", pedir); if (raf) cancelAnimationFrame(raf); };
  }, [palavras.length]);
  return (
    <section ref={ref} className="ir-cit">
      {fichas.map((f) => (
        <div key={f.rotulo} className="ir-ficha" aria-hidden="true"><i style={{ background: f.cor }} />{f.rotulo} <b>{f.valor}</b></div>
      ))}
      <div className="ir-faixa">
        <blockquote>
          {palavras.map((w, k) => <Fragment key={k}><span data-aceso={k < acesas ? "true" : "false"}>{w}</span>{k < palavras.length - 1 ? " " : null}</Fragment>)}
        </blockquote>
      </div>
    </section>
  );
}

/* ============================================================
 * PERGUNTAS
 * ============================================================ */
export function Perguntas({ itens }: { itens: Array<{ p: string; r: string }> }) {
  return (
    <div className="ir-perguntas">
      {itens.map((f, k) => (
        <details key={f.p} open={k === 0}>
          <summary>{f.p}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></summary>
          <p>{f.r}</p>
        </details>
      ))}
    </div>
  );
}
