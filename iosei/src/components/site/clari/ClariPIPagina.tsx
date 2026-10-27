import "@/components/site/irad2/irad2.css";
import { HeroClari } from "@/components/site/clari/HeroClari";
import { CorpoClari } from "@/components/site/clari/CorpoClari";

/* ClariPI: ClariACE, ClariCT.AI e ClariPET-CT numa página só, em cinza escuro. */
export function ClariPIPagina({ produto }: { produto?: string }) {
  return (
    <div className="ir cl" lang="pt-BR">
      <HeroClari alvoInicial={produto} />
      <CorpoClari />
    </div>
  );
}
