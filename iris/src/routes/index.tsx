import { createFileRoute } from "@tanstack/react-router";
import { PaginaIris } from "@/components/site/iris/PaginaIris";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I-RIS Business OS | Gestão de receita da radiologia" },
      { name: "description", content: "Controle a receita da radiologia da agenda ao banco." },
    ],
  }),
  component: PaginaIris,
});
