import { useRef, type ReactNode } from "react";
import { whatsapp } from "@/site/contato";
import sala from "@/assets/clari/sala-tc.jpg";
import logoClari from "@/assets/claripi-branco.png";
import aceArcoA from "@/assets/clari/ace_arco_antes.jpg";
import aceArcoD from "@/assets/clari/ace_arco_depois.jpg";
import aceTroncoA from "@/assets/clari/ace_tronco_antes.jpg";
import aceTroncoD from "@/assets/clari/ace_tronco_depois.jpg";
import ctPulmaoA from "@/assets/clari/ct_pulmao_antes.jpg";
import ctPulmaoD from "@/assets/clari/ct_pulmao_depois.jpg";
import ctAbdA from "@/assets/clari/ct_abd_antes.jpg";
import ctAbdD from "@/assets/clari/ct_abd_depois.jpg";
import petSem from "@/assets/clari/pet_sem.jpg";
import petCom from "@/assets/clari/pet_com.jpg";
import { Seta } from "@/components/site/irad2/pecas";
import { useRolagem, seg, suave, mix, janela, irPara, clamp } from "@/components/site/comum/rolagem";

/**
 * ClariPI: cena presa à rolagem, em cinza escuro.
 * A câmera entra no gantry do tomógrafo e a abertura vira o visor das imagens,
 * com o antes e depois de cada produto (ClariACE, ClariCT.AI e ClariPET-CT).
 * Números: brochure ClariPI 2026 e relatórios de aplicação assinados (só a cidade).
 */

type Par = { antes: string; depois: string; exame: string };
type Capitulo = { id: string; marca: ReactNode; de: number; ate: number; pares: Par[] };

export const CAPITULOS: Capitulo[] = [
  { id: "clariace", marca: <>Clari<b>ACE</b></>, de: 0.22, ate: 0.47, pares: [
    { antes: aceArcoA, depois: aceArcoD, exame: "Arco aórtico" },
    { antes: aceTroncoA, depois: aceTroncoD, exame: "Tronco pulmonar" },
  ] },
  { id: "clarict-ai", marca: <>Clari<b>CT.AI</b></>, de: 0.49, ate: 0.72, pares: [
    { antes: ctPulmaoA, depois: ctPulmaoD, exame: "Tórax em baixa dose" },
    { antes: ctAbdA, depois: ctAbdD, exame: "Abdome" },
  ] },
  { id: "claripet-ct", marca: <>Clari<b>PET-CT</b></>, de: 0.74, ate: 0.93, pares: [
    { antes: petSem, depois: petCom, exame: "PET de corpo inteiro" },
  ] },
];

/* foto da sala: centro e raio do anel do gantry, em frações da largura/altura */
const FOTO = { w: 1800, h: 1028, cx: 0.558, cy: 0.555, raio: 0.236, furo: 0.087 };
const R = { intro: [0, 0.11] as const, zoom: [0.07, 0.24] as const, visor: [0.18, 0.25] as const, fecho: 0.95 };

export function HeroClari({ alvoInicial }: { alvoInicial?: string }) {
  const secRef = useRef<HTMLElement | null>(null);
  const fotoRef = useRef<HTMLDivElement | null>(null);
  const anelRef = useRef<SVGSVGElement | null>(null);
  const visorRef = useRef<HTMLDivElement | null>(null);
  const telaRef = useRef<HTMLDivElement | null>(null);
  const parRef = useRef<Array<HTMLDivElement | null>>([]);
  const textoRef = useRef<Array<HTMLDivElement | null>>([]);
  const navRef = useRef<Array<HTMLButtonElement | null>>([]);
  const rotRef = useRef<{ sem: HTMLElement | null; com: HTMLElement | null; exame: HTMLElement | null }>({ sem: null, com: null, exame: null });
  const chipRef = useRef<Array<HTMLDivElement | null>>([]);
  const medidorRef = useRef<{ caixa: HTMLDivElement | null; barra: HTMLElement | null; valor: HTMLElement | null }>({ caixa: null, barra: null, valor: null });
  const relogioRef = useRef<{ caixa: HTMLDivElement | null; barra: HTMLElement | null; valor: HTMLElement | null }>({ caixa: null, barra: null, valor: null });
  const trilhoRef = useRef<HTMLElement | null>(null);
  const dicaRef = useRef<HTMLDivElement | null>(null);
  const maoRef = useRef<number | null>(null);
  const geo = useRef({ ox: 0, oy: 0, s: 1, cx: 0, cy: 0, r: 0 });
  const iniciou = useRef(false);

  const pares = CAPITULOS.flatMap((c, ci) => c.pares.map((p, pi) => ({ ...p, ci, pi, n: c.pares.length })));

  // texto de cada etapa: [de, ate]
  const ETAPAS: Array<[number, number]> = [[0, R.intro[1]], [0.12, 0.2], ...CAPITULOS.map((c) => [c.de, c.ate] as [number, number]), [R.fecho, 1]];

  const medir = () => {
    const palco = fotoRef.current?.parentElement as HTMLElement | null | undefined;
    if (!palco) return;
    const cw = palco.clientWidth, ch = palco.clientHeight;
    const estreito = cw < 860;
    // no celular a foto fica com o gantry no meio; no computador, um pouco à direita
    const s = Math.max(cw / FOTO.w, ch / FOTO.h);
    const px = estreito ? 0.5 : 0.62;
    const ox = (cw - FOTO.w * s) * px, oy = (ch - FOTO.h * s) * 0.5;
    const cx = ox + FOTO.cx * FOTO.w * s, cy = oy + FOTO.cy * FOTO.h * s;
    geo.current = { ox, oy, s, cx, cy, r: FOTO.raio * FOTO.w * s };
    const foto = fotoRef.current!;
    const img = foto.firstElementChild as HTMLImageElement;
    img.style.width = `${FOTO.w * s}px`; img.style.height = `${FOTO.h * s}px`;
    img.style.left = `${ox}px`; img.style.top = `${oy}px`;
    foto.style.transformOrigin = `${cx}px ${cy}px`;
    const anel = anelRef.current;
    if (anel) {
      anel.setAttribute("viewBox", `0 0 ${cw} ${ch}`);
      anel.querySelectorAll("circle").forEach((c, i) => {
        c.setAttribute("cx", cx.toFixed(1)); c.setAttribute("cy", cy.toFixed(1));
        c.setAttribute("r", (i < 2 ? geo.current.r : FOTO.furo * FOTO.w * s).toFixed(1));
      });
    }
    if (!iniciou.current && alvoInicial) {
      iniciou.current = true;
      const c = CAPITULOS.find((x) => x.id === alvoInicial);
      if (c) setTimeout(() => irPara(secRef.current, c.de + 0.012), 60);
    }
  };

  const pintar = (p: number) => {
    // textos
    ETAPAS.forEach(([a, b], i) => {
      const el = textoRef.current[i]; if (!el) return;
      const o = i === 0 ? 1 - suave(seg(p, b - 0.03, b)) : i === ETAPAS.length - 1 ? suave(seg(p, a, a + 0.02)) : janela(p, a, b, 0.02);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * 22).toFixed(1)}px, 0)`;
      el.style.visibility = o < 0.01 ? "hidden" : "visible";
      if (o > 0.5) el.removeAttribute("inert"); else el.setAttribute("inert", "");
    });

    // aproximação no gantry
    const z = suave(seg(p, R.zoom[0], R.zoom[1]));
    const foto = fotoRef.current;
    if (foto) {
      foto.style.transform = `scale(${mix(1, 3.4, z).toFixed(3)})`;
      foto.style.filter = `brightness(${mix(1, 0.42, suave(seg(p, R.visor[0], R.visor[1]))).toFixed(3)})`;
    }
    const anel = anelRef.current;
    if (anel) anel.style.setProperty("--brilho", (0.55 + 0.45 * Math.sin(Math.min(1, z * 1.2) * Math.PI)).toFixed(3));

    // visor
    const ov = suave(seg(p, R.visor[0], R.visor[1])) * (1 - suave(seg(p, R.fecho - 0.02, R.fecho + 0.01)) * 0.75);
    const visor = visorRef.current;
    if (visor) {
      visor.style.opacity = ov.toFixed(3);
      visor.style.transform = `translate3d(0, 0, 0) scale(${mix(0.86, 1, ov).toFixed(3)})`;
      visor.style.visibility = ov < 0.01 ? "hidden" : "visible";
    }

    // qual capítulo e qual par de imagens
    let ci = 0;
    CAPITULOS.forEach((c, i) => { if (p >= c.de - 0.01) ci = i; });
    const cap = CAPITULOS[ci];
    const dentro = seg(p, cap.de, cap.ate);
    const pi = Math.min(cap.pares.length - 1, Math.floor(dentro * cap.pares.length));
    const ini = cap.de + ((cap.ate - cap.de) * pi) / cap.pares.length, fim = cap.de + ((cap.ate - cap.de) * (pi + 1)) / cap.pares.length;
    const k = seg(p, ini, fim);
    pares.forEach((par, j) => {
      const el = parRef.current[j]; if (!el) return;
      const ativo = par.ci === ci && par.pi === pi;
      el.style.opacity = ativo ? "1" : "0";
    });
    // divisor: varre de um lado ao outro e volta ao meio
    let corte = k < 0.12 ? 96 : k < 0.62 ? mix(96, 4, suave(seg(k, 0.12, 0.62))) : mix(4, 50, suave(seg(k, 0.62, 0.8)));
    if (maoRef.current !== null) corte = maoRef.current;
    telaRef.current?.style.setProperty("--corte", `${corte.toFixed(2)}%`);
    const r = rotRef.current;
    const nomes = ["ClariACE", "ClariCT.AI", "ClariPET-CT"];
    if (r.sem && r.sem.dataset.c !== String(ci)) { r.sem.dataset.c = String(ci); r.sem.textContent = `Sem ${nomes[ci]}`; }
    if (r.com && r.com.dataset.c !== String(ci)) { r.com.dataset.c = String(ci); r.com.textContent = `Com ${nomes[ci]}`; }
    const ex = cap.pares[pi].exame;
    if (r.exame && r.exame.textContent !== ex) r.exame.textContent = ex;

    // navegação entre produtos
    navRef.current.forEach((b, i) => {
      if (!b) return;
      const c = CAPITULOS[i];
      b.dataset.ativo = String(i === ci && p >= R.visor[0]);
      b.style.setProperty("--prog", seg(p, c.de, c.ate).toFixed(3));
    });
    const navO = suave(seg(p, R.visor[0], R.visor[1])) * (1 - suave(seg(p, R.fecho - 0.02, R.fecho)));
    const nav = navRef.current[0]?.parentElement;
    if (nav) { nav.style.opacity = navO.toFixed(3); nav.style.visibility = navO < 0.01 ? "hidden" : "visible"; }

    // selos sobre o visor: [de, ate] em p
    const CHIPS: Array<[number, number]> = [[0.25, 0.47], [0.3, 0.47], [0.52, 0.72], [0.57, 0.72], [0.77, 0.93]];
    chipRef.current.forEach((el, i) => {
      if (!el) return;
      const [a, b] = CHIPS[i];
      const o = janela(p, a, b, 0.018);
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - o) * 14).toFixed(1)}px, 0)`;
    });

    // medidor de contraste (ClariACE): volume do período em Brasília (DF), 1.681 mL para 913 mL
    const m = medidorRef.current;
    if (m.caixa) {
      const o = janela(p, 0.27, 0.47, 0.02);
      m.caixa.style.opacity = o.toFixed(3);
      const q = suave(seg(p, 0.29, 0.42));
      const ml = Math.round(mix(1681, 913, q));
      if (m.barra) m.barra.style.transform = `scaleY(${(ml / 1681).toFixed(3)})`;
      if (m.valor) m.valor.textContent = `${ml.toLocaleString("pt-BR")} mL`;
    }
    // tempo do PET: 30 min para 15 min
    const t = relogioRef.current;
    if (t.caixa) {
      const o = janela(p, 0.78, 0.93, 0.02);
      t.caixa.style.opacity = o.toFixed(3);
      const q = suave(seg(p, 0.8, 0.88));
      if (t.barra) t.barra.style.transform = `scaleX(${mix(1, 0.5, q).toFixed(3)})`;
      if (t.valor) t.valor.textContent = `${Math.round(mix(30, 15, q))} min`;
    }
    if (trilhoRef.current) trilhoRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    if (dicaRef.current) dicaRef.current.style.opacity = (1 - suave(p / 0.03)).toFixed(2);
  };

  useRolagem(secRef, pintar, medir);

  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    maoRef.current = clamp(((e.clientX - r.left) / r.width) * 100, 2, 98);
    telaRef.current?.style.setProperty("--corte", `${maoRef.current.toFixed(2)}%`);
  };
  const soltar = () => { maoRef.current = null; window.dispatchEvent(new Event("scroll")); };

  const textos: ReactNode[] = [
    <div className="ir-vidro ir-vidro--g clc__vidro" key="intro">
      <img className="clc__logo" src={logoClari} alt="ClariPI by IOSEI Group" />
      <h1 className="ir-h1">Tomografia com <span className="ir-acento">menos contraste, menos dose</span> e mais clareza.</h1>
      <p className="ir-lead">Inteligência artificial que atua nos principais custos e limitações da TC e do PET-CT, sem trocar equipamentos e sem mudar o fluxo da equipe.</p>
    </div>,
    <div className="ir-vidro clc__vidro" key="ponte">
      <h2 className="ir-h2">Mais performance com o que você já tem.</h2>
      <p className="ir-texto">Compatível com qualquer parque instalado, integrado via DICOM e sem alterar o fluxo clínico.</p>
    </div>,
    <div className="ir-vidro clc__vidro" key="ace">
      <span className="clc__marca">Clari<b>ACE</b></span>
      <h2 className="ir-h2">Até 50% menos contraste. A mesma confiança no diagnóstico.</h2>
      <p className="ir-texto">A primeira solução de realce de contraste por IA do mundo. Mais segurança para pacientes renais, idosos e casos críticos, com redução recorrente no custo por exame.</p>
    </div>,
    <div className="ir-vidro clc__vidro" key="ct">
      <span className="clc__marca">Clari<b>CT.AI</b></span>
      <h2 className="ir-h2">Menos dose. Mais nitidez. Até 5x mais vida útil do tubo.</h2>
      <p className="ir-texto">IA treinada para separar ruído de anatomia real: remove o ruído sem “alisar” a imagem e preserva detalhes finos, inclusive em protocolos de ultra-low dose, ideais para pediatria e oncologia.</p>
    </div>,
    <div className="ir-vidro clc__vidro" key="pet">
      <span className="clc__marca">Clari<b>PET-CT</b></span>
      <h2 className="ir-h2">Menos radioisótopo. Mais pacientes. Mesmo diagnóstico.</h2>
      <p className="ir-texto">Reduz o tempo de aquisição entre 30% e 50% sem perder a clareza das imagens. Mais conforto para o paciente oncológico e mais horários na agenda.</p>
    </div>,
    <div className="ir-vidro clc__vidro" key="fecho">
      <h2 className="ir-h2">Veja o impacto na sua operação.</h2>
      <p className="ir-texto">Avalie as três soluções com os seus equipamentos, os seus protocolos e os seus pacientes.</p>
      <a href={whatsapp("Olá! Acessei o site da IOSEI Group e gostaria de falar com um especialista sobre o ClariPI.")} target="_blank" rel="noreferrer" className="ir-botao">Falar com um especialista<Seta /></a>
    </div>,
  ];

  return (
    <section ref={secRef} className="clc" style={{ height: "820vh" }} aria-label="ClariPI: tomografia e PET-CT com inteligência artificial, com imagens reais de antes e depois">
      <div className="clc__palco">
        <div ref={fotoRef} className="clc__foto" aria-hidden="true">
          <img src={sala} alt="" draggable={false} />
          <svg ref={anelRef} className="clc__anel">
            <circle className="clc__anel-luz" /><circle className="clc__anel-fio" /><circle className="clc__furo" />
          </svg>
        </div>
        <i className="clc__veu" aria-hidden="true" />

        <div ref={visorRef} className="clc__visor" style={{ opacity: 0, visibility: "hidden" }}>
          <div ref={telaRef} className="clc__tela" onPointerMove={mover} onPointerLeave={soltar} role="img" aria-label="Imagem sem e com a solução ClariPI, lado a lado">
            {pares.map((par, j) => (
              <div key={j} ref={(el) => { parRef.current[j] = el; }} className="clc__par" style={{ opacity: j === 0 ? 1 : 0 }}>
                <img src={par.depois} alt="" draggable={false} />
                <img src={par.antes} alt="" draggable={false} className="clc__antes" />
              </div>
            ))}
            <i className="clc__fio" aria-hidden="true" />
            <span className="clc__rot" data-lado="esq" ref={(el) => { rotRef.current.sem = el; }}>Sem ClariACE</span>
            <span className="clc__rot" data-lado="dir" ref={(el) => { rotRef.current.com = el; }}>Com ClariACE</span>
            <span className="clc__exame" ref={(el) => { rotRef.current.exame = el; }}>Arco aórtico</span>
          </div>

          <div className="clc__chip" data-pos="a" ref={(el) => { chipRef.current[0] = el; }} style={{ opacity: 0 }}><b>até 50%</b><span>menos contraste iodado</span></div>
          <div className="clc__chip" data-pos="b" ref={(el) => { chipRef.current[1] = el; }} style={{ opacity: 0 }}><b>+80% CNR</b><span>relação contraste-ruído</span></div>
          <div className="clc__chip" data-pos="a" ref={(el) => { chipRef.current[2] = el; }} style={{ opacity: 0 }}><b>Ultra-low dose</b><span>ruído removido, bordas preservadas</span></div>
          <div className="clc__chip" data-pos="b" ref={(el) => { chipRef.current[3] = el; }} style={{ opacity: 0 }}><b>até 5x</b><span>mais vida útil do tubo da TC</span></div>
          <div className="clc__chip" data-pos="a" ref={(el) => { chipRef.current[4] = el; }} style={{ opacity: 0 }}><b>30% a 50%</b><span>menos tempo de aquisição</span></div>

          <div className="clc__medidor" ref={(el) => { medidorRef.current.caixa = el; }} style={{ opacity: 0 }} aria-hidden="true">
            <span>Contraste no período</span>
            <div className="clc__seringa"><i ref={(el) => { medidorRef.current.barra = el; }} /></div>
            <b ref={(el) => { medidorRef.current.valor = el; }}>1.681 mL</b>
            <em>Brasília (DF), 45,69% menos</em>
          </div>
          <div className="clc__relogio" ref={(el) => { relogioRef.current.caixa = el; }} style={{ opacity: 0 }} aria-hidden="true">
            <span>Tempo de exame</span>
            <div><i ref={(el) => { relogioRef.current.barra = el; }} /></div>
            <b ref={(el) => { relogioRef.current.valor = el; }}>30 min</b>
          </div>
        </div>

        <nav className="clc__produtos" style={{ opacity: 0, visibility: "hidden" }} aria-label="Produtos ClariPI">
          {CAPITULOS.map((c, i) => (
            <button key={c.id} type="button" ref={(el) => { navRef.current[i] = el; }} onClick={() => irPara(secRef.current, c.de + 0.012)}>
              <span>{c.marca}</span><i />
            </button>
          ))}
        </nav>

        <div className="clc__textos">
          {textos.map((t, i) => (
            <div key={i} ref={(el) => { textoRef.current[i] = el; }} className="clc__etapa" style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}>{t}</div>
          ))}
        </div>

        <div ref={dicaRef} className="clc__dica" aria-hidden="true">
          Role para baixo e entre no tomógrafo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>
        <div className="clc__trilho" aria-hidden="true"><i ref={trilhoRef} /></div>
      </div>
    </section>
  );
}

export default HeroClari;
