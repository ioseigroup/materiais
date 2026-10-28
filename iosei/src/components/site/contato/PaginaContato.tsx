import "@/iosei/iosei.css";
import "./contato.css";
import { Seta, FundoVivo } from "@/iosei/pecas";
import { Destino } from "@/components/site/comum/Destino";
import { whatsapp, WHATSAPP_EXIBICAO } from "@/site/contato";

/* Contato: o comercial da IOSEI pelo WhatsApp, com o assunto já escolhido. */
const assuntos = [
  { nome: <>Swift<b>MR</b></>, texto: "Mais exames de ressonância com o mesmo equipamento.", msg: "SwiftMR" },
  { nome: <>Clari<b>ACE</b></>, texto: "Menos contraste iodado em tomografia.", msg: "ClariACE" },
  { nome: <>Clari<b>CT.AI</b></>, texto: "Menos dose e ruído em tomografia.", msg: "ClariCT.AI" },
  { nome: <>Clari<b>PET-CT</b></>, texto: "Menos tempo e radiofármaco no PET-CT.", msg: "ClariPET-CT" },
  { nome: <>I-PRINT <b>On Demand</b></>, texto: "Impressão somente quando o paciente solicita.", msg: "I-PRINT" },
  { nome: <>I-RIS <b>Business OS</b></>, texto: "Gestão de receita da radiologia.", msg: "I-RIS" },
  { nome: <>I-PACS <b>Imaging Cloud</b></>, texto: "Arquivo de imagens em nuvem.", msg: "I-PACS" },
];

export function PaginaContato() {
  return (
    <div className="io" data-tema="noite">
      <div className="io-fluxo">
        <FundoVivo />
        <section className="io-bloco io-contato">
          <div className="io-faixa io-contato__grade">
            <div className="io-contato__texto">
              <h1 className="io-h1">Fale com o comercial da IOSEI.</h1>
              <p className="io-lead">Conte como está a sua operação de diagnóstico por imagem. Nosso time comercial responde pelo WhatsApp e mostra, com dados, onde estão as maiores oportunidades de ganho.</p>
              <div className="io-acoes">
                <a className="io-botao" href={whatsapp()} target="_blank" rel="noreferrer">Falar no WhatsApp<Seta /></a>
              </div>
              <dl className="io-contato__dados">
                <div><dt>WhatsApp comercial</dt><dd><a href={whatsapp()} target="_blank" rel="noreferrer">{WHATSAPP_EXIBICAO}</a></dd></div>
                <div><dt>Presença</dt><dd>Brasil, Espanha, Portugal, Paraguai, Panamá e Estados Unidos</dd></div>
              </dl>
            </div>
            <div className="io-painel io-painel--g io-vidro io-contato__painel">
              <h2 className="io-h2">Sobre qual solução você quer conversar?</h2>
              <div className="io-atalhos">
                {assuntos.map((a) => (
                  <a key={a.msg} href={whatsapp(`Olá! Acessei o site da IOSEI Group e gostaria de falar com um especialista sobre o ${a.msg}.`)} target="_blank" rel="noreferrer">
                    <span><strong className="io-contato__marca">{a.nome}</strong>{a.texto}</span>
                    <em>WhatsApp<Seta /></em>
                  </a>
                ))}
                <Destino to="/irad">
                  <span><strong className="io-contato__marca">I-RAD <b>Data Health</b></strong>Inteligência operacional, no site oficial do I-RAD.</span>
                  <em>i-rad.co<Seta /></em>
                </Destino>
              </div>
            </div>
          </div>
        </section>
        <section className="io-bloco">
          <div className="io-faixa io-contato__calc">
            <h2 className="io-h2">Antes da conversa, estime o impacto.</h2>
            <p className="io-lead">As calculadoras usam os dados da sua instituição para estimar capacidade, economia e retorno.</p>
            <div className="io-acoes">
              <a className="io-botao io-botao--vidro" href="https://calculator.iosei.co/" target="_blank" rel="noreferrer">Acessar as calculadoras<Seta /></a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default PaginaContato;
