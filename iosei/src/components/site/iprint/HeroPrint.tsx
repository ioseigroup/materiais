import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logoPrint from "@/assets/iprint-escuro.png";
import f0 from "@/assets/case-brainmra-before.jpg";
import f1 from "@/assets/clari/ace_arco_depois.jpg";
import f2 from "@/assets/case-braint1-before.jpg";
import f3 from "@/assets/clari/ct_pulmao_depois.jpg";
import f4 from "@/assets/clari/ct_abd_depois.jpg";
import f5 from "@/assets/case-braint1-after.jpg";
import f6 from "@/assets/clari/ace_tronco_depois.jpg";
import f7 from "@/assets/case-brainmra-after.jpg";
import { Seta } from "@/components/site/irad2/pecas";
import { useRolagem, seg, suave, mix, janela, clamp } from "@/components/site/comum/rolagem";

/**
 * I-PRINT: cena presa à rolagem, nos cinzas de um resultado de exame impresso.
 * Hoje a impressora solta filme para todo exame e a pilha de não retirados cresce.
 * Com o I-PRINT, os exames entram numa fila e só o que foi solicitado é impresso.
 * Sem números inventados: o único número é o do material oficial (até 90% menos associações manuais).
 */

const FILMES = [f0, f1, f2, f3, f4, f5, f6, f7];
const N_AUTO = 8; // filmes impressos no automático
const FILA = [
  { img: f2, nome: "Ressonância de crânio" },
  { img: f4, nome: "Tomografia de abdome" },
  { img: f0, nome: "Angiorressonância" },
  { img: f3, nome: "Tomografia de tórax" },
  { img: f6, nome: "Angiotomografia" },
];
const SOLICITADO = 1; // linha da fila que o paciente pede

const R = { intro: 0.1, auto: [0.11, 0.34] as const, fila: [0.37, 0.55] as const, pede: [0.58, 0.76] as const, ia: [0.79, 0.93] as const, fecho: 0.95 };
const ETAPAS: Array<[number, number]> = [[0, R.intro], [0.12, 0.35], [0.37, 0.56], [0.58, 0.77], [0.79, 0.93], [R.fecho, 1]];

/* aleatório fixo para a pilha */
const giro = [-9, 6, -4, 11, -7, 3, -12, 8];
const desvio = [[-10, 4], [14, -6], [-4, 10], [8, 2], [-14, -2], [4, 8], [-6, -8], [12, 6]];

export function HeroPrint() {
  const secRef = useRef<HTMLElement | null>(null);
  const palcoRef = useRef<HTMLDivElement | null>(null);
  const filmeRef = useRef<Array<HTMLDivElement | null>>([]);
  const entregueRef = useRef<HTMLDivElement | null>(null);
  const pilhaRotRef = useRef<HTMLDivElement | null>(null);
  const bandejaRef = useRef<HTMLDivElement | null>(null);
  const filaRef = useRef<HTMLDivElement | null>(null);
  const linhaRef = useRef<Array<HTMLDivElement | null>>([]);
  const statusRef = useRef<Array<HTMLElement | null>>([]);
  const impRef = useRef<HTMLDivElement | null>(null);
  const luzRef = useRef<HTMLElement | null>(null);
  const textoRef = useRef<Array<HTMLDivElement | null>>([]);
  const chipRef = useRef<Array<HTMLDivElement | null>>([]);
  const iaRef = useRef<HTMLDivElement | null>(null);
  const varreRef = useRef<HTMLElement | null>(null);
  const campoRef = useRef<Array<HTMLElement | null>>([]);
  const trilhoRef = useRef<HTMLElement | null>(null);
  const dicaRef = useRef<HTMLDivElement | null>(null);
  const L = useRef({ W: 1, H: 1, fw: 100, fh: 125, imp: { x: 0, y: 0, w: 0 }, pilha: { x: 0, y: 0 }, bandeja: { x: 0, y: 0 }, estreito: false });

  const medir = () => {
    const palco = palcoRef.current; if (!palco) return;
    const W = palco.clientWidth, H = palco.clientHeight, estreito = W < 860;
    const fw = estreito ? Math.min(W * 0.2, H * 0.11) : Math.min(W * 0.085, H * 0.15);
    const fh = fw * 1.24;
    if (estreito) {
      L.current = { W, H, fw, fh, estreito, imp: { x: W * 0.36, y: 54, w: W * 0.5 }, pilha: { x: W * 0.22, y: H * 0.36 }, bandeja: { x: W * 0.72, y: H * 0.6 } };
    } else {
      L.current = { W, H, fw, fh, estreito, imp: { x: W * 0.62, y: H * 0.07, w: W * 0.24 }, pilha: { x: W * 0.55, y: H * 0.66 }, bandeja: { x: W * 0.74, y: H * 0.66 } };
    }
    const imp = impRef.current;
    if (imp) { imp.style.left = `${L.current.imp.x - L.current.imp.w / 2}px`; imp.style.top = `${L.current.imp.y}px`; imp.style.width = `${L.current.imp.w}px`; }
    [...filmeRef.current, entregueRef.current].forEach((el) => { if (el) { el.style.width = `${fw}px`; el.style.height = `${fh}px`; } });
    const pr = pilhaRotRef.current; if (pr) { pr.style.left = `${L.current.pilha.x}px`; pr.style.top = `${L.current.pilha.y + fh * 0.62}px`; }
    const bj = bandejaRef.current; if (bj) { bj.style.left = `${L.current.bandeja.x}px`; bj.style.top = `${L.current.bandeja.y - fh * 0.62}px`; bj.style.width = `${fw * 1.7}px`; bj.style.height = `${fh * 1.24}px`; }
  };

  const pintar = (p: number) => {
    const { fw, fh, imp, pilha, bandeja, estreito } = L.current;
    const saidaY = imp.y + 34;

    ETAPAS.forEach(([a, b], i) => {
      const el = textoRef.current[i]; if (!el) return;
      const o = i === 0 ? 1 - suave(seg(p, b - 0.03, b)) : i === ETAPAS.length - 1 ? suave(seg(p, a, a + 0.02)) : janela(p, a, b, 0.02);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * 22).toFixed(1)}px, 0)`;
      el.style.visibility = o < 0.01 ? "hidden" : "visible";
      if (o > 0.5) el.removeAttribute("inert"); else el.setAttribute("inert", "");
    });

    // a pilha de não retirados some quando a fila entra
    const pilhaSome = suave(seg(p, R.fila[0], R.fila[0] + 0.06));
    let imprimindo = 0;
    for (let i = 0; i < N_AUTO; i++) {
      const el = filmeRef.current[i]; if (!el) continue;
      const t0 = R.auto[0] + 0.01 + i * 0.026;
      const u = seg(p, t0, t0 + 0.05);
      if (u > 0 && u < 1) imprimindo = 1;
      let x = imp.x - fw / 2, y = saidaY - fh, rot = 0, o = 0;
      if (u > 0) {
        o = 1;
        const sai = suave(seg(u, 0, 0.42));
        const cai = suave(seg(u, 0.42, 1));
        const yOut = saidaY - fh + sai * fh * 0.92;
        const [dx, dy] = desvio[i];
        const xs = pilha.x - fw / 2 + dx * (estreito ? 0.5 : 1), ys = pilha.y - fh / 2 + dy - i * 3;
        x = mix(imp.x - fw / 2, xs, cai);
        y = mix(yOut, ys, cai) - Math.sin(cai * Math.PI) * 30;
        rot = giro[i] * cai;
      }
      o *= 1 - pilhaSome;
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg) scale(${(1 - 0.12 * pilhaSome).toFixed(3)})`;
      el.style.zIndex = String(10 + i);
    }
    const pr = pilhaRotRef.current;
    if (pr) pr.style.opacity = (suave(seg(p, R.auto[0] + 0.06, R.auto[0] + 0.1)) * (1 - pilhaSome)).toFixed(3);

    // fila inteligente
    const fila = filaRef.current;
    const filaO = suave(seg(p, R.fila[0] - 0.01, R.fila[0] + 0.03)) * (1 - suave(seg(p, R.ia[0] - 0.02, R.ia[0] + 0.01))) * (1 - suave(seg(p, R.fecho - 0.02, R.fecho)));
    if (fila) { fila.style.opacity = filaO.toFixed(3); fila.style.visibility = filaO < 0.01 ? "hidden" : "visible"; }
    linhaRef.current.forEach((el, j) => {
      if (!el) return;
      const t0 = R.fila[0] + 0.025 + j * 0.026;
      const u = suave(seg(p, t0, t0 + 0.03));
      el.style.opacity = u.toFixed(3);
      el.style.transform = `translate3d(${((1 - u) * -40).toFixed(1)}px, 0, 0)`;
      const pedido = j === SOLICITADO && p >= R.pede[0] + 0.02;
      const entregue = j === SOLICITADO && p >= R.pede[0] + 0.12;
      const estado = entregue ? "entregue" : pedido ? "pedido" : "espera";
      if (el.dataset.estado !== estado) {
        el.dataset.estado = estado;
        const st = statusRef.current[j];
        if (st) st.textContent = entregue ? "Impresso e entregue" : pedido ? "Solicitado: imprimindo" : "Aguardando solicitação";
      }
    });

    // impressão sob acionamento: um filme sai e vai para a bandeja
    const ent = entregueRef.current;
    if (ent) {
      const u = seg(p, R.pede[0] + 0.03, R.pede[0] + 0.11);
      if (u > 0 && u < 1) imprimindo = 1;
      const sai = suave(seg(u, 0, 0.45)), vai = suave(seg(u, 0.45, 1));
      const yOut = saidaY - fh + sai * fh * 0.92;
      const x = mix(imp.x - fw / 2, bandeja.x + fw * 0.35, vai), y = mix(yOut, bandeja.y - fh / 2, vai) - Math.sin(vai * Math.PI) * 26;
      const o = (u > 0 ? 1 : 0) * (1 - suave(seg(p, R.ia[0] - 0.02, R.ia[0] + 0.01))) * (1 - suave(seg(p, R.fecho - 0.02, R.fecho)));
      ent.style.opacity = o.toFixed(3);
      ent.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(-3 * vai).toFixed(1)}deg)`;
    }
    const bj = bandejaRef.current;
    if (bj) bj.style.opacity = (janela(p, R.pede[0], R.ia[0], 0.02)).toFixed(3);
    if (luzRef.current) luzRef.current.dataset.on = String(imprimindo === 1);
    const impEl = impRef.current;
    if (impEl) impEl.style.opacity = (1 - suave(seg(p, R.ia[0] - 0.02, R.ia[0] + 0.01)) * 0.85).toFixed(3);

    // selos
    const CHIPS: Array<[number, number]> = [[0.15, 0.35], [0.2, 0.35], [0.25, 0.35], [0.62, 0.77], [0.82, 0.93]];
    chipRef.current.forEach((el, i) => {
      if (!el) return;
      const [a, b] = CHIPS[i];
      const o = janela(p, a, b, 0.018);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * 14).toFixed(1)}px, 0)`;
    });

    // identificação por IA: leitura dos dados gravados dentro da imagem
    const ia = iaRef.current;
    if (ia) {
      const o = janela(p, R.ia[0], R.ia[1] + 0.01, 0.02);
      ia.style.opacity = o.toFixed(3);
      ia.style.visibility = o < 0.01 ? "hidden" : "visible";
      ia.style.transform = `translate3d(0, ${((1 - o) * 30).toFixed(1)}px, 0) scale(${mix(0.92, 1, o).toFixed(3)})`;
      const v = seg(p, R.ia[0] + 0.02, R.ia[0] + 0.08);
      varreRef.current?.style.setProperty("--varre", v.toFixed(3));
      campoRef.current.forEach((c, i) => { if (c) c.dataset.lido = String(v > 0.35 + i * 0.25); });
    }
    if (trilhoRef.current) trilhoRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    if (dicaRef.current) dicaRef.current.style.opacity = (1 - suave(p / 0.03)).toFixed(2);
  };

  useRolagem(secRef, pintar, medir);

  const textos: ReactNode[] = [
    <div className="ir-vidro ir-vidro--g ipc__vidro" key="intro">
      <img className="ipc__logo" src={logoPrint} alt="I-PRINT On Demand" />
      <h1 className="ir-h1">Imprima somente o que <span className="ir-acento">o paciente vai retirar.</span></h1>
      <p className="ir-lead">Elimine o desperdício estrutural da impressão na radiologia, sem mudar a sua operação.</p>
    </div>,
    <div className="ir-vidro ipc__vidro" key="hoje">
      <h2 className="ir-h2">Hoje, sua operação imprime tudo no automático.</h2>
      <p className="ir-texto">Todo exame gera impressão, independente de retirada. Os pacientes não retornam, os insumos são descartados e o custo fixo por exame aumenta sem visibilidade.</p>
    </div>,
    <div className="ir-vidro ipc__vidro" key="fila">
      <h2 className="ir-h2">O I-PRINT intercepta a impressão.</h2>
      <p className="ir-texto">Cada exame entra numa fila inteligente, com rastreabilidade completa. Nada sai da impressora sem uma solicitação.</p>
    </div>,
    <div className="ir-vidro ipc__vidro" key="pede">
      <h2 className="ir-h2">Se não foi solicitado, não é impresso.</h2>
      <p className="ir-texto">A impressão acontece sob acionamento, só para o exame que o paciente ou o médico realmente pediu.</p>
    </div>,
    <div className="ir-vidro ipc__vidro" key="ia">
      <h2 className="ir-h2">A única solução com identificação automática por IA.</h2>
      <p className="ir-texto">Os dados do paciente não estão no cabeçalho DICOM, estão dentro da imagem. O I-PRINT extrai essas informações automaticamente.</p>
    </div>,
    <div className="ir-vidro ipc__vidro" key="fecho">
      <h2 className="ir-h2">Menos custos, mais controle, nenhum desperdício.</h2>
      <Link to={"/contato" as any} className="ir-botao">Solicitar demonstração<Seta /></Link>
    </div>,
  ];

  return (
    <section ref={secRef} className="ipc" style={{ height: "760vh" }} aria-label="I-PRINT: impressão sob demanda de exames de imagem">
      <div ref={palcoRef} className="ipc__palco">
        <i className="ipc__papel" aria-hidden="true" />

        <div ref={impRef} className="ipc__impressora" aria-hidden="true">
          <div className="ipc__corpo"><i ref={luzRef} className="ipc__luz" data-on="false" /><span>Impressora de filmes</span></div>
          <div className="ipc__fenda" />
        </div>

        <div ref={pilhaRotRef} className="ipc__rot ipc__rot--pilha" style={{ opacity: 0 }} aria-hidden="true">Impressos e não retirados</div>
        <div ref={bandejaRef} className="ipc__bandeja" style={{ opacity: 0 }} aria-hidden="true"><span>Entregue ao paciente</span></div>

        {FILMES.map((src, i) => (
          <div key={i} ref={(el) => { filmeRef.current[i] = el; }} className="ipc__filme" style={{ opacity: 0 }} aria-hidden="true">
            <img src={src} alt="" draggable={false} /><i />
          </div>
        ))}
        <div ref={entregueRef} className="ipc__filme ipc__filme--ok" style={{ opacity: 0 }} aria-hidden="true">
          <img src={FILA[SOLICITADO].img} alt="" draggable={false} /><i />
        </div>

        <div ref={filaRef} className="ipc__fila" style={{ opacity: 0, visibility: "hidden" }}>
          <strong>Fila inteligente</strong>
          {FILA.map((f, j) => (
            <div key={j} ref={(el) => { linhaRef.current[j] = el; }} className="ipc__linha" data-estado="espera" style={{ opacity: 0 }}>
              <img src={f.img} alt="" />
              <div><b>{f.nome}</b><span ref={(el) => { statusRef.current[j] = el; }}>Aguardando solicitação</span></div>
            </div>
          ))}
        </div>

        <div className="ipc__chip" data-pos="1" ref={(el) => { chipRef.current[0] = el; }} style={{ opacity: 0 }}><b>Insumos descartados</b><span>filme, papel e insumos sem necessidade</span></div>
        <div className="ipc__chip" data-pos="2" ref={(el) => { chipRef.current[1] = el; }} style={{ opacity: 0 }}><b>Custo fixo invisível</b><span>cresce junto com o volume de exames</span></div>
        <div className="ipc__chip" data-pos="3" ref={(el) => { chipRef.current[2] = el; }} style={{ opacity: 0 }}><b>Desperdício recorrente</b><span>não é pontual, é estrutural</span></div>
        <div className="ipc__chip" data-pos="4" ref={(el) => { chipRef.current[3] = el; }} style={{ opacity: 0 }}><b>Impressão sob acionamento</b><span>só o exame solicitado sai da impressora</span></div>
        <div className="ipc__chip ipc__chip--forte" data-pos="5" ref={(el) => { chipRef.current[4] = el; }} style={{ opacity: 0 }}><b>até 90%</b><span>menos associações manuais</span></div>

        <div ref={iaRef} className="ipc__ia" style={{ opacity: 0, visibility: "hidden" }} aria-hidden="true">
          <div className="ipc__ia-filme">
            <img src={f2} alt="" draggable={false} />
            <div className="ipc__gravado"><i /><i /><i /></div>
            <i ref={varreRef} className="ipc__varre" />
          </div>
          <div className="ipc__campos">
            <span ref={(el) => { campoRef.current[0] = el; }} data-lido="false">Paciente identificado</span>
            <span ref={(el) => { campoRef.current[1] = el; }} data-lido="false">Exame associado</span>
            <span ref={(el) => { campoRef.current[2] = el; }} data-lido="false">Pronto para a fila</span>
          </div>
        </div>

        <div className="ipc__textos">
          {textos.map((t, i) => (
            <div key={i} ref={(el) => { textoRef.current[i] = el; }} className="ipc__etapa" style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}>{t}</div>
          ))}
        </div>

        <div ref={dicaRef} className="ipc__dica" aria-hidden="true">
          Role para baixo e veja a impressão mudar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>
        <div className="ipc__trilho" aria-hidden="true"><i ref={trilhoRef} /></div>
      </div>
    </section>
  );
}

void clamp;
export default HeroPrint;
