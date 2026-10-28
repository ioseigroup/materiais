import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Destino } from "@/components/site/comum/Destino";
import { whatsapp } from "@/site/contato";
import logoIosei from "@/assets/logo-iosei.png";
import "./cabecalho.css";

const menu = [
  { nome: <>Swift<b>MR</b></>, frase: "Acelere sua ressonância magnética em até 50% com IA", to: "/swiftmr" },
  { nome: <>Clari<b>ACE</b></>, frase: "Reduza o uso de contraste iodado em até 50% com IA", to: "/claripi/clariace" },
  { nome: <>Clari<b>CT.AI</b></>, frase: "Reduza dose e preserve a qualidade da imagem", to: "/claripi/clarict-ai" },
  { nome: <>Clari<b>PET-CT</b></>, frase: "Otimize exames de PET-CT", to: "/claripi/claripet-ct" },
  { nome: <>I-PRINT <b>On Demand</b></>, frase: "Imprima somente quando necessário", to: "/iprint" },
  { nome: <>I-RAD <b>Data Health</b></>, frase: "Enxergue os gargalos da operação", to: "/irad" },
  { nome: <>I-RIS <b>Business OS</b></>, frase: "Controle a receita da agenda ao banco", to: "/iris" },
  { nome: <>I-PACS <b>Imaging Cloud</b></>, frase: "Suas imagens na nuvem, de qualquer lugar", to: "/ipacs" },
];

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);
  const [movel, setMovel] = useState(false);
  return (
    <header className="pv-cab">
      <div className="pv-cab__linha">
        <Link to={"/" as any} className="pv-logo"><img src={logoIosei} alt="IOSEI Global Operations" /></Link>
        <nav className="pv-nav">
          <div className="pv-sol" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
            <button type="button" aria-expanded={aberto} onClick={() => setAberto((v) => !v)}>Soluções</button>
            {aberto && (
              <div className="pv-sol__caixa">
                {menu.map((m) => (
                  <Destino key={m.to} to={m.to as any} onClick={() => setAberto(false)}><strong>{m.nome}</strong><span>{m.frase}</span></Destino>
                ))}
              </div>
            )}
          </div>
          <Link to={"/quem-somos" as any}>Quem Somos</Link>
          <a href="https://calculator.iosei.co/" target="_blank" rel="noreferrer">Calculadoras de ROI</a>
          <Link to={"/contato" as any}>Contato</Link>
        </nav>
        <div className="pv-cab__fim">
          <a href={whatsapp()} target="_blank" rel="noreferrer" className="pv-cta">Falar com um especialista</a>
          <button type="button" className="pv-menu" aria-label="Menu" aria-expanded={movel} onClick={() => setMovel((v) => !v)}><i /><i /><i /></button>
        </div>
      </div>
      {movel && (
        <div className="pv-movel">
          {menu.map((m) => <Destino key={m.to} to={m.to as any} onClick={() => setMovel(false)}><strong>{m.nome}</strong></Destino>)}
          <Link to={"/quem-somos" as any} onClick={() => setMovel(false)}>Quem Somos</Link>
          <Link to={"/contato" as any} onClick={() => setMovel(false)}>Contato</Link>
        </div>
      )}
    </header>
  );
}


export default SiteHeader;
