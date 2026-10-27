import { Link } from "@tanstack/react-router";
import caseBrainMraBefore from "@/assets/case-brainmra-before.jpg";
import caseBrainMraAfter from "@/assets/case-brainmra-after.jpg";
import caseBrainT1Before from "@/assets/case-braint1-before.jpg";
import caseBrainT1After from "@/assets/case-braint1-after.jpg";
import { Seta, Surge, Perguntas } from "../irad2/pecas";
import { Comparador, Numeros, Caminhos, Passos, Vozes, Fluxo, type Caso } from "./pecasSwift";
import "./swift2.css";

/* Tudo o que vem depois do topo da página do SwiftMR (igual nas duas versões). */

export const CASOS: Caso[] = [
  { id: "brain-mra", nome: "Angiorressonância de crânio", detalhe: "3D TOF, 1.5T", antes: caseBrainMraBefore, depois: caseBrainMraAfter, tempoAntes: "04:42", tempoDepois: "02:28" },
  { id: "brain-t1", nome: "Crânio T1", detalhe: "3D BRAVO, 3.0T", antes: caseBrainT1Before, depois: caseBrainT1After, tempoAntes: "04:11", tempoDepois: "01:55" },
];

const numeros = [
  { valor: 2300000, sufixo: "+", rotulo: "exames processados" },
  { valor: 1500000, sufixo: "+", rotulo: "imagens analisadas" },
  { valor: 330, sufixo: "+", rotulo: "clientes no mundo" },
  { valor: 50, prefixo: "até ", sufixo: "%", rotulo: "menos tempo de aquisição" },
];

const etapas = [
  { t: "O equipamento adquire mais rápido", d: "Protocolos acelerados reduzem o tempo de cada sequência. Sozinha, a aquisição acelerada gera mais ruído." },
  { t: "O SwiftMR reconstrói a imagem", d: "A reconstrução por deep learning remove o ruído e recupera a nitidez, sem alterar a anatomia." },
  { t: "As imagens chegam ao PACS", d: "Em formato DICOM, tipicamente em menos de 2 minutos, prontas para o laudo e sem mudar a rotina da equipe." },
];

const caminhos = [
  { titulo: "Comprar um novo scanner", valor: "US$ 1,5 mi+", itens: ["Alto investimento de capital", "Ciclo longo de aquisição", "Retorno em 3 anos ou mais"], fecho: "Excessivo para resolver capacidade." },
  { titulo: "Upgrade do fabricante", valor: "US$ 550 mil+", itens: ["Exige parada do equipamento", "Ganho de capacidade limitado", "Retorno em 2 anos ou mais"], fecho: "Ganho incremental a custo alto." },
  { titulo: "Aceleração por IA", valor: "SwiftMR", itens: ["Nenhum hardware novo", "Aumento imediato de capacidade", "Uma fração do custo"], fecho: "Retorno em semanas.", destaque: true },
];

const pontos = [
  { k: "0.25T a 3.0T", v: "Todos os fabricantes e modelos, inclusive equipamentos abertos e verticais." },
  { k: "2 dias", v: "Instalação, configuração de protocolos, treinamento e acompanhamento em uso real." },
  { k: "Dados protegidos", v: "As informações do paciente não saem da rede. Na nuvem, as imagens são anonimizadas e apagadas em 24 horas." },
];

const implantacao = [
  { t: "Levantamento", d: "Checagem de rede, IP fixo e integração com o PACS." },
  { t: "Instalação", d: "Instalação do SwiftMR no gateway." },
  { t: "Protocolos", d: "Escolha dos protocolos e ajuste dos parâmetros de velocidade." },
  { t: "Ajuste fino", d: "Retorno dos radiologistas e calibração de nitidez e ruído." },
  { t: "Acompanhamento", d: "Monitoramento contínuo de uso, qualidade e satisfação." },
];

const vozes = [
  { fala: "Desde que implementamos o SwiftMR, reduzimos significativamente o tempo dos exames de RM. Conseguimos atender mais pacientes sem comprometer a qualidade da imagem.", quem: "Médico radiologista, proprietário de clínica de diagnóstico por imagem" },
  { fala: "O SwiftMR foi um parceiro importante para aumentar nossa capacidade de ressonância magnética. Pacientes com claustrofobia conseguiram fazer os exames mais rapidamente e os radiologistas ficaram satisfeitos com a qualidade.", quem: "Diretor médico de rede de clínicas" },
];

const faqs = [
  { p: "O SwiftMR funciona em equipamentos antigos?", r: "Sim. É compatível com todos os fabricantes e modelos de RM, independentemente da idade ou do tipo de magneto, em campos de 0.25T a 3.0T, incluindo equipamentos abertos e verticais." },
  { p: "Quanto tempo de exame é realmente reduzido?", r: "A redução varia conforme região e técnica. Estudos revisados por pares em crânio, joelho e coluna lombar relatam reduções de até 50% no tempo de exame, preservando a interpretação pelo radiologista." },
  { p: "É necessário trocar o equipamento?", r: "Não. O SwiftMR utiliza a estrutura existente e é integrado ao fluxo de aquisição e envio ao PACS, com as imagens chegando tipicamente em menos de 2 minutos." },
  { p: "Como é a instalação?", r: "A implantação é feita em dois dias: no primeiro, instalação e configuração de protocolos; no segundo, treinamento dos usuários e acompanhamento em uso real." },
  { p: "Como ficam os dados dos pacientes?", r: "As informações de paciente não saem da rede da instituição. Na modalidade em nuvem, os dados identificáveis são separados e anonimizados; apenas as imagens são transmitidas e são apagadas em até 24 horas após o processamento." },
  { p: "É possível testar antes da contratação?", r: "Sim. A instituição pode solicitar um período de teste de 30 dias com os próprios equipamentos, protocolos e pacientes." },
];

export function CorpoSwift({ semComparador = false }: { semComparador?: boolean } = {}) {
  return (
    <>
      {/* NÚMEROS */}
      <section className="ir-bloco sw-bloco-num">
        <div className="ir-faixa">
          <Numeros itens={numeros} fonte="Dados globais da AIRS Medical, desenvolvedora do SwiftMR." />
        </div>
      </section>

      {/* CASOS: comparador */}
      {!semComparador && <section id="cases" className="ir-bloco" style={{ paddingTop: 0 }}>
        <div className="ir-faixa">
          <Surge className="sw-cab">
            <h2 className="ir-h2">Menos tempo de exame. A mesma confiança no laudo.</h2>
            <p className="ir-texto">Escolha um caso e arraste o divisor para comparar a aquisição convencional com a imagem reconstruída pelo SwiftMR.</p>
          </Surge>
          <Surge><Comparador casos={CASOS} /></Surge>
        </div>
      </section>}

      {/* FLUXO */}
      <section className="ir-bloco sw-gelo">
        <div className="ir-faixa">
          <Surge className="sw-cab">
            <h2 className="ir-h2">Do exame ao laudo, sem mudar a rotina.</h2>
            <p className="ir-texto">O SwiftMR se conecta ao equipamento e ao PACS. A equipe continua trabalhando do mesmo jeito.</p>
          </Surge>
          <Surge><Fluxo etapas={etapas} /></Surge>
        </div>
      </section>

      {/* CAMINHOS */}
      <section className="ir-bloco">
        <div className="ir-faixa">
          <Surge className="sw-cab">
            <h2 className="ir-h2">Três formas de aumentar a capacidade de RM. Apenas uma se paga em semanas.</h2>
          </Surge>
          <Surge><Caminhos colunas={caminhos} /></Surge>
        </div>
      </section>

      {/* COMPATIBILIDADE E IMPLANTAÇÃO */}
      <section className="ir-bloco sw-gelo">
        <div className="ir-faixa">
          <Surge className="sw-cab">
            <h2 className="ir-h2">Compatível com o que você já tem. Em operação em dias.</h2>
          </Surge>
          <Surge className="sw-pontos">
            {pontos.map((p) => (
              <div key={p.k}><span className="ir-num">{p.k}</span><p>{p.v}</p></div>
            ))}
          </Surge>
          <Passos itens={implantacao} />
        </div>
      </section>

      {/* TESTE */}
      <section className="ir-bloco sw-teste">
        <div className="ir-faixa sw-teste__grade">
          <Surge>
            <h2 className="ir-h2">Teste o SwiftMR por 30 dias.</h2>
            <p className="ir-lead">Avalie a qualidade das imagens, a redução dos tempos e o impacto na operação com os equipamentos, os protocolos e os pacientes da sua própria instituição.</p>
          </Surge>
          <Surge>
            <Link to={"/contato" as any} className="ir-botao">Solicitar período de teste<Seta /></Link>
          </Surge>
        </div>
      </section>

      {/* VOZES */}
      <section className="ir-bloco" style={{ paddingTop: 0 }}>
        <div className="ir-faixa">
          <Surge><Vozes itens={vozes} /></Surge>
        </div>
      </section>

      {/* CONEXÕES */}
      <section className="ir-bloco sw-gelo">
        <div className="ir-faixa ir-conexoes">
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Você acelerou a aquisição. Agora descubra o que ainda limita o ciclo.</h2>
            <p className="ir-texto">Troca de pacientes, preparação, protocolos, atrasos e ociosidade também pesam no resultado. O I-RAD mostra onde a sua operação ainda perde tempo.</p>
            <Link to={"/irad" as any} className="ir-link">Conhecer o I-RAD<Seta /></Link>
          </Surge>
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Quanto sua ressonância poderia produzir com exames mais rápidos?</h2>
            <p className="ir-texto">Informe os dados da operação e estime a capacidade adicional e o impacto financeiro.</p>
            <a href="https://calculator.iosei.co/swiftmr.html" target="_blank" rel="noreferrer" className="ir-link">Calcular o retorno do SwiftMR<Seta /></a>
          </Surge>
        </div>
      </section>

      {/* PERGUNTAS */}
      <section id="faq" className="ir-bloco">
        <div className="ir-faixa ir-faq">
          <h2 className="ir-h2">Perguntas frequentes</h2>
          <Perguntas itens={faqs} />
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="ir-final">
        <div className="ir-faixa">
          <h2 className="ir-h1">Extraia mais capacidade da ressonância que você já possui.</h2>
          <p className="ir-lead">Mais exames no mesmo equipamento, sem trocar scanners e sem mudar o fluxo da equipe.</p>
          <Link to={"/contato" as any} className="ir-botao ir-botao--claro">Solicitar demonstração<Seta /></Link>
        </div>
      </section>
    </>
  );
}

export default CorpoSwift;
