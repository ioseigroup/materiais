import { useEffect, useRef, type ReactNode } from "react";
import type { Caso } from "./pecasSwift";
import semvazia from "@/assets/swift2-salas/sem_vazia.webp";
import semp1s1 from "@/assets/swift2-salas/sem_p1_s1.webp";
import semp1s2 from "@/assets/swift2-salas/sem_p1_s2.webp";
import semp1s3 from "@/assets/swift2-salas/sem_p1_s3.webp";
import semp2s1 from "@/assets/swift2-salas/sem_p2_s1.webp";
import semp2s2 from "@/assets/swift2-salas/sem_p2_s2.webp";
import semp2s3 from "@/assets/swift2-salas/sem_p2_s3.webp";
import comvazia from "@/assets/swift2-salas/com_vazia.webp";
import comp3s1 from "@/assets/swift2-salas/com_p3_s1.webp";
import comp3s2 from "@/assets/swift2-salas/com_p3_s2.webp";
import comp3s3 from "@/assets/swift2-salas/com_p3_s3.webp";
import comp4s1 from "@/assets/swift2-salas/com_p4_s1.webp";
import comp4s2 from "@/assets/swift2-salas/com_p4_s2.webp";
import comp4s3 from "@/assets/swift2-salas/com_p4_s3.webp";
import comp5s1 from "@/assets/swift2-salas/com_p5_s1.webp";
import comp5s2 from "@/assets/swift2-salas/com_p5_s2.webp";
import comp5s3 from "@/assets/swift2-salas/com_p5_s3.webp";

/**
 * Versão B (nova) do SwiftMR: duas salas de RM lado a lado, em time-lapse de fotos.
 * À esquerda, sem SwiftMR; à direita, com SwiftMR. A rolagem faz o tempo passar.
 * Depois, corte para os resultados reais de antes e depois.
 *
 * Tempos reais: protocolo de coluna lombar medido em Apucarana (PR), 21:05 sem e 12:12 com
 * SwiftMR. A troca de paciente é curta (1 min) e igual nas duas salas. No mesmo intervalo,
 * a esquerda conclui 2 exames e a direita conclui 3, com o 4º já em aquisição.
 * A rolagem desacelera durante as trocas, para que as fotos do time-lapse fiquem visíveis.
 */

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
const mmss = (min: number) => { const s = Math.round(min * 60); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
const segs = (t: string) => { const [m, s] = t.split(":").map(Number); return m * 60 + s; };

/* tempos em minutos */
const AQ_SEM = 21 + 5 / 60;
const AQ_COM = 12 + 12 / 60;
const TROCA = 1; // troca de paciente curta, igual nas duas salas
const TOTAL = 2 * (TROCA + AQ_SEM); // a sala sem SwiftMR conclui 2 exames
const XF = 0.12; // dissolve entre fotos, em minutos

/* roteiro da rolagem */
const R = {
  intro: 0.07,
  t0: 0.1,
  t1: 0.66,
  resumo: [0.675, 0.75] as const,
  corte: [0.755, 0.785] as const,
  caso1: [0.79, 0.875] as const,
  caso2: [0.885, 0.96] as const,
  fim: 0.965,
};

type Trecho = { de: number; ate: number; foto: number; aq?: { de: number; dur: number } };

/* cada paciente: índices das fotos sentado, bobina e na máquina */
function agenda(pacientes: number[][], aq: number): Trecho[] {
  const out: Trecho[] = [];
  let t = 0;
  for (const [f1, f2, f3] of pacientes) {
    const a = t + TROCA * 0.22, b = a + TROCA * 0.38, c = b + TROCA * 0.4, d = c + aq;
    out.push({ de: t, ate: a, foto: 0 }, { de: a, ate: b, foto: f1 }, { de: b, ate: c, foto: f2 }, { de: c, ate: d, foto: f3, aq: { de: c, dur: aq } });
    t = d;
  }
  out.push({ de: t, ate: 1e9, foto: 0 });
  return out;
}

const SALAS = [
  { id: "sem", fotos: [semvazia, semp1s1, semp1s2, semp1s3, semp2s1, semp2s2, semp2s3], agenda: agenda([[1, 2, 3], [4, 5, 6]], AQ_SEM), aq: AQ_SEM, pontos: 2 },
  // o 4º paciente da direita repete as fotos do primeiro
  { id: "com", fotos: [comvazia, comp3s1, comp3s2, comp3s3, comp4s1, comp4s2, comp4s3, comp5s1, comp5s2, comp5s3], agenda: agenda([[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3]], AQ_COM), aq: AQ_COM, pontos: 4 },
];

/* rolagem -> tempo: desacelera nas trocas de qualquer sala */
const MAPA_T: number[] = (() => {
  const N = 2400, PESO_TROCA = 9;
  const emTroca = (t: number) => SALAS.some((s) => s.agenda.some((x) => !x.aq && x.ate < 1e8 && t >= x.de && t < x.ate));
  const acum = [0];
  for (let i = 1; i <= N; i++) { const t = (TOTAL * (i - 0.5)) / N; acum.push(acum[i - 1] + (emTroca(t) ? PESO_TROCA : 1)); }
  const tot = acum[N];
  return acum.map((v) => v / tot);
})();
function tempoDe(u: number) {
  const N = MAPA_T.length - 1;
  let lo = 0, hi = N;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (MAPA_T[m] <= u) lo = m; else hi = m; }
  const f = (u - MAPA_T[lo]) / Math.max(1e-9, MAPA_T[hi] - MAPA_T[lo]);
  return (TOTAL * (lo + clamp(f))) / N;
}

/* geometria da foto recortada (1080 x 1198): centro do túnel e raio do anel */
const FOTO = { w: 1080, h: 1198, cx: 0.5, cy: 0.463, raio: 0.118, px: 0.5, py: 0.5 };

type Aviso = { t: number; titulo: string; texto?: string; mini?: boolean };
const AVISOS: Aviso[][] = [
  [
    { t: 15, titulo: "Agenda atrasando", texto: "O próximo paciente já espera na recepção." },
    { t: 27.5, titulo: "NPS em queda", texto: "Atraso vira reclamação e avaliação negativa." },
    { t: 37, titulo: "Receita perdida", texto: "Horários que não cabem no dia deixam de ser faturados." },
  ],
  [
    { t: 4.5, titulo: "42,13% menos tempo de aquisição", texto: "Coluna lombar em Apucarana (PR), de 21:05 para 12:12." },
    { t: 16.5, titulo: "Imagem pronta para o laudo", mini: true },
    { t: 30, titulo: "Agenda em dia", texto: "Mais horários livres para encaixes e urgências." },
  ],
];

export function HeroDuasSalas({ intro, casos, fecho, altura = 900, rotulo }: { intro: ReactNode; casos: Caso[]; fecho: ReactNode; altura?: number; rotulo: string }) {
  const secRef = useRef<HTMLElement | null>(null);
  const salasRef = useRef<HTMLDivElement | null>(null);
  const salaRef = useRef<Array<HTMLDivElement | null>>([]);
  const fotoRef = useRef<Array<Array<HTMLImageElement | null>>>([[], []]);
  const anelRef = useRef<Array<SVGCircleElement | null>>([]);
  const anelFundoRef = useRef<Array<SVGCircleElement | null>>([]);
  const svgRef = useRef<Array<SVGSVGElement | null>>([]);
  const relogioRef = useRef<Array<HTMLDivElement | null>>([]);
  const relTempoRef = useRef<Array<HTMLElement | null>>([]);
  const relRotRef = useRef<Array<HTMLElement | null>>([]);
  const contRef = useRef<Array<HTMLElement | null>>([]);
  const pontosRef = useRef<Array<Array<HTMLElement | null>>>([[], []]);
  const avisoRef = useRef<Array<Array<HTMLDivElement | null>>>([[], []]);
  const introRef = useRef<HTMLDivElement | null>(null);
  const dicaRef = useRef<HTMLDivElement | null>(null);
  const meioRef = useRef<HTMLDivElement | null>(null);
  const meioBarraRef = useRef<HTMLElement | null>(null);
  const resumoRef = useRef<HTMLDivElement | null>(null);
  const totalRef = useRef<Array<HTMLDivElement | null>>([]);
  const resRef = useRef<HTMLDivElement | null>(null);
  const casoRef = useRef<Array<HTMLDivElement | null>>([]);
  const resNomeRef = useRef<HTMLElement | null>(null);
  const resDetRef = useRef<HTMLElement | null>(null);
  const barraRef = useRef<Array<HTMLElement | null>>([]);
  const resTempoRef = useRef<Array<HTMLElement | null>>([]);
  const fimRef = useRef<HTMLDivElement | null>(null);
  const trilhoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    let vivo = true, raf = 0, atual = -1;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const progresso = () => {
      const r = sec.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      return curso > 0 ? clamp(-r.top / curso) : 0;
    };

    // posiciona o anel e o relógio sobre o túnel de cada sala
    const geometria = () => {
      salaRef.current.forEach((sala, i) => {
        if (!sala) return;
        const cw = sala.clientWidth, ch = sala.clientHeight;
        const s = Math.max(cw / FOTO.w, ch / FOTO.h);
        const ox = (cw - FOTO.w * s) * FOTO.px, oy = (ch - FOTO.h * s) * FOTO.py;
        const x = ox + FOTO.cx * FOTO.w * s, y = oy + FOTO.cy * FOTO.h * s, r = FOTO.raio * FOTO.w * s;
        const svg = svgRef.current[i];
        if (svg) svg.setAttribute("viewBox", `0 0 ${cw} ${ch}`);
        [anelRef.current[i], anelFundoRef.current[i]].forEach((c) => { if (c) { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); c.setAttribute("r", r.toFixed(1)); } });
        const anel = anelRef.current[i];
        if (anel) anel.style.strokeDasharray = `${(2 * Math.PI * r).toFixed(1)}`;
        const rel = relogioRef.current[i];
        if (rel) { rel.style.left = `${x.toFixed(1)}px`; rel.style.top = `${(y - r - 10).toFixed(1)}px`; }
      });
    };

    const pintar = (p: number) => {
      const t = p >= R.t1 ? TOTAL : tempoDe(seg(p, R.t0, R.t1));
      const naCena = p < R.corte[1];

      SALAS.forEach((sala, i) => {
        // foto atual e dissolve para a próxima
        const ag = sala.agenda;
        let k = ag.findIndex((x) => t < x.ate);
        if (k < 0) k = ag.length - 1;
        const cur = ag[k], prox = ag[k + 1];
        const mistura = prox ? suave((t - (cur.ate - XF)) / XF) : 0;
        const fotos = fotoRef.current[i];
        fotos.forEach((img, f) => {
          if (!img) return;
          let o = 0;
          if (f === cur.foto) o = 1;
          if (prox && f === prox.foto) o = Math.max(o, mistura);
          img.style.opacity = o.toFixed(3);
          img.style.zIndex = prox && f === prox.foto ? "2" : f === cur.foto ? "1" : "0";
        });

        // anel e relógio da aquisição
        const emAq = cur.aq && t >= cur.aq.de;
        const prog = emAq && cur.aq ? clamp((t - cur.aq.de) / cur.aq.dur) : 0;
        const anel = anelRef.current[i];
        if (anel) {
          const circ = parseFloat(anel.style.strokeDasharray || "0");
          anel.style.strokeDashoffset = (circ * (1 - prog)).toFixed(1);
        }
        const opAq = (emAq ? 1 - suave((t - (cur.ate - XF)) / XF) : 0) * (1 - suave(seg(p, R.resumo[0], R.resumo[0] + 0.02)));
        const svg = svgRef.current[i];
        if (svg) svg.style.opacity = (opAq * (naCena ? 1 : 0)).toFixed(3);
        const rt = relTempoRef.current[i], rr = relRotRef.current[i];
        if (rt) rt.textContent = emAq && cur.aq ? mmss(Math.min(cur.aq.dur, t - cur.aq.de)) : "00:00";
        if (rr) rr.textContent = `de ${mmss(sala.aq)}`;
        const rel = relogioRef.current[i];
        if (rel) rel.style.opacity = (opAq * (p > R.t0 - 0.005 ? 1 : 0)).toFixed(3);

        // exames concluídos
        const feitos = ag.filter((x) => x.aq && t >= x.ate - 1e-6).length;
        const cont = contRef.current[i];
        if (cont && cont.textContent !== String(feitos)) cont.textContent = String(feitos);
        pontosRef.current[i].forEach((el, j) => {
          if (!el) return;
          el.dataset.feito = j < feitos ? "true" : "false";
          el.style.setProperty("--prog", j < feitos ? "1" : j === feitos ? prog.toFixed(3) : "0");
        });
        const placar = cont?.parentElement;
        if (placar) placar.style.opacity = ((1 - suave(seg(p, R.resumo[0], R.resumo[0] + 0.02))) * suave(seg(p, R.intro, R.t0))).toFixed(3);

        // avisos
        const lista = AVISOS[i];
        let ultimo = -1;
        lista.forEach((a, j) => { if (t >= a.t) ultimo = j; });
        avisoRef.current[i].forEach((el, j) => {
          if (!el) return;
          const a = lista[j];
          const velho = j < ultimo - 1 ? suave((t - lista[j + 2].t) / 1.2) : 0;
          const e = suave((t - a.t) / 1.2) * (1 - velho) * (1 - suave(seg(p, R.resumo[0], R.resumo[0] + 0.02)));
          el.style.visibility = e < 0.01 ? "hidden" : "visible";
          el.style.opacity = e.toFixed(3);
          el.style.transform = `translate3d(0, ${((1 - e) * 16).toFixed(1)}px, 0)`;
          el.dataset.ultimo = j === ultimo ? "true" : "false";
        });

        // total do resumo
        const tot = totalRef.current[i];
        if (tot) {
          const o = Math.min(suave(seg(p, R.resumo[0], R.resumo[0] + 0.02)), 1 - suave(seg(p, R.corte[0], R.corte[0] + 0.015)));
          tot.style.opacity = o.toFixed(3);
          tot.style.transform = `translate3d(0, ${((1 - o) * 18).toFixed(1)}px, 0)`;
        }
      });

      // introdução
      if (dicaRef.current) dicaRef.current.style.opacity = (1 - suave(p / 0.03)).toFixed(2);
      const intro = introRef.current;
      if (intro) {
        const o = 1 - suave(seg(p, R.intro, R.t0 - 0.005));
        intro.style.opacity = o.toFixed(3);
        intro.style.transform = `translate3d(0, ${(semMovimento ? 0 : -(1 - o) * 30).toFixed(1)}px, 0)`;
        intro.style.visibility = o < 0.01 ? "hidden" : "visible";
        if (o > 0.5) intro.removeAttribute("inert"); else intro.setAttribute("inert", "");
      }
      if (salasRef.current) {
        const veu = 1 - suave(seg(p, R.intro, R.t0));
        salasRef.current.style.setProperty("--veu", veu.toFixed(3));
        salasRef.current.style.opacity = (1 - suave(seg(p, R.corte[0], R.corte[1]))).toFixed(3);
      }

      // marcador central de tempo
      const meio = meioRef.current;
      if (meio) {
        const o = Math.min(suave(seg(p, R.t0 - 0.01, R.t0 + 0.01)), 1 - suave(seg(p, R.corte[0], R.corte[0] + 0.015)));
        meio.style.opacity = o.toFixed(3);
      }
      if (meioBarraRef.current) meioBarraRef.current.style.transform = `scaleX(${seg(p, R.t0, R.t1).toFixed(4)})`;

      // resumo
      const resumo = resumoRef.current;
      if (resumo) {
        const o = Math.min(suave(seg(p, R.resumo[0] + 0.01, R.resumo[0] + 0.03)), 1 - suave(seg(p, R.corte[0], R.corte[0] + 0.015)));
        resumo.style.opacity = o.toFixed(3);
        resumo.style.visibility = o < 0.01 ? "hidden" : "visible";
      }

      // resultados reais: antes e depois
      const res = resRef.current;
      if (res) {
        const o = suave(seg(p, R.corte[0] + 0.01, R.corte[1] + 0.005));
        res.style.opacity = (o * (1 - 0.75 * suave(seg(p, R.fim, R.fim + 0.02)))).toFixed(3);
        res.style.visibility = o < 0.01 ? "hidden" : "visible";
        const qual = p >= (R.caso1[1] + R.caso2[0]) / 2 ? 1 : 0;
        const tr = suave(seg(p, R.caso1[1], R.caso2[0]));
        casoRef.current.forEach((el, j) => { if (el) el.style.opacity = (j % 2 === 0 ? 1 - tr : tr).toFixed(3); });
        const c = casos[qual] ?? casos[0];
        if (resNomeRef.current && resNomeRef.current.textContent !== c.nome) resNomeRef.current.textContent = c.nome;
        if (resDetRef.current && resDetRef.current.textContent !== c.detalhe) resDetRef.current.textContent = c.detalhe;
        const faixa = qual ? R.caso2 : R.caso1;
        const avanco = suave(seg(p, faixa[0], faixa[0] + (faixa[1] - faixa[0]) * 0.55));
        const ta = segs(c.tempoAntes), td = segs(c.tempoDepois);
        const decorrido = ta * avanco;
        const [b0, b1] = barraRef.current, [t0, t1] = resTempoRef.current;
        if (b0) b0.style.transform = `scaleX(${(decorrido / ta).toFixed(3)})`;
        if (b1) b1.style.transform = `scaleX(${(Math.min(td, decorrido) / ta).toFixed(3)})`;
        if (t0) t0.textContent = mmss(decorrido / 60);
        if (t1) t1.textContent = mmss(Math.min(td, decorrido) / 60);
      }

      const fim = fimRef.current;
      if (fim) {
        const o = suave(seg(p, R.fim, R.fim + 0.02));
        fim.style.opacity = o.toFixed(3);
        fim.style.visibility = o < 0.01 ? "hidden" : "visible";
        if (o > 0.5) fim.removeAttribute("inert"); else fim.setAttribute("inert", "");
      }
      if (trilhoRef.current) trilhoRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };

    const laco = () => {
      raf = 0;
      if (!vivo) return;
      const alvo = progresso();
      if (atual < 0 || semMovimento) atual = alvo; else atual += (alvo - atual) * 0.18;
      if (Math.abs(alvo - atual) < 0.0001) atual = alvo;
      pintar(atual);
      if (atual !== alvo) raf = requestAnimationFrame(laco);
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(laco); };
    const redimensionar = () => { geometria(); atual = -1; pedir(); };
    const ro = new ResizeObserver(redimensionar);
    salaRef.current.forEach((s) => s && ro.observe(s));
    window.addEventListener("scroll", pedir, { passive: true });
    geometria();
    pedir();
    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", pedir);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exames = [2, 3];
  return (
    <section ref={secRef} className="sds" style={{ height: `${altura}vh` }} aria-label={rotulo}>
      <div className="sds__palco">
        <div ref={salasRef} className="sds__salas">
          {SALAS.map((sala, i) => (
            <div key={sala.id} ref={(el) => { salaRef.current[i] = el; }} className="sds__sala" data-lado={sala.id}>
              {sala.fotos.map((src, f) => (
                <img key={f} ref={(el) => { fotoRef.current[i][f] = el; }} src={src} alt="" draggable={false} className="sds__foto" style={{ opacity: f === 0 ? 1 : 0 }} />
              ))}
              <i className="sds__veu" aria-hidden="true" />
              <svg ref={(el) => { svgRef.current[i] = el; }} className="sds__anel" aria-hidden="true" style={{ opacity: 0 }}>
                <circle ref={(el) => { anelFundoRef.current[i] = el; }} className="sds__anel-fundo" />
                <circle ref={(el) => { anelRef.current[i] = el; }} className="sds__anel-prog" />
              </svg>
              <div ref={(el) => { relogioRef.current[i] = el; }} className="sds__relogio" style={{ opacity: 0 }} aria-hidden="true">
                <b ref={(el) => { relTempoRef.current[i] = el; }}>00:00</b>
                <span ref={(el) => { relRotRef.current[i] = el; }}>de {mmss(sala.aq)}</span>
              </div>

              <div className="sds__nome">
                {i === 0 ? <strong>Sem SwiftMR</strong> : <strong>Com Swift<b>MR</b></strong>}
              </div>

              <div className="sds__avisos">
                {AVISOS[i].map((a, j) => (
                  <div key={j} ref={(el) => { avisoRef.current[i][j] = el; }} className="sds__aviso" data-tipo={i === 0 ? "ruim" : "bom"} style={{ opacity: 0 }}>
                    <i aria-hidden="true">{i === 0 ? "!" : "✓"}</i>
                    <div>
                      <strong>{a.titulo}</strong>
                      {a.texto && <span>{a.texto}</span>}
                      {a.mini && casos[0] && (
                        <div className="sds__mini">
                          <figure><img src={casos[0].antes} alt="" /><figcaption>Convencional</figcaption></figure>
                          <figure><img src={casos[0].depois} alt="" /><figcaption>SwiftMR</figcaption></figure>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sds__placar">
                <span>Exames concluídos</span>
                <b ref={(el) => { contRef.current[i] = el; }}>0</b>
                <div className="sds__pontos" aria-hidden="true">
                  {Array.from({ length: sala.pontos }, (_, j) => j).map((j) => <i key={j} ref={(el) => { pontosRef.current[i][j] = el; }} data-feito="false" />)}
                </div>
              </div>

              <div ref={(el) => { totalRef.current[i] = el; }} className="sds__total" style={{ opacity: 0 }} aria-hidden="true">
                <b>{exames[i]}</b><span>exames concluídos</span>{i === 1 && <em>e o 4º já na máquina</em>}
              </div>
            </div>
          ))}
          <div ref={meioRef} className="sds__meio" style={{ opacity: 0 }} aria-hidden="true">
            <span>Mesmo intervalo de tempo</span>
            <div><i ref={meioBarraRef} /></div>
          </div>
        </div>

        <div ref={introRef} className="sds__intro">
          <div className="ir-vidro ir-vidro--g">{intro}</div>
        </div>
        <div ref={dicaRef} className="sds__dica" aria-hidden="true">
          Role para baixo e veja as duas salas
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>

        <div ref={resumoRef} className="sds__resumo" style={{ opacity: 0, visibility: "hidden" }}>
          <div className="ir-vidro">
            <h2 className="ir-h2">No mesmo intervalo, um exame a mais. E o próximo já começou.</h2>
            <p className="ir-nota-cena">Simulação ilustrativa com os tempos de aquisição do protocolo de coluna lombar medidos em Apucarana (PR): 21:05 sem SwiftMR e 12:12 com SwiftMR, considerando 1 minuto de troca de paciente nas duas salas. Os resultados podem variar de acordo com o nível de ocupação e a demanda do centro.</p>
          </div>
        </div>

        <div ref={resRef} className="sds__res" style={{ opacity: 0, visibility: "hidden" }} role="img" aria-label="Resultados reais: imagem da aquisição convencional ao lado da imagem acelerada e reconstruída pelo SwiftMR">
          <div className="sds__res-cab">
            <h2 className="ir-h2">Resultados reais. A mesma confiança no laudo.</h2>
            <p><strong ref={resNomeRef}>{casos[0].nome}</strong>, <span ref={resDetRef}>{casos[0].detalhe}</span></p>
          </div>
          <div className="sds__res-grade">
            {[0, 1].map((lado) => (
              <div key={lado} className="sds__res-lado" data-lado={lado === 0 ? "sem" : "com"}>
                <div className="sds__res-img">
                  {casos.slice(0, 2).map((c, j) => (
                    <div key={c.id} ref={(el) => { casoRef.current[lado * 2 + j] = el; }} className="sds__res-caso" data-caso={j} style={{ opacity: j === 0 ? 1 : 0 }}>
                      <img src={lado === 0 ? c.antes : c.depois} alt="" draggable={false} />
                    </div>
                  ))}
                </div>
                <div className="sds__res-tempo">
                  <span>{lado === 0 ? "Convencional" : <>Com Swift<b>MR</b></>}</span>
                  <div><i ref={(el) => { barraRef.current[lado] = el; }} /></div>
                  <b ref={(el) => { resTempoRef.current[lado] = el; }}>00:00</b>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={fimRef} className="sds__fim" style={{ opacity: 0, visibility: "hidden" }}>
          <div className="ir-vidro">{fecho}</div>
        </div>

        <div className="sds__trilho" aria-hidden="true"><i ref={trilhoRef} /></div>
      </div>
    </section>
  );
}

export default HeroDuasSalas;
