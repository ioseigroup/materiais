import { createFileRoute, redirect } from "@tanstack/react-router";

/* O I-RAD tem site oficial próprio. Quem chegar pelo endereço antigo vai para i-rad.co. */
export const Route = createFileRoute("/irad")({
  beforeLoad: () => {
    throw redirect({ href: "https://i-rad.co" });
  },
});
