import { createFileRoute } from "@tanstack/react-router";
import { PaginaContato } from "@/components/site/contato/PaginaContato";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | IOSEI Group" },
      { name: "description", content: "Fale com o comercial da IOSEI pelo WhatsApp e descubra onde estão as maiores oportunidades de ganho da sua operação." },
    ],
  }),
  component: PaginaContato,
});
