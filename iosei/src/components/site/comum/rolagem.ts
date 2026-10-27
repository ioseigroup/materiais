import { useEffect, type RefObject } from "react";

/* Utilidades das cenas presas à rolagem. */
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** sobe em [a, a+f], fica em 1 e desce em [b-f, b] */
export const janela = (p: number, a: number, b: number, f = 0.02) => Math.min(suave((p - a) / f), suave((b - p) / f));

/**
 * Chama pintar(p) a cada quadro em que a rolagem muda, com p de 0 a 1 ao longo da seção.
 * A suavização deixa o movimento contínuo mesmo com a roda do mouse.
 */
export function useRolagem(secRef: RefObject<HTMLElement | null>, pintar: (p: number) => void, aoRedimensionar?: () => void) {
  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vivo = true, raf = 0, atual = -1;
    const progresso = () => {
      const r = sec.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      return curso > 0 ? clamp(-r.top / curso) : 0;
    };
    const laco = () => {
      raf = 0;
      if (!vivo) return;
      const alvo = progresso();
      if (atual < 0 || semMovimento) atual = alvo; else atual += (alvo - atual) * 0.18;
      if (Math.abs(alvo - atual) < 0.0001) atual = alvo;
      pintar(atual);
      if (atual !== alvo) raf = requestAnimationFrame(laco);
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(laco); };
    const redim = () => { aoRedimensionar?.(); atual = -1; pedir(); };
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", redim);
    window.addEventListener("iosei-lang", redim);
    aoRedimensionar?.();
    pedir();
    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", redim);
      window.removeEventListener("iosei-lang", redim);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** leva a página até o ponto p (0 a 1) de uma seção presa à rolagem */
export function irPara(sec: HTMLElement | null, p: number) {
  if (!sec) return;
  const top = sec.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + p * (sec.offsetHeight - window.innerHeight), behavior: "smooth" });
}
