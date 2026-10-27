import { createFileRoute } from "@tanstack/react-router";
import { ClariPIPagina } from "@/components/site/clari/ClariPIPagina";

export const Route = createFileRoute("/claripi/")({
  head: () => ({
    meta: [
      { title: "ClariPI | Tomografia e PET-CT com menos contraste, menos dose e mais clareza" },
      { name: "description", content: "ClariACE, ClariCT.AI e ClariPET-CT: inteligência artificial para reduzir contraste, dose e tempo de aquisição em TC e PET-CT, com o equipamento que você já tem." },
    ],
  }),
  component: () => <ClariPIPagina />,
});
