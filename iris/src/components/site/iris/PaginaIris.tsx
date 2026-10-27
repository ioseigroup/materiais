import "./iris.css";
import { IRIS_HTML, iniciarIris } from "./iris-pagina";
import { PaginaHTML } from "./PaginaHTML";

export function PaginaIris() {
  return <PaginaHTML html={IRIS_HTML} iniciar={iniciarIris} />;
}
export default PaginaIris;
