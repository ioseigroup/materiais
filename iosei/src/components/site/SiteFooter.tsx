import { Link } from "@tanstack/react-router";
import { Destino } from "@/components/site/comum/Destino";
import logoIosei from "@/assets/logo-iosei.png";
import "./cabecalho.css";

export function SiteFooter() {
  return (
    <footer className="pv-rodape">
      <div className="pv-rodape__grade">
        <div>
          <img src={logoIosei} alt="IOSEI Global Operations" />
          <strong>Radiologia de alta performance.</strong>
          <p>Tecnologia, inteligência artificial e dados para transformar operações de diagnóstico por imagem.</p>
        </div>
        <div>
          <h4>Soluções</h4>
          <Link to={"/swiftmr" as any}>Aceleração de ressonância</Link>
          <Link to={"/claripi/clariace" as any}>Otimização de contraste</Link>
          <Link to={"/claripi/clarict-ai" as any}>IA para tomografia</Link>
          <Link to={"/claripi/claripet-ct" as any}>IA para PET-CT</Link>
          <Link to={"/iprint" as any}>Impressão sob demanda</Link>
          <Destino to={"/irad" as any}>Inteligência operacional</Destino>
          <Link to={"/iris" as any}>Gestão de receita da radiologia</Link>
          <Link to={"/ipacs" as any}>Arquivo de imagens em nuvem</Link>
        </div>
        <div>
          <h4>IOSEI Group</h4>
          <Link to={"/quem-somos" as any}>Quem Somos</Link>
          <a href="https://calculator.iosei.co/" target="_blank" rel="noreferrer">Calculadoras de ROI</a>
          <Link to={"/contato" as any}>Contato</Link>
        </div>
      </div>
      <p className="pv-rodape__nota">As funcionalidades, indicações, registros regulatórios e resultados podem variar de acordo com o país, o equipamento, o protocolo utilizado e as características de cada operação.</p>
    </footer>
  );
}


export default SiteFooter;
