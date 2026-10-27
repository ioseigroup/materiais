import "./iris.css";
import { IPACS_HTML, iniciarIpacs } from "./ipacs-pagina";
import { PaginaHTML } from "./PaginaHTML";

export function PaginaIpacs() {
  return <PaginaHTML html={IPACS_HTML} iniciar={iniciarIpacs} />;
}
export default PaginaIpacs;
