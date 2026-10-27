import { Link } from "@tanstack/react-router";
import { Seta, Surge, Perguntas } from "@/components/site/irad2/pecas";
import "./iprint.css";

/* Tudo o que vem depois da cena da página I-PRINT. Textos do material oficial do I-PRINT 2026. */

const PROBLEMAS = [
  { t: "Insumos descartados", d: "Filme, papel e insumos consumidos em exames que nunca são retirados." },
  { t: "Custo fixo invisível", d: "Quanto mais exames, maior o desperdício, e o custo fixo por exame sobe sem aparecer no relatório." },
  { t: "Desperdício recorrente", d: "Não é pontual, é estrutural: acontece todos os dias, em todas as salas." },
  { t: "Retrabalho da equipe", d: "A equipe técnica perde tempo com reimpressões e com a busca de exames impressos." },
];

const PASSOS = [
  { t: "Intercepta a impressão", d: "O envio automático para a impressora é interceptado, sem mudar o equipamento." },
  { t: "Cria a fila inteligente", d: "Cada exame fica organizado, identificado e pronto para ser impresso quando necessário." },
  { t: "Imprime sob acionamento", d: "Só o exame solicitado pelo paciente ou pelo médico sai da impressora." },
  { t: "Rastreia tudo", d: "Cada impressão fica registrada, com rastreabilidade completa do processo." },
];

const GANHOS = [
  "Redução imediata de custo por exame",
  "Eliminação de impressões desnecessárias",
  "Ganho operacional da equipe",
  "Processo rastreável e controlado",
];

const FAQ = [
  { p: "O I-PRINT muda o equipamento ou a impressora?", r: "Não. O I-PRINT intercepta o envio para a impressora e cria a fila de impressão, sem alterar o equipamento e sem mudar o fluxo da equipe." },
  { p: "Como o I-PRINT identifica o paciente de cada exame?", r: "Os dados do paciente costumam estar gravados dentro da imagem, e não no cabeçalho DICOM. O I-PRINT extrai essas informações automaticamente com IA e gera até 90% menos associações manuais." },
  { p: "O que é necessário para instalar?", r: "Um servidor próprio ou uma máquina virtual com no mínimo 4 núcleos de processamento, 16 GB de memória e SSD de 256 GB, com Ubuntu ou Windows 11 Pro." },
  { p: "O que está incluído?", r: "Instalação e configuração do sistema de inteligência artificial, aplicação dos protocolos, suporte técnico contínuo e treinamento inicial da equipe de operadores." },
];

export function CorpoPrint() {
  return (
    <>
      {/* O PROBLEMA */}
      <section className="ir-bloco">
        <div className="ir-faixa">
          <Surge className="ip-cab">
            <h2 className="ir-h2">O custo invisível da impressão na radiologia.</h2>
            <p className="ir-lead">Um dos maiores vazamentos de margem financeira da operação, e um dos mais fáceis de eliminar.</p>
          </Surge>
          <Surge className="ip-problemas">
            {PROBLEMAS.map((p) => (
              <div key={p.t}><h3 className="ir-h3">{p.t}</h3><p>{p.d}</p></div>
            ))}
          </Surge>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="ir-bloco ip-gelo">
        <div className="ir-faixa">
          <Surge className="ip-cab">
            <h2 className="ir-h2">Impressão sob demanda. Apenas quando necessário.</h2>
          </Surge>
          <Surge className="ip-passos">
            {PASSOS.map((p, i) => (
              <div key={p.t}>
                <span className="ip-passos__n">{i + 1}</span>
                <h3 className="ir-h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Surge>
        </div>
      </section>

      {/* IA */}
      <section className="ir-bloco ip-ia">
        <div className="ir-faixa ip-ia__grade">
          <Surge>
            <h2 className="ir-h2">A única solução com identificação automática por IA.</h2>
            <p className="ir-lead" style={{ marginTop: 16 }}>Os dados do paciente não estão no cabeçalho DICOM, estão dentro da imagem. O I-PRINT extrai automaticamente.</p>
          </Surge>
          <Surge className="ip-ia__numero">
            <b>até 90%</b>
            <span>menos associações manuais</span>
          </Surge>
        </div>
      </section>

      {/* GANHOS */}
      <section className="ir-bloco ip-gelo">
        <div className="ir-faixa ip-ganhos">
          <Surge>
            <h2 className="ir-h2">Menos custos, mais controle, nenhum desperdício.</h2>
          </Surge>
          <Surge className="ip-ganhos__lista">
            {GANHOS.map((g) => (<div key={g}><i aria-hidden="true" /><span>{g}</span></div>))}
          </Surge>
        </div>
      </section>

      {/* CALCULADORA E I-RAD */}
      <section className="ir-bloco">
        <div className="ir-faixa ir-conexoes">
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Quanto a sua operação gasta com impressões que nunca são retiradas?</h2>
            <p className="ir-texto">Informe o volume de exames e o custo dos insumos e estime a economia com a impressão sob demanda.</p>
            <a href="https://calculator.iosei.co/i-print.html" target="_blank" rel="noreferrer" className="ir-link">Calcular a economia<Seta /></a>
          </Surge>
          <Surge>
            <h2 className="ir-h2" style={{ fontSize: "clamp(1.45rem, 2.4vw, 2rem)" }}>Da sala de exame à entrega, sem desperdício.</h2>
            <p className="ir-texto">Antes da impressão, o I-RAD mostra onde a sua ressonância perde tempo entre um exame e outro.</p>
            <Link to={"/irad" as any} className="ir-link">Conhecer o I-RAD<Seta /></Link>
          </Surge>
        </div>
      </section>

      {/* PERGUNTAS */}
      <section className="ir-bloco ip-gelo">
        <div className="ir-faixa ir-faq">
          <h2 className="ir-h2">Perguntas frequentes</h2>
          <Perguntas itens={FAQ} />
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="ir-final ip-final">
        <div className="ir-faixa">
          <h2 className="ir-h1">Se não foi solicitado, não é impresso.</h2>
          <p className="ir-lead">Veja o I-PRINT funcionando com os seus equipamentos e a sua rotina.</p>
          <Link to={"/contato" as any} className="ir-botao ir-botao--claro">Solicitar demonstração<Seta /></Link>
        </div>
      </section>
    </>
  );
}

export default CorpoPrint;
