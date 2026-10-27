import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { EXTERNOS } from "@/site/destinos";

/* Monta uma página escrita em HTML (I-RIS, I-PACS) e liga o comportamento dela.
   Os links "#/rota" do HTML viram rota interna ou endereço externo, conforme o site. */
export function PaginaHTML({ html, iniciar }: { html: string; iniciar: (raiz: HTMLElement) => (() => void) | void }) {
  const ref = useRef<HTMLDivElement>(null);
  const navegar = useNavigate();
  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    const soltar: Array<() => void> = [];
    raiz.querySelectorAll<HTMLAnchorElement>('a[href^="#/"]').forEach((a) => {
      const rota = a.getAttribute("href")!.slice(1);
      const externo = EXTERNOS[rota];
      if (externo) { a.setAttribute("href", externo); return; }
      a.setAttribute("href", rota);
      const clique = (e: MouseEvent) => { e.preventDefault(); navegar({ to: rota as any }); };
      a.addEventListener("click", clique);
      soltar.push(() => a.removeEventListener("click", clique));
    });
    const parar = iniciar(raiz);
    return () => { if (typeof parar === "function") parar(); soltar.forEach((f) => f()); };
    // a página é fixa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
