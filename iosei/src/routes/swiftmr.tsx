import { createFileRoute, Link } from "@tanstack/react-router";
import "@/components/site/irad2/irad2.css";
import airsClaro from "@/assets/airs-claro.png";
import { Seta } from "@/components/site/irad2/pecas";
import { CorpoSwift, CASOS } from "@/components/site/swift2/CorpoSwift";
import { HeroDuasSalas } from "@/components/site/swift2/HeroDuasSalas";

/* Versão B nova do SwiftMR: duas salas lado a lado, sem e com SwiftMR, e corte para os resultados reais. */

export const Route = createFileRoute("/swiftmr")({
  head: () => ({ meta: [{ title: "SwiftMR | Acelere exames de ressonância em até 50%" }] }),
  component: SwiftMRPage,
});

function SwiftMRPage() {
  return (
    <div className="ir sw" lang="pt-BR">
      <HeroDuasSalas
        rotulo="Duas salas de ressonância no mesmo intervalo de tempo, sem e com SwiftMR, seguidas de resultados reais de antes e depois"
        casos={[CASOS[1], CASOS[0]]}
        intro={
          <>
            <span className="sw-marca" aria-label="SwiftMR">Swift<b>MR</b></span>
            <h1 className="ir-h1">Acelere sua ressonância magnética <span className="ir-acento">em até 50%</span> com IA.</h1>
            <p className="ir-lead">Mais exames no mesmo equipamento. Sem trocar scanners. Sem mudar o fluxo da equipe.</p>
            <span className="sw-parceiro">Tecnologia <img src={airsClaro} alt="AIRS Medical" /></span>
          </>
        }
        fecho={
          <>
            <h2 className="ir-h2">Veja na sua própria sala.</h2>
            <p className="ir-texto">Teste o SwiftMR por 30 dias com os seus equipamentos, os seus protocolos e os seus pacientes.</p>
            <Link to={"/contato" as any} className="ir-botao">Solicitar teste de 30 dias<Seta /></Link>
          </>
        }
      />
      <CorpoSwift semComparador />
    </div>
  );
}
