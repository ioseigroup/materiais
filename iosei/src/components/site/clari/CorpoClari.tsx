import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Seta, Surge, Perguntas } from "@/components/site/irad2/pecas";
import aceTroncoA from "@/assets/clari/ace_tronco_antes.jpg";
import aceTroncoD from "@/assets/clari/ace_tronco_depois.jpg";
import ctAbdA from "@/assets/clari/ct_abd_antes.jpg";
import ctAbdD from "@/assets/clari/ct_abd_depois.jpg";
import petConv from "@/assets/clari/pet_conv30.jpg";
import petPos from "@/assets/clari/pet_pos15.jpg";
import "./clari.css";

/* Tudo o que vem depois da cena da página ClariPI. */

/* relatórios de aplicação ClariACE assinados, 2026: média de redução de volume de contraste */
const CIDADES = [
  { cidade: "Brasília (DF)", equip: "TC de 160 canais", rotina: 48, angio: null as number | null, rotinaTxt: "48%", angioTxt: "" },
  { cidade: "Santos (SP)", equip: "TC de 128 canais", rotina: 44.59, angio: 34.71, rotinaTxt: "44,59%", angioTxt: "34,71%" },
  { cidade: "Pelotas (RS)", equip: "TC de 16 canais", rotina: 35, angio: 33.33, rotinaTxt: "35%", angioTxt: "33,33%" },
];

const ABAS: Array<{ id: string; marca: ReactNode; reduz: string; titulo: string; texto: string; antes: string; depois: string; rotA: string; rotD: string }> = [
  { id: "contraste", marca: <>Clari<b>ACE</b></>, reduz: "Contraste", titulo: "Menos contraste iodado, mesmo realce.", texto: "Tronco pulmonar com e sem ClariACE. O realce é recuperado pela IA, com até 50% menos contraste e mais segurança para pacientes renais, idosos e casos críticos.", antes: aceTroncoA, depois: aceTroncoD, rotA: "Sem ClariACE", rotD: "Com ClariACE" },
  { id: "dose", marca: <>Clari<b>CT.AI</b></>, reduz: "Dose", titulo: "Menos dose, menos ruído.", texto: "Abdome com e sem ClariCT.AI. A IA remove o ruído sem alisar a imagem e preserva detalhes finos e bordas, mantendo a leitura diagnóstica.", antes: ctAbdA, depois: ctAbdD, rotA: "Sem ClariCT.AI", rotD: "Com ClariCT.AI" },
  { id: "tempo", marca: <>Clari<b>PET-CT</b></>, reduz: "Tempo", titulo: "Metade do tempo no PET-CT.", texto: "PET-CT convencional em 30 minutos e com ClariPET-CT em 15 minutos, mantendo a clareza das imagens e a confiabilidade da leitura.", antes: petConv, depois: petPos, rotA: "Convencional, 30 min", rotD: "ClariPET-CT, 15 min" },
];

const PONTOS = [
  { t: "Compatível com qualquer parque instalado", d: "Funciona com os tomógrafos e PET-CT que a instituição já possui, de qualquer fabricante." },
  { t: "Integração via DICOM", d: "Implementação simples, com integração ao PACS e fluxo de trabalho automatizado." },
  { t: "Sem alterar o fluxo clínico", d: "Os processos existentes continuam sem interrupção, e os resultados são mensuráveis desde o início." },
];

const CONFIANCA = [
  { t: "Remove ruído sem “alisar” a imagem", d: "Diferente dos métodos iterativos tradicionais, a IA distingue o que é sinal anatômico e o que é interferência." },
  { t: "Preserva detalhes finos e bordas", d: "Modelo treinado com milhões de imagens de tomografia com diferentes níveis de ruído." },
  { t: "Consistência para a leitura", d: "Imagens mais limpas, mais confiáveis e prontas para o diagnóstico, mesmo em baixa dose." },
];

const FAQ = [
  { p: "É preciso trocar o tomógrafo?", r: "Não. As soluções ClariPI são compatíveis com qualquer parque instalado, se integram via DICOM e não alteram o fluxo clínico." },
  { p: "Quanto contraste o ClariACE reduz?", r: "Até 50% do volume de contraste iodado, com aumento de até 80% na relação contraste-ruído (CNR). Nas aplicações de 2026, as médias em exames de rotina foram de 48% em Brasília (DF), 44,59% em Santos (SP) e 35% em Pelotas (RS)." },
  { p: "O ClariCT.AI permite protocolos de ultra-low dose?", r: "Sim. A IA remove o ruído e revela detalhes anatômicos antes imperceptíveis, o que torna o ultra-low dose viável, especialmente em pediatria e oncologia, com até 5x mais vida útil do tubo da TC." },
  { p: "O que muda no PET-CT com o ClariPET-CT?", r: "O tempo de aquisição pode ser reduzido entre 30% e 50%, com menos exposição e menor uso de radioisótopos, mantendo a clareza das imagens e a confiabilidade da leitura." },
  { p: "As imagens continuam confiáveis para o laudo?", r: "Sim. A IA preserva detalhes finos, bordas e a consistência visual da imagem, e os protocolos são ajustados na implantação com a equipe da instituição." },
];

function Comparador({ antes, depois, rotA, rotD }: { antes: string; depois: string; rotA: string; rotD: string }) {
  const [corte, setCorte] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);
  const arrastando = useRef(false);
  const mover = (x: number) => { const r = ref.current!.getBoundingClientRect(); setCorte(Math.max(2, Math.min(98, ((x - r.left) / r.width) * 100))); };
  return (
    <div
      ref={ref}
      className="cl-comp"
      style={{ ["--corte" as any]: `${corte}%` }}
      onPointerDown={(e) => { arrastando.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); mover(e.clientX); }}
      onPointerMove={(e) => { if (arrastando.current || e.pointerType === "mouse") mover(e.clientX); }}
      onPointerUp={() => { arrastando.current = false; }}
      onPointerCancel={() => { arrastando.current = false; }}
      role="slider" aria-label="Arraste para comparar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(corte)} tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") setCorte((c) => Math.max(2, c - 5)); if (e.key === "ArrowRight") setCorte((c) => Math.min(98, c + 5)); }}
    >
      <img src={depois} alt="" draggable={false} />
      <img src={antes} alt="" draggable={false} className="cl-comp__antes" />
      <i className="cl-comp__fio" />
      <span className="cl-comp__pega" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg></span>
      <span className="cl-comp__rot" data-lado="esq">{rotA}</span>
      <span className="cl-comp__rot" data-lado="dir">{rotD}</span>
    </div>
  );
}

export function CorpoClari() {
  const [aba, setAba] = useState(0);
  const a = ABAS[aba];
  return (
    <>
      {/* RESULTADOS REAIS */}
      <section className="ir-bloco cl-resultados">
        <div className="ir-faixa">
          <Surge className="cl-cab">
            <h2 className="ir-h2">Menos contraste em operações reais.</h2>
            <p className="ir-lead">Média de redução do volume de contraste com ClariACE nas aplicações de 2026, em exames de rotina e de angiotomografia.</p>
          </Surge>
          <Surge className="cl-cidades">
            {CIDADES.map((c) => (
              <div key={c.cidade} className="cl-cidade">
                <div className="cl-cidade__cab"><strong>{c.cidade}</strong><span>{c.equip}</span></div>
                <div className="cl-barra"><span>Rotina</span><div><i style={{ ["--v" as any]: c.rotina / 50 }} /></div><b>{c.rotinaTxt}</b></div>
                {c.angio !== null && <div className="cl-barra" data-angio="true"><span>Angio</span><div><i style={{ ["--v" as any]: c.angio / 50 }} /></div><b>{c.angioTxt}</b></div>}
              </div>
            ))}
          </Surge>
          <Surge className="cl-volumes">
            <div><span>Santos (SP), no período avaliado</span><b>1.215 mL <em>para</em> 733 mL</b></div>
            <div><span>Brasília (DF), no período avaliado</span><b>1.681 mL <em>para</em> 913 mL</b></div>
          </Surge>
          <p className="ir-nota cl-fonte">Relatórios de aplicação assinados, 2026. Os resultados variam conforme o equipamento, o protocolo e o perfil dos pacientes de cada instituição.</p>
        </div>
      </section>

      {/* ESCOLHA O QUE REDUZIR */}
      <section className="ir-bloco cl-escolha">
        <div className="ir-faixa">
          <Surge className="cl-cab">
            <h2 className="ir-h2">Escolha o que você quer reduzir.</h2>
            <p className="ir-lead">Arraste o divisor sobre a imagem para comparar.</p>
          </Surge>
          <div className="cl-escolha__grade">
            <div className="cl-abas" role="tablist">
              {ABAS.map((x, i) => (
                <button key={x.id} type="button" role="tab" aria-selected={i === aba} onClick={() => setAba(i)}>
                  <span className="cl-abas__reduz">{x.reduz}</span>
                  <span className="cl-marca">{x.marca}</span>
                </button>
              ))}
              <div className="cl-abas__texto" key={a.id}>
                <h3 className="ir-h3">{a.titulo}</h3>
                <p className="ir-texto">{a.texto}</p>
              </div>
            </div>
            <Comparador key={a.id} antes={a.antes} depois={a.depois} rotA={a.rotA} rotD={a.rotD} />
          </div>
        </div>
      </section>

      {/* NA OPERAÇÃO */}
      <section className="ir-bloco cl-gelo">
        <div className="ir-faixa">
          <Surge className="cl-cab">
            <h2 className="ir-h2">Ganho imediato de eficiência, sem novos equipamentos.</h2>
          </Surge>
          <Surge className="cl-pontos">
            {PONTOS.map((p, i) => (
              <div key={p.t}><span className="cl-pontos__n">{i + 1}</span><h3 className="ir-h3">{p.t}</h3><p>{p.d}</p></div>
            ))}
          </Surge>
        </div>
      </section>

      {/* CONFIANÇA NA IMAGEM */}
      <section className="ir-bloco">
        <div className="ir-faixa cl-conf">
          <Surge>
            <h2 className="ir-h2">IA treinada para separar ruído de anatomia real.</h2>
            <p className="ir-lead" style={{ marginTop: 16 }}>Resultado: imagens mais limpas, mais confiáveis e prontas para o diagnóstico.</p>
          </Surge>
          <Surge className="cl-conf__lista">
            {CONFIANCA.map((c) => (<div key={c.t}><h3 className="ir-h3">{c.t}</h3><p>{c.d}</p></div>))}
          </Surge>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="ir-bloco cl-gelo">
        <div className="ir-faixa cl-calc">
          <Surge>
            <h2 className="ir-h2">Quanto sua operação gasta com contraste hoje?</h2>
            <p className="ir-texto" style={{ marginTop: 14 }}>Informe o volume de exames contrastados e o custo do contraste e estime a economia com o ClariACE.</p>
          </Surge>
          <Surge>
            <a className="ir-botao" href="https://calculator.iosei.co/clariace.html" target="_blank" rel="noreferrer">Calcular a economia<Seta /></a>
          </Surge>
        </div>
      </section>

      {/* PERGUNTAS */}
      <section className="ir-bloco">
        <div className="ir-faixa ir-faq">
          <h2 className="ir-h2">Perguntas frequentes</h2>
          <Perguntas itens={FAQ} />
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="ir-final cl-final">
        <div className="ir-faixa">
          <h2 className="ir-h1">Menos contraste, menos dose e mais pacientes, com o tomógrafo que você já tem.</h2>
          <p className="ir-lead">Converse com nossos especialistas e descubra o impacto real das soluções ClariPI na sua operação.</p>
          <Link to={"/contato" as any} className="ir-botao">Falar com um especialista<Seta /></Link>
        </div>
      </section>
    </>
  );
}

export default CorpoClari;
