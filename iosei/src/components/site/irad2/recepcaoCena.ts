import type { Quadro } from "./CenaIrad";

/* ------------------------------------------------------------
 * Recepção da versão com vídeo: a sala cheia e, depois, esvaziando.
 * Base: foto da recepção tranquila. Por cima, cada pessoa da foto cheia
 * recortada (atlas) e dissolvida uma a uma conforme a rolagem.
 * Números derivados dos valores de exemplo da V2. Simulação ilustrativa.
 * ------------------------------------------------------------ */

const TIT = '"Encode Sans Semi Expanded", "Segoe UI", sans-serif';
const TXT = '"Source Sans 3", "Segoe UI", sans-serif';
const COR = {
  cartao: "rgba(13,21,54,.9)", borda: "rgba(160,190,255,.22)", rotulo: "#a8b3cf",
  ciano: "#26b9da", alerta: "#e0484f", alertaClaro: "#ff6b71", ambar: "#f0a237", ok: "#24a873", okClaro: "#3fd08f",
  tinta: "#121a3d", tinta2: "#4f5a75",
};
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
const saida = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const janela = (p: number, a: number, b: number, f = 0.014) => Math.min(suave((p - a) / f), suave((b - p) / f));
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const q = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + q, y);
  ctx.arcTo(x + w, y, x + w, y + h, q);
  ctx.arcTo(x + w, y + h, x, y + h, q);
  ctx.arcTo(x, y + h, x, y, q);
  ctx.arcTo(x, y, x + w, y, q);
  ctx.closePath();
}
const minSeg = (s: number) => {
  const m = Math.floor(s / 60), r = Math.round(s % 60);
  if (r === 60) return `${m + 1} min`;
  return r ? `${m} min ${r} s` : `${m} min`;
};
const mmss = (s: number) => {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
};

type Peca = { id: number; fica: number; x: number; y: number; w: number; h: number; ax: number; ay: number; cx: number };
const FOTO = { w: 1600, h: 893 };
/* em ordem de profundidade: do fundo para a frente */
export const PECAS: Peca[] = [
  { id: 20, fica: 0, x: 307, y: 340, w: 104, h: 48, ax: 109, ay: 934, cx: 395 },
  { id: 8, fica: 1, x: 398, y: 286, w: 132, h: 128, ax: 375, ay: 524, cx: 441 },
  { id: 19, fica: 0, x: 61, y: 307, w: 107, h: 126, ax: 0, ay: 934, cx: 119 },
  { id: 10, fica: 0, x: 742, y: 280, w: 156, h: 149, ax: 586, ay: 524, cx: 790 },
  { id: 9, fica: 0, x: 674, y: 309, w: 75, h: 125, ax: 509, ay: 524, cx: 708 },
  { id: 18, fica: 0, x: 566, y: 359, w: 95, h: 112, ax: 1850, ay: 524, cx: 625 },
  { id: 14, fica: 0, x: 1138, y: 373, w: 96, h: 137, ax: 1208, ay: 524, cx: 1186 },
  { id: 13, fica: 0, x: 468, y: 303, w: 104, h: 206, ax: 1102, ay: 524, cx: 514 },
  { id: 11, fica: 0, x: 1272, y: 377, w: 102, h: 163, ax: 744, ay: 524, cx: 1314 },
  { id: 15, fica: 0, x: 477, y: 361, w: 99, h: 200, ax: 1306, ay: 524, cx: 531 },
  { id: 17, fica: 0, x: 1352, y: 371, w: 227, h: 219, ax: 1621, ay: 524, cx: 1432 },
  { id: 16, fica: 0, x: 275, y: 372, w: 212, h: 232, ax: 1407, ay: 524, cx: 396 },
  { id: 6, fica: 0, x: 144, y: 314, w: 204, h: 286, ax: 1572, ay: 0, cx: 234 },
  { id: 12, fica: 0, x: 904, y: 363, w: 252, h: 263, ax: 848, ay: 524, cx: 1059 },
  { id: 5, fica: 0, x: 741, y: 380, w: 191, h: 308, ax: 1379, ay: 0, cx: 814 },
  { id: 4, fica: 0, x: 650, y: 374, w: 156, h: 297, ax: 1221, ay: 0, cx: 719 },
  { id: 1, fica: 0, x: 958, y: 376, w: 225, h: 442, ax: 359, ay: 0, cx: 1070 },
  { id: 7, fica: 1, x: 38, y: 404, w: 373, h: 408, ax: 0, ay: 524, cx: 196 },
  { id: 3, fica: 1, x: 1059, y: 396, w: 267, h: 449, ax: 952, ay: 0, cx: 1209 },
  { id: 2, fica: 1, x: 454, y: 369, w: 364, h: 522, ax: 586, ay: 0, cx: 633 },
  { id: 0, fica: 1, x: 1185, y: 426, w: 357, h: 467, ax: 0, ay: 0, cx: 1335 },
];

/* trechos da rolagem */
export const RECEPCAO = {
  entra: 0.425, cheia: [0.45, 0.585] as const, esvazia: 0.738, fim: 1,
};
const SAI = PECAS.filter((p) => !p.fica);
const T0 = 0.765, T1 = 0.895, DUR = 0.014;
const passo = (T1 - DUR - T0) / Math.max(1, SAI.length - 1);

/* números derivados dos exemplos: slot real 17 min 56 s contra 15 min previstos */
const SLOT = 1076, META_SLOT = 900, TROCA = 420, META_TROCA = 300;
const ATRASO_10 = (SLOT - META_SLOT) * 10; // 29 min 20 s depois de 10 exames
const CABEM_REAL = Math.floor((720 * 60) / SLOT); // 40
const CABEM_META = Math.floor((720 * 60) / META_SLOT); // 48

type Caixa = { x: number; y: number; w: number; h: number };

function cartao(ctx: CanvasRenderingContext2D, b: Caixa, k: number) {
  ctx.save();
  ctx.shadowColor = "rgba(3,6,20,.45)"; ctx.shadowBlur = 28 * k; ctx.shadowOffsetY = 12 * k;
  rr(ctx, b.x, b.y, b.w, b.h, 12 * k); ctx.fillStyle = COR.cartao; ctx.fill();
  ctx.restore();
  rr(ctx, b.x, b.y, b.w, b.h, 12 * k); ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.stroke();
}
type Indicador = { rotulo: string; valor: string; cor: string; nota: string; notaCor?: string; barra?: number; barraCor?: string };
function indicador(ctx: CanvasRenderingContext2D, b: Caixa, k: number, d: Indicador, compacto: boolean) {
  cartao(ctx, b, k);
  const pad = (compacto ? 12 : 16) * k;
  ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
  ctx.font = `600 ${(compacto ? 12 : 13.5) * k}px ${TXT}`; ctx.fillStyle = COR.rotulo;
  ctx.fillText(d.rotulo, b.x + pad, b.y + pad + 10 * k);
  ctx.font = `700 ${(compacto ? 22 : 28) * k}px ${TIT}`; ctx.fillStyle = d.cor;
  ctx.fillText(d.valor, b.x + pad, b.y + (compacto ? 52 : 62) * k);
  ctx.font = `600 ${(compacto ? 11.5 : 12.5) * k}px ${TXT}`; ctx.fillStyle = d.notaCor ?? COR.rotulo;
  if (compacto) ctx.fillText(d.nota, b.x + pad, b.y + b.h - pad + 2 * k);
  else { ctx.textAlign = "right"; ctx.fillText(d.nota, b.x + b.w - pad, b.y + 62 * k); ctx.textAlign = "left"; }
  if (d.barra !== undefined && !compacto) {
    const bx = b.x + pad, by = b.y + b.h - 16 * k, bw = b.w - pad * 2;
    rr(ctx, bx, by, bw, 5 * k, 2.5 * k); ctx.fillStyle = "rgba(160,190,255,.14)"; ctx.fill();
    rr(ctx, bx, by, bw * clamp(d.barra), 5 * k, 2.5 * k); ctx.fillStyle = d.barraCor ?? COR.ciano; ctx.fill();
  }
}

/* aviso de avaliação do paciente, preso acima da pessoa */
function aviso(ctx: CanvasRenderingContext2D, ax: number, ay: number, k: number, nota: number, frase: string, op: number, limite: Caixa, ocupados: Caixa[]) {
  if (op <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = op;
  ctx.font = `600 ${12.5 * k}px ${TXT}`;
  const tw = Math.max(ctx.measureText(frase).width, 100 * k);
  const w = tw + 56 * k, h = 46 * k;
  let x = ax - w / 2;
  x = clamp(x, limite.x + 8, limite.x + limite.w - w - 8);
  let y = Math.max(limite.y + 8, ay - h - 14 * k);
  // não sobrepor outro aviso: sobe ou, sem espaço, desce
  for (let tentativa = 0; tentativa < 6; tentativa++) {
    const bate = ocupados.find((o) => x < o.x + o.w + 6 && x + w + 6 > o.x && y < o.y + o.h + 6 && y + h + 6 > o.y);
    if (!bate) break;
    const acima = bate.y - h - 8;
    y = acima >= limite.y + 8 ? acima : bate.y + bate.h + 8;
  }
  ocupados.push({ x, y, w, h });
  y += (1 - op) * 8 * k;
  ctx.shadowColor = "rgba(8,14,38,.35)"; ctx.shadowBlur = 18 * k; ctx.shadowOffsetY = 6 * k;
  rr(ctx, x, y, w, h, 10 * k); ctx.fillStyle = "#ffffff"; ctx.fill();
  ctx.shadowColor = "transparent";
  const px = clamp(ax, x + 14 * k, x + w - 14 * k);
  ctx.beginPath(); ctx.moveTo(px - 7 * k, y + h - 1); ctx.lineTo(px + 7 * k, y + h - 1); ctx.lineTo(px, y + h + 7 * k); ctx.closePath(); ctx.fill();
  const cor = nota <= 6 ? COR.alerta : nota <= 8 ? COR.ambar : COR.ok;
  rr(ctx, x + 8 * k, y + 8 * k, 30 * k, 30 * k, 7 * k); ctx.fillStyle = cor; ctx.fill();
  ctx.fillStyle = "#ffffff"; ctx.textAlign = "center"; ctx.font = `700 ${15 * k}px ${TIT}`;
  ctx.fillText(String(nota), x + 23 * k, y + 28.5 * k);
  ctx.textAlign = "left";
  ctx.font = `600 ${10.5 * k}px ${TXT}`; ctx.fillStyle = COR.tinta2;
  ctx.fillText("Avaliação do paciente", x + 46 * k, y + 19 * k);
  ctx.font = `600 ${12.5 * k}px ${TXT}`; ctx.fillStyle = COR.tinta;
  ctx.fillText(frase, x + 46 * k, y + 35 * k);
  ctx.restore();
}

export function criarRecepcao(fontes: { calma: string; pessoas: string }) {
  let calma: HTMLImageElement | null = null, pessoas: HTMLImageElement | null = null;
  if (typeof window !== "undefined") {
    calma = new Image(); calma.src = fontes.calma;
    pessoas = new Image(); pessoas.src = fontes.pessoas;
  }
  const pronta = (i: HTMLImageElement | null) => !!i && i.complete && i.naturalWidth > 0;

  return (q: Quadro, coluna: Caixa, k: number, estreito: boolean) => {
    const p = q.p;
    const vis = suave(seg(p, RECEPCAO.entra, RECEPCAO.entra + 0.03));
    if (vis <= 0.001 || !pronta(calma) || !pronta(pessoas)) return;
    const { ctx } = q;
    const [x0, y0] = q.conv(0, 0), [x1, y1] = q.conv(1, 1);
    // a foto ocupa a mesma área do vídeo (mesma proporção), com aproximação lenta
    const z = 1 + 0.07 * seg(p, RECEPCAO.entra, 1);
    const cw = (x1 - x0) * z, ch = (y1 - y0) * z;
    const ox = x0 + (x1 - x0) * 0.55 - cw * 0.55, oy = y0 + (y1 - y0) * 0.6 - ch * 0.6;
    const s = cw / FOTO.w;
    ctx.save();
    ctx.beginPath(); ctx.rect(q.area.x, q.area.y, q.area.w, q.area.h); ctx.clip();
    ctx.globalAlpha = vis;
    ctx.drawImage(calma!, ox, oy, cw, ch);
    const fica = 1 - suave(seg(p, RECEPCAO.esvazia, RECEPCAO.esvazia + 0.024));
    let j = 0;
    for (const pc of PECAS) {
      let a: number;
      if (pc.fica) a = fica;
      else { const t = T0 + j * passo; a = 1 - suave(seg(p, t, t + DUR)); j++; }
      if (a <= 0.003) continue;
      ctx.globalAlpha = vis * a;
      ctx.drawImage(pessoas!, pc.ax, pc.ay, pc.w, pc.h, ox + pc.x * s, oy + pc.y * s, pc.w * s, pc.h * s);
    }
    ctx.restore();
    const ponto = (fx: number, fy: number): [number, number] => [ox + fx * s, oy + fy * s];
    const limite: Caixa = estreito ? q.area : { x: q.area.x, y: q.area.y, w: Math.min(q.area.w, coluna.x - q.area.x - 12), h: q.area.h };
    const ka = estreito ? k * 0.8 : k;

    // ---------- sala cheia ----------
    const op1 = janela(p, RECEPCAO.cheia[0], RECEPCAO.cheia[1]);
    if (op1 > 0.01) {
      const t = saida(seg(p, 0.46, 0.55));
      const atraso = ATRASO_10 * t;
      const cabem = Math.round(mix(CABEM_META, CABEM_REAL, saida(seg(p, 0.47, 0.54))));
      const dados: Indicador[] = [
        { rotulo: "Atraso acumulado na agenda", valor: minSeg(atraso), cor: COR.alertaClaro, nota: "após 10 exames", barra: t, barraCor: COR.alerta },
        { rotulo: "Exames que cabem no dia", valor: String(cabem), cor: cabem < CABEM_META ? COR.alertaClaro : "#ffffff", nota: `previstos ${CABEM_META}`, barra: cabem / CABEM_META, barraCor: COR.alerta },
      ];
      ctx.save(); ctx.globalAlpha = op1;
      grade(ctx, q, coluna, k, estreito, dados, op1);
      ctx.restore();
      // avaliações negativas
      const neg: Array<[number, number, string, number]> = [[2, 3, "A espera passou muito do horário.", 0.475], [16, 4, "Cheguei cedo e ainda estou aqui.", 0.5], [7, 2, "Atendimento muito atrasado.", 0.525]];
      const ocupados: Caixa[] = [];
      for (const [id, nota, frase, quando] of estreito ? neg.slice(0, 2) : neg) {
        const pc = PECAS.find((x) => x.id === id)!;
        const [hx, hy] = ponto(pc.cx, pc.y);
        aviso(ctx, hx, hy, ka, nota, frase, Math.min(saida(seg(p, quando, quando + 0.02)), 1 - suave(seg(p, RECEPCAO.cheia[1] - 0.012, RECEPCAO.cheia[1]))) * op1, limite, ocupados);
      }
    }

    // ---------- sala esvaziando ----------
    const op2 = suave(seg(p, RECEPCAO.esvazia, RECEPCAO.esvazia + 0.02));
    if (op2 > 0.01) {
      const t = saida(seg(p, 0.75, 0.88));
      const troca = mix(TROCA, META_TROCA, t), slot = mix(SLOT, META_SLOT, t);
      const cabem = Math.round(mix(CABEM_REAL, CABEM_META, t));
      const atraso = ATRASO_10 * (1 - t);
      const dados: Indicador[] = [
        { rotulo: "Tempo de troca", valor: mmss(troca), cor: troca > META_TROCA + 1 ? "#ffffff" : COR.okClaro, nota: "meta 05:00", barra: clamp((TROCA - troca) / (TROCA - META_TROCA)), barraCor: COR.ok },
        { rotulo: "Slot real", valor: minSeg(slot), cor: slot > META_SLOT + 1 ? "#ffffff" : COR.okClaro, nota: "meta 15 min", barra: clamp((SLOT - slot) / (SLOT - META_SLOT)), barraCor: COR.ok },
        { rotulo: "Exames que cabem no dia", valor: String(cabem), cor: cabem >= CABEM_META ? COR.okClaro : "#ffffff", nota: `+${cabem - CABEM_REAL} no dia`, notaCor: COR.okClaro, barra: cabem / CABEM_META, barraCor: COR.ok },
        { rotulo: "Atraso acumulado na agenda", valor: atraso < 1 ? "0 min" : minSeg(atraso), cor: atraso < 1 ? COR.okClaro : "#ffffff", nota: atraso < 1 ? "agenda no horário" : "diminuindo", barra: 1 - atraso / ATRASO_10, barraCor: COR.ok },
      ];
      ctx.save(); ctx.globalAlpha = op2;
      grade(ctx, q, coluna, k, estreito, dados, op2);
      ctx.restore();
      const pos: Array<[number, number, string, number]> = [[2, 10, "Fui atendido no horário.", 0.87], [7, 9, "Atendimento rápido e organizado.", 0.895]];
      const ocupados: Caixa[] = [];
      for (const [id, nota, frase, quando] of pos) {
        const pc = PECAS.find((x) => x.id === id)!;
        const [hx, hy] = ponto(pc.cx, pc.y);
        aviso(ctx, hx, hy, ka, nota, frase, saida(seg(p, quando, quando + 0.02)) * op2, limite, ocupados);
      }
      const nota = suave(seg(p, 0.9, 0.92));
      if (nota > 0 && !estreito) {
        ctx.save(); ctx.globalAlpha = nota * 0.9;
        ctx.font = `600 ${12 * k}px ${TXT}`; ctx.fillStyle = "#c7d2ea"; ctx.textAlign = "right";
        ctx.fillText("Simulação ilustrativa com os valores do exemplo.", coluna.x + coluna.w, q.h - 34);
        ctx.restore();
      }
    }
  };
}

/* coluna de cartões (computador) ou grade abaixo do vídeo (celular) */
function grade(ctx: CanvasRenderingContext2D, q: Quadro, coluna: Caixa, k: number, estreito: boolean, dados: Indicador[], op: number) {
  if (estreito) {
    const n = dados.length, cols = 2, g = 8;
    const w = (q.w - 24 - g) / cols, h = 76 * k;
    const y0 = q.area.y + q.area.h + 8;
    dados.forEach((d, i) => {
      const b = { x: 12 + (i % cols) * (w + g), y: y0 + Math.floor(i / cols) * (h + g) + (1 - op) * 16, w, h };
      indicador(ctx, b, k, d, true);
    });
    return n;
  }
  const h = 100 * k, g = 12 * k;
  dados.forEach((d, i) => {
    const b = { x: coluna.x, y: coluna.y + i * (h + g) + (1 - op) * 20 * k, w: coluna.w, h };
    indicador(ctx, b, k, d, false);
  });
  return dados.length;
}
