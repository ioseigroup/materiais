import { useEffect, type ReactNode } from "react";
import { CascaProduto } from "./CascaProduto";
import { PRODUTO } from "@/site/produto";

/* Cabeçalho e rodapé do produto em volta da página, com a tradução PT, EN e ES. */
export function RaizProduto({ children }: { children: ReactNode }) {
  useEffect(() => {
    // tradução PT, EN e ES do site (mesma da prévia): carrega uma vez, no navegador
    if (document.querySelector("script[data-traducao]")) return;
    const s = document.createElement("script");
    s.src = "/traducao.js";
    s.dataset.traducao = "1";
    document.body.appendChild(s);
  }, []);
  useEffect(() => {
    // âncoras da própria página (#contato, #i5-solucao) com rolagem suave
    const clique = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || id.startsWith("/")) return;
      const alvo = document.getElementById(id);
      if (alvo) { e.preventDefault(); alvo.scrollIntoView({ behavior: "smooth", block: "start" }); }
    };
    document.addEventListener("click", clique);
    return () => document.removeEventListener("click", clique);
  }, []);
  return <CascaProduto cfg={PRODUTO}>{children}</CascaProduto>;
}
export default RaizProduto;
