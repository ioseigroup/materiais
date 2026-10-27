import { Destino } from "@/components/site/comum/Destino";
import telaGeral from "@/assets/irad2/tela-geral.jpg";
import telaProdutividade from "@/assets/irad2/tela-produtividade.jpg";
import telaTroca from "@/assets/irad2/tela-troca.jpg";
import logoDasa from "@/assets/irad2/logos/dasa.png";
import logoDelboni from "@/assets/irad2/logos/delboni.png";
import logoExame from "@/assets/irad2/logos/exame.png";
import logoLavoisier from "@/assets/irad2/logos/lavoisier.png";
import logoCrd from "@/assets/irad2/logos/grupocrd.png";
import logoMeddi from "@/assets/irad2/logos/grupomeddi.png";
import {
  Seta,
  Surge,
  Logos,
  SimuladorDia,
  DuasSalas,
  Explorador,
  Vitrine,
  Citacao,
  Perguntas,
} from "./pecas";

/* Tudo o que vem depois do topo da página do I-RAD (igual nas duas versões). */

const logos = [
  { src: logoDasa, nome: "Dasa" },
  { src: logoDelboni, nome: "Delboni" },
  { src: logoExame, nome: "Exame" },
  { src: logoLavoisier, nome: "Lavoisier" },
  { src: logoCrd, nome: "Grupo CRD" },
  { src: logoMeddi, nome: "Grupo Meddi" },
];

const telas = [
  { nome: "Geral", src: telaGeral, texto: "Exames realizados contra a meta, tempo de troca, tempo de protocolo, ocupação e ociosidade da sala em uma única tela." },
  { nome: "Produtividade", src: telaProdutividade, texto: "Metas do dia, do mês e do ano, slot real, maiores atrasos e os protocolos que mais consomem a agenda." },
  { nome: "Troca", src: telaTroca, texto: "Tempo de troca contra a meta, primeiro exame do dia, sala parada e as maiores pausas entre exames." },
];

const faqs = [
  { p: "O I-RAD interfere no equipamento?", r: "Não. A solução utiliza informações operacionais geradas pelos equipamentos para organizar indicadores de performance." },
  { p: "O I-RAD interpreta imagens?", r: "Não. O I-RAD analisa exclusivamente dados operacionais e não interfere na interpretação médica." },
  { p: "É possível comparar diferentes unidades?", r: "Sim. Uma das principais aplicações é comparar equipamentos, unidades, protocolos, turnos e períodos." },
  { p: "O I-RAD pode acompanhar a utilização do SwiftMR?", r: "Sim. A plataforma é nativamente integrada ao SwiftMR e acompanha a utilização dos protocolos acelerados sala a sala." },
];

export function CorpoIrad() {
  return (
    <>
      <div className="ir-faixa">
        <Logos texto="Operações que testaram e aprovaram o I-RAD." itens={logos} />
      </div>

      {/* SEGUNDOS RECUPERADOS: simulador */}
      <section className="ir-bloco">
        <div className="ir-faixa ir-sim">
          <Surge className="ir-sim__texto">
            <h2 className="ir-h2">Segundos recuperados em cada troca viram exames a mais no fim do mês.</h2>
            <p className="ir-texto">
              Reduzir poucos segundos no tempo de troca entre pacientes, no início do primeiro exame ou na latência entre séries se multiplica por todos os exames do dia. Ao longo do mês, isso é capacidade adicional sem novos equipamentos, novas contratações ou novas obras.
            </p>
            <p className="ir-texto">Mova os controles e veja o que acontece com a agenda de uma sala.</p>
          </Surge>
          <Surge><SimuladorDia /></Surge>
        </div>
      </section>

      {/* PERFORMANCE NÃO É PRODUTIVIDADE */}
      <DuasSalas
        cabecalho={
          <div className="ir-salas__cab">
            <h2 className="ir-h2">Performance não é produtividade. Confundir as duas custa caro.</h2>
            <div className="ir-texto">
              <p>Uma sala pode estar cheia e ainda assim operar lentamente. Também pode ser eficiente, mas permanecer ociosa durante parte do dia.</p>
              <p>Sem dados operacionais confiáveis, decisões sobre agenda, equipe, protocolos e equipamentos são tomadas a partir de percepções incompletas.</p>
            </div>
          </div>
        }
        fecho={<p className="ir-salas__fecho">O I-RAD mostra como o tempo é utilizado em cada etapa do exame.</p>}
      />

      {/* CICLO COMPLETO: explorador de indicadores */}
      <section className="ir-bloco">
        <div className="ir-faixa">
          <Surge>
            <h2 className="ir-h2" style={{ maxWidth: "18em" }}>Entenda o ciclo completo da operação.</h2>
          </Surge>
          <Explorador />
        </div>
      </section>

      {/* VISÃO DA PLATAFORMA: telas da V2 */}
      <section className="ir-bloco">
        <div className="ir-faixa">
          <Surge className="ir-vit__cab">
            <h2 className="ir-h2">Da visão executiva ao detalhe de cada exame.</h2>
            <p className="ir-texto">Indicadores de tempo, fluxo e utilização em um painel operacional projetado para decisões rápidas, com unidades, turnos, protocolos e equipamentos em um só lugar.</p>
          </Surge>
          <Vitrine telas={telas} />
          <Surge className="ir-novidades">
            <div><h3>IA que explica cada métrica</h3><p>Pergunte o que mudou na operação e receba a resposta em linguagem direta, sem precisar interpretar gráfico por gráfico.</p></div>
            <div><h3>Resumos do dia e da semana</h3><p>O que aconteceu em cada sala, reunido em um resumo para o gestor.</p></div>
            <div><h3>Relatórios comparativos</h3><p>Compare períodos, salas e unidades em relatórios prontos para apresentar.</p></div>
          </Surge>
        </div>
      </section>

      {/* CITAÇÃO */}
      <Citacao
        texto="Previsibilidade é o que sustenta rentabilidade. O I-RAD existe para que cada sala de RM entregue o que a estrutura já é capaz de entregar."
        fichas={[
          { cor: "#e0484f", rotulo: "Sala parada", valor: "2 h 58 min" },
          { cor: "#f0a237", rotulo: "Tempo de troca", valor: "7 min" },
          { cor: "#7d879d", rotulo: "Ociosidade", valor: "1 h 48 min" },
          { cor: "#26b9da", rotulo: "Slot real", valor: "17 min 56 s" },
        ]}
      />

      {/* CONEXÕES */}
      <section className="ir-bloco">
        <div className="ir-faixa ir-conexoes">
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Se o protocolo é o gargalo, acelere a aquisição com IA.</h2>
            <p className="ir-texto">O I-RAD ajuda a identificar quanto do ciclo está concentrado na execução do protocolo. Quando o tempo de aquisição limita a capacidade da sala, o SwiftMR pode reduzir as sequências e aumentar o aproveitamento do equipamento.</p>
            <Destino to="/swiftmr" className="ir-link">Conhecer o SwiftMR<Seta /></Destino>
          </Surge>
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Leve a eficiência até a entrega do exame.</h2>
            <p className="ir-texto">Depois de otimizar a sala e o fluxo de aquisição, elimine também o desperdício gerado pela impressão antecipada de exames que podem nunca ser retirados.</p>
            <Destino to="/iprint" className="ir-link">Conhecer o I-PRINT<Seta /></Destino>
          </Surge>
        </div>
      </section>

      {/* PERGUNTAS */}
      <section id="faq" className="ir-bloco" style={{ paddingTop: 0 }}>
        <div className="ir-faixa ir-faq">
          <h2 className="ir-h2">Perguntas frequentes</h2>
          <Perguntas itens={faqs} />
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="ir-final">
        <div className="ir-faixa">
          <h2 className="ir-h1">Descubra onde sua operação perde tempo antes de investir em mais estrutura.</h2>
          <p className="ir-lead">Teste o I-RAD por 30 dias, com os dados da sua própria operação.</p>
          <Destino to="/contato" className="ir-botao ir-botao--claro">Solicitar demonstração<Seta /></Destino>
        </div>
      </section>
    </>
  );
}

export default CorpoIrad;
