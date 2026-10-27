import { createFileRoute } from "@tanstack/react-router";
import "@/components/site/irad2/irad2.css";
import { HeroPrint } from "@/components/site/iprint/HeroPrint";
import { CorpoPrint } from "@/components/site/iprint/CorpoPrint";

export const Route = createFileRoute("/iprint")({
  head: () => ({
    meta: [
      { title: "I-PRINT On Demand | Imprima somente o que vai ser retirado" },
      { name: "description", content: "Impressão sob demanda na radiologia: o I-PRINT intercepta a impressão, cria uma fila inteligente e só imprime o que foi solicitado." },
    ],
  }),
  component: IPrintPagina,
});

function IPrintPagina() {
  return (
    <div className="ir ip" lang="pt-BR">
      <HeroPrint />
      <CorpoPrint />
    </div>
  );
}
