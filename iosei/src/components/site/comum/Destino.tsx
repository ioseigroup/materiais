import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { EXTERNOS } from "@/site/destinos";

/* Link para outra página ou outro produto: rota interna no site IOSEI, endereço externo nos sites próprios. */
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children?: ReactNode };

export function Destino({ to, children, ...resto }: Props) {
  const externo = EXTERNOS[to];
  if (externo) return <a href={externo} {...resto}>{children}</a>;
  return <Link to={to as any} {...resto}>{children}</Link>;
}
