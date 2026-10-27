import type { AnchorHTMLAttributes, ReactNode } from "react";
import { EXTERNOS } from "@/site/destinos";

/* Link para outro produto ou para o contato: no site do I-RAD todos os destinos são endereços ou âncoras. */
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; children?: ReactNode };

export function Destino({ to, children, ...resto }: Props) {
  return <a href={EXTERNOS[to] ?? to} {...resto}>{children}</a>;
}
