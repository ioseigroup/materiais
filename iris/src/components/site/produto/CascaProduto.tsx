import type { CSSProperties, ReactNode } from "react";
import "./casca.css";

/* Cabeçalho e rodapé dos sites próprios de produto. O conteúdo de cada produto vem de @/site/produto. */
export type Contato = { rotulo: string; valor: string; href?: string };
export type ConfigProduto = {
  logo: string;
  logoAlt: string;
  cta: string;
  frase: string;
  descricao: string;
  contatos: Contato[];
  nota: string;
  fundo: string;
  acento: string;
  /** acesso de clientes à plataforma (ex.: login do I-RAD) */
  entrar?: { rotulo: string; href: string };
  /** true quando a página já reserva espaço para o cabeçalho (ex.: I-RAD) */
  cabecalhoFixo?: boolean;
};

export function CascaProduto({ cfg, children }: { cfg: ConfigProduto; children: ReactNode }) {
  const cores = { "--pc-fundo": cfg.fundo, "--pc-acento": cfg.acento } as CSSProperties;
  return (
    <div className="pc" style={cores}>
      <header className={cfg.cabecalhoFixo ? "pc-cab pc-cab--fixo" : "pc-cab"}>
        <div className="pc-cab__linha">
          <a href="#topo" className="pc-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img src={cfg.logo} alt={cfg.logoAlt} />
          </a>
          <div className="pc-cab__fim pv-cab__fim">
            {cfg.entrar && <a href={cfg.entrar.href} className="pc-entrar" target="_blank" rel="noreferrer">{cfg.entrar.rotulo}</a>}
            <a href="#contato" className="pc-cta"><span className="pc-cta__longo">{cfg.cta}</span><span className="pc-cta__curto">Contato</span></a>
          </div>
        </div>
      </header>
      <main id="topo">{children}</main>
      <footer className="pc-rodape" id="contato">
        <div className="pc-rodape__grade">
          <div className="pc-rodape__marca">
            <img src={cfg.logo} alt={cfg.logoAlt} />
            <strong>{cfg.frase}</strong>
            <p>{cfg.descricao}</p>
          </div>
          <div className="pc-contato">
            {cfg.contatos.map((c) =>
              c.href ? (
                <a key={c.rotulo} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span>{c.rotulo}</span><b>{c.valor}</b></a>
              ) : (
                <div key={c.rotulo} className="pc-pendente"><span>{c.rotulo}</span><b>{c.valor}</b></div>
              ),
            )}
          </div>
        </div>
        <p className="pc-rodape__nota">{cfg.nota}</p>
      </footer>
    </div>
  );
}
