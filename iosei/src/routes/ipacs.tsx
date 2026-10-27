import { createFileRoute } from "@tanstack/react-router";
import { PaginaIpacs } from "@/components/site/iris/PaginaIpacs";

export const Route = createFileRoute("/ipacs")({
  head: () => ({
    meta: [
      { title: "I-PACS Imaging Cloud | Arquivo de imagens em nuvem" },
      { name: "description", content: "Suas imagens na nuvem, de qualquer lugar." },
    ],
  }),
  component: PaginaIpacs,
});
