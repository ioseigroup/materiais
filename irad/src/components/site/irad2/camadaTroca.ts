import type { Quadro } from "./CenaIrad";
import { criarRecepcao } from "./recepcaoCena";

/* ------------------------------------------------------------
 * Camada gráfica da versão com vídeo: paciente e técnico entram na sala de RM
 * e, por cima, o cronômetro da troca, o slot real, a agenda e as repetições.
 * Tudo depende só do progresso da rolagem (p). Valores das telas da V2.
 * ------------------------------------------------------------ */

const TIT = '"Encode Sans Semi Expanded", "Segoe UI", sans-serif';
const TXT = '"Source Sans 3", "Segoe UI", sans-serif';
const COR = {
  cartao: "rgba(13,21,54,.9)", borda: "rgba(160,190,255,.22)", rotulo: "#a8b3cf",
  ciano: "#26b9da", cianoClaro: "#8fe6f7", alerta: "#e0484f", alertaClaro: "#ff6b71",
  ambar: "#f0a237", ok: "#24a873", noite: "#0b1433",
};

const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const suave = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
const saida = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const janela = (p: number, a: number, b: number, f = 0.016) => Math.min(suave((p - a) / f), suave((b - p) / f));

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
const mmss = (s: number) => {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
};
const minSeg = (s: number) => {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return r ? `${m} min ${r} s` : `${m} min`;
};

/* ---------------- enquadramento ---------------- */
type Caixa = { x: number; y: number; w: number; h: number };
type Arranjo = { k: number; coluna: Caixa; estreito: boolean };
function arranjo(q: Quadro): Arranjo {
  if (q.estreito) {
    const k = clamp(q.w / 480, 0.74, 0.92);
    return { k, estreito: true, coluna: { x: 12, y: q.area.y + 10, w: q.w - 24, h: q.area.h - 20 } };
  }
  const k = clamp(q.w / 1440, 0.84, 1.12);
  const largura = clamp(q.w * 0.31, 340, 460);
  return { k, estreito: false, coluna: { x: q.w - largura - Math.max(28, q.w * 0.035), y: q.h * 0.05, w: largura, h: q.h * 0.9 } };
}

function cartao(ctx: CanvasRenderingContext2D, b: Caixa, k: number, alfa: number, dy = 0) {
  ctx.save();
  ctx.globalAlpha = alfa;
  ctx.shadowColor = "rgba(3,6,20,.45)"; ctx.shadowBlur = 30 * k; ctx.shadowOffsetY = 14 * k;
  rr(ctx, b.x, b.y + dy, b.w, b.h, 12 * k); ctx.fillStyle = COR.cartao; ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = COR.borda; ctx.lineWidth = 1; ctx.stroke();
  ctx.restore();
}
function rotulo(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, k: number, cor = COR.rotulo, alinha: CanvasTextAlign = "left") {
  ctx.font = `600 ${13.5 * k}px ${TXT}`; ctx.fillStyle = cor; ctx.textAlign = alinha; ctx.textBaseline = "alphabetic";
  ctx.fillText(t, x, y);
}

/* ---------------- cronômetro da troca ---------------- */
const TROCA = 420; // 7 min
const META_TROCA = 300; // 5 min
function vidroCron(q: Quadro, b: Caixa, k: number, alerta: number) {
  const { ctx } = q;
  const raio = 16 * k;
  // brilho externo: ciano na meta, vermelho quando passa
  ctx.save();
  rr(ctx, b.x, b.y, b.w, b.h, raio);
  const cor = alerta > 0.5 ? "rgba(255,90,98," : "rgba(38,185,218,";
  ctx.shadowColor = cor + "0.55)"; ctx.shadowBlur = 42 * k;
  ctx.fillStyle = "rgba(10,18,48,.6)"; ctx.fill();
  ctx.restore();
  // vidro: o próprio vídeo desfocado por trás
  ctx.save();
  rr(ctx, b.x, b.y, b.w, b.h, raio); ctx.clip();
  const v = q.video && q.video.readyState >= 2 ? q.video : null;
  if (v) {
    const [x0, y0] = q.conv(0, 0), [x1, y1] = q.conv(1, 1);
    ctx.filter = `blur(${Math.round(18 * k)}px) saturate(140%)`;
    ctx.drawImage(v, x0, y0, x1 - x0, y1 - y0);
    ctx.filter = "none";
  }
  const g = ctx.createLinearGradient(b.x, b.y, b.x + b.w, b.y + b.h);
  g.addColorStop(0, "rgba(16,30,84,.62)"); g.addColorStop(1, "rgba(8,14,40,.78)");
  ctx.fillStyle = g; ctx.fillRect(b.x, b.y, b.w, b.h);
  ctx.restore();
  // borda luminosa
  ctx.save();
  rr(ctx, b.x + 0.75, b.y + 0.75, b.w - 1.5, b.h - 1.5, raio);
  const bord = ctx.createLinearGradient(b.x, b.y, b.x + b.w, b.y + b.h);
  if (alerta > 0.5) { bord.addColorStop(0, "rgba(255,140,146,.95)"); bord.addColorStop(1, "rgba(224,72,79,.35)"); }
  else { bord.addColorStop(0, "rgba(143,230,247,.95)"); bord.addColorStop(1, "rgba(38,185,218,.3)"); }
  ctx.strokeStyle = bord; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore();
}

function cronometro(q: Quadro, A: Arranjo, p: number): Caixa | null {
  const op = janela(p, 0.118, 0.745);
  if (op <= 0.01) return null;
  const { ctx } = q;
  const k = A.k;
  const segs = TROCA * seg(p, 0.135, 0.66);
  const acima = segs > META_TROCA;
  const b: Caixa = A.estreito
    ? { x: A.coluna.x + A.coluna.w - 236 * k, y: A.coluna.y, w: 236 * k, h: 104 * k }
    : { x: A.coluna.x, y: A.coluna.y, w: A.coluna.w, h: 196 * k };
  const dy = (1 - saida(seg(p, 0.118, 0.15))) * 24 * k;
  ctx.save();
  ctx.globalAlpha = op;
  ctx.translate(0, dy);
  vidroCron(q, b, k, acima ? 1 : 0);
  const pad = 20 * k;
  if (A.estreito) {
    rotulo(ctx, "Tempo de troca", b.x + pad * 0.8, b.y + 27 * k, k * 1.05, "#dbe6f7");
    ctx.font = `700 ${38 * k}px ${TIT}`; ctx.fillStyle = acima ? COR.alertaClaro : "#ffffff"; ctx.textAlign = "left";
    ctx.fillText(mmss(segs), b.x + pad * 0.8, b.y + 72 * k);
    rotulo(ctx, "meta 05:00", b.x + b.w - pad * 0.8, b.y + 27 * k, k, COR.cianoClaro, "right");
    const bx = b.x + pad * 0.8, by = b.y + b.h - 18 * k, bw = b.w - pad * 1.6;
    rr(ctx, bx, by, bw, 6 * k, 3 * k); ctx.fillStyle = "rgba(160,190,255,.18)"; ctx.fill();
    rr(ctx, bx, by, bw * clamp(segs / 600), 6 * k, 3 * k); ctx.fillStyle = acima ? COR.alerta : COR.ciano; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.fillRect(bx + bw * 0.5 - 1, by - 5 * k, 2, 16 * k);
    ctx.restore();
    return { ...b, y: b.y + dy };
  }
  // mostrador
  const r = 62 * k, cx = b.x + pad + r + 4 * k, cy = b.y + b.h / 2;
  // marcas de cronômetro
  for (let i = 0; i < 60; i++) {
    const a = -Math.PI / 2 + (i / 60) * Math.PI * 2;
    const longa = i % 5 === 0;
    const r1 = r + 14 * k, r0 = r1 - (longa ? 8 : 4) * k;
    ctx.strokeStyle = longa ? "rgba(220,235,255,.55)" : "rgba(220,235,255,.22)"; ctx.lineWidth = longa ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke();
  }
  ctx.lineWidth = 10 * k; ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(160,190,255,.16)"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  const ini = -Math.PI / 2;
  const fracMeta = META_TROCA / 600;
  const frac = clamp(segs / 600);
  ctx.save();
  ctx.shadowColor = "rgba(38,185,218,.9)"; ctx.shadowBlur = 16 * k;
  ctx.strokeStyle = COR.ciano; ctx.beginPath(); ctx.arc(cx, cy, r, ini, ini + Math.PI * 2 * Math.min(frac, fracMeta)); ctx.stroke();
  if (frac > fracMeta) { ctx.shadowColor = "rgba(255,90,98,.95)"; ctx.strokeStyle = COR.alertaClaro; ctx.beginPath(); ctx.arc(cx, cy, r, ini + Math.PI * 2 * fracMeta, ini + Math.PI * 2 * frac); ctx.stroke(); }
  ctx.restore();
  // marca da meta
  const am = ini + Math.PI * 2 * fracMeta;
  ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2.5; ctx.lineCap = "butt";
  ctx.beginPath(); ctx.moveTo(cx + Math.cos(am) * (r - 12 * k), cy + Math.sin(am) * (r - 12 * k)); ctx.lineTo(cx + Math.cos(am) * (r + 12 * k), cy + Math.sin(am) * (r + 12 * k)); ctx.stroke();
  // ponteiro dos segundos, do centro até o arco
  const as = ini + ((segs % 60) / 60) * Math.PI * 2;
  ctx.strokeStyle = acima ? COR.alertaClaro : "rgba(255,255,255,.9)"; ctx.lineWidth = 2; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(cx - Math.cos(as) * 10 * k, cy - Math.sin(as) * 10 * k); ctx.lineTo(cx + Math.cos(as) * (r - 16 * k), cy + Math.sin(as) * (r - 16 * k)); ctx.stroke();
  const ap = ini + Math.PI * 2 * frac;
  ctx.fillStyle = acima ? COR.alertaClaro : "#ffffff";
  ctx.beginPath(); ctx.arc(cx + Math.cos(ap) * r, cy + Math.sin(ap) * r, 6.5 * k, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(cx, cy, 4.5 * k, 0, Math.PI * 2); ctx.fill();
  // textos
  const tx = cx + r + 34 * k;
  rotulo(ctx, "Tempo de troca", tx, b.y + 50 * k, k * 1.25, "#dbe6f7");
  ctx.save();
  ctx.font = `700 ${66 * k}px ${TIT}`; ctx.fillStyle = acima ? COR.alertaClaro : "#ffffff"; ctx.textAlign = "left";
  ctx.shadowColor = acima ? "rgba(255,90,98,.55)" : "rgba(38,185,218,.45)"; ctx.shadowBlur = 22 * k;
  ctx.fillText(mmss(segs), tx, b.y + 120 * k);
  ctx.restore();
  if (acima) {
    rotulo(ctx, `+${mmss(segs - META_TROCA)} acima da meta de 05:00`, tx, b.y + 156 * k, k * 1.1, COR.alertaClaro);
  } else {
    rotulo(ctx, "meta 05:00", tx, b.y + 156 * k, k * 1.1, COR.cianoClaro);
  }
  ctx.restore();
  return { ...b, y: b.y + dy };
}

/* ---------------- slot real ---------------- */
const SLOT = 1076; // 17 min 56 s
const META_SLOT = 900;
function slotReal(q: Quadro, A: Arranjo, p: number, acima: Caixa | null) {
  const op = janela(p, 0.355, 0.745);
  if (op <= 0.01) return null;
  const { ctx } = q;
  const k = A.k;
  const b: Caixa = A.estreito
    ? { x: A.coluna.x, y: A.coluna.y, w: Math.min(214 * k, A.coluna.w - 236 * k - 10), h: 86 * k }
    : { x: A.coluna.x, y: (acima ? acima.y + acima.h : A.coluna.y) + 14 * k, w: A.coluna.w, h: 112 * k };
  const dy = (1 - saida(seg(p, 0.355, 0.385))) * 24 * k;
  cartao(ctx, b, k, op, dy);
  ctx.save(); ctx.globalAlpha = op; ctx.translate(0, dy);
  const pad = (A.estreito ? 14 : 18) * k;
  const v = SLOT * saida(seg(p, 0.37, 0.5));
  const passou = v > META_SLOT;
  rotulo(ctx, "Slot real", b.x + pad, b.y + (A.estreito ? 24 : 32) * k, k * (A.estreito ? 0.92 : 1));
  if (!A.estreito) rotulo(ctx, "meta 15 min", b.x + b.w - pad, b.y + 32 * k, k * 0.95, COR.rotulo, "right");
  ctx.font = `700 ${(A.estreito ? 22 : 30) * k}px ${TIT}`; ctx.fillStyle = passou ? COR.alertaClaro : "#ffffff"; ctx.textAlign = "left";
  ctx.fillText(minSeg(v), b.x + pad, b.y + (A.estreito ? 56 : 68) * k);
  // barra: 0 a 20 min, meta em 15
  const bx = b.x + pad, by = b.y + b.h - (A.estreito ? 14 : 22) * k, bw = b.w - pad * 2, bh = (A.estreito ? 4 : 8) * k;
  const esc = bw / 1200;
  rr(ctx, bx, by, bw, bh, bh / 2); ctx.fillStyle = "rgba(160,190,255,.14)"; ctx.fill();
  rr(ctx, bx, by, Math.min(v, META_SLOT) * esc, bh, bh / 2); ctx.fillStyle = COR.ciano; ctx.fill();
  if (passou) { rr(ctx, bx + META_SLOT * esc, by, (v - META_SLOT) * esc, bh, bh / 2); ctx.fillStyle = COR.alerta; ctx.fill(); }
  ctx.fillStyle = "#fff"; ctx.fillRect(bx + META_SLOT * esc - 1, by - 5 * k, 2, bh + 10 * k);
  if (!A.estreito && passou) rotulo(ctx, `+${minSeg(v - META_SLOT)}`, b.x + b.w - pad, b.y + 68 * k, k * 0.95, COR.alertaClaro, "right");
  ctx.restore();
  return b;
}

/* ---------------- agenda: planejado x real ---------------- */
const DIA = 720;
function agenda(q: Quadro, A: Arranjo, p: number, acima: Caixa | null) {
  const op = janela(p, 0.375, 0.578);
  if (op <= 0.01) return;
  const { ctx } = q;
  const k = A.k;
  const b: Caixa = A.estreito
    ? { x: 12, y: q.area.y + q.area.h + 8, w: q.w - 24, h: 128 * k }
    : { x: A.coluna.x, y: (acima ? acima.y + acima.h : A.coluna.y) + 14 * k, w: A.coluna.w, h: 168 * k };
  const dy = (1 - saida(seg(p, 0.375, 0.405))) * 24 * k;
  cartao(ctx, b, k, op, dy);
  ctx.save(); ctx.globalAlpha = op; ctx.translate(0, dy);
  const pad = (A.estreito ? 14 : 18) * k;
  ctx.font = `600 ${14 * k}px ${TIT}`; ctx.fillStyle = "#ffffff"; ctx.textAlign = "left";
  ctx.fillText("Uma sala, das 07h às 19h", b.x + pad, b.y + pad + 12 * k);
  const x0 = b.x + pad, x1 = b.x + b.w - pad - 40 * k;
  const esc = (x1 - x0) / DIA;
  const linha = (y: number, slot: number, prog: number, rot: string, cor: string) => {
    rotulo(ctx, rot, x0, y - 7 * k, k * 0.9);
    const h = 12 * k;
    ctx.fillStyle = "rgba(160,190,255,.07)"; rr(ctx, x0, y, x1 - x0, h, 2 * k); ctx.fill();
    const ate = DIA * prog;
    let n = 0;
    for (let t = 0; t + slot <= DIA + 0.01; t += slot) {
      if (t >= ate) break;
      const fim = Math.min(t + slot, ate);
      ctx.fillStyle = cor;
      rr(ctx, x0 + t * esc + 0.6, y, Math.max(0.8, (fim - t) * esc - 1.2), h, 1.5 * k); ctx.fill();
      if (t + slot <= ate) n++;
    }
    ctx.font = `700 ${16 * k}px ${TIT}`; ctx.fillStyle = "#ffffff"; ctx.textAlign = "right";
    ctx.fillText(String(n), b.x + b.w - pad, y + h - 1 * k);
    ctx.textAlign = "left";
    return n;
  };
  const yA = b.y + (A.estreito ? 56 : 64) * k, yB = yA + (A.estreito ? 40 : 46) * k;
  const pr = saida(seg(p, 0.39, 0.5));
  linha(yA, 15, pr, "Planejado, slot de 15 min", "#c5d0ea");
  linha(yB, SLOT / 60, pr, "Real, slot de 17 min 56 s", "#ff8a8f");
  // exames que deixam de caber
  const g = suave(seg(p, 0.5, 0.52));
  if (g > 0) {
    ctx.globalAlpha = op * g;
    const ultimo = Math.floor(DIA / (SLOT / 60)) * (SLOT / 60);
    ctx.strokeStyle = COR.alertaClaro; ctx.setLineDash([3 * k, 3 * k]); ctx.lineWidth = 1.2;
    rr(ctx, x0 + ultimo * esc, yB - 2 * k, (DIA - ultimo) * esc, 16 * k, 2 * k); ctx.stroke();
    ctx.setLineDash([]);
    if (!A.estreito) rotulo(ctx, "Simulação ilustrativa com os valores do exemplo.", x0, b.y + b.h - 14 * k, k * 0.82);
  }
  ctx.restore();
}

/* ---------------- repetições ---------------- */
function repeticoes(q: Quadro, A: Arranjo, p: number, acima: Caixa | null) {
  const op = janela(p, 0.585, 0.745);
  if (op <= 0.01) return;
  const { ctx } = q;
  const k = A.k;
  const b: Caixa = A.estreito
    ? { x: 12, y: q.area.y + q.area.h + 8, w: q.w - 24, h: 110 * k }
    : { x: A.coluna.x, y: (acima ? acima.y + acima.h : A.coluna.y) + 14 * k, w: A.coluna.w, h: 140 * k };
  const dy = (1 - saida(seg(p, 0.585, 0.615))) * 24 * k;
  cartao(ctx, b, k, op, dy);
  ctx.save(); ctx.globalAlpha = op; ctx.translate(0, dy);
  const pad = (A.estreito ? 14 : 18) * k;
  rotulo(ctx, "Repetição de sequências", b.x + pad, b.y + 30 * k, k);
  const t = saida(seg(p, 0.6, 0.68));
  ctx.font = `700 ${30 * k}px ${TIT}`; ctx.fillStyle = COR.ambar; ctx.textAlign = "right";
  ctx.fillText(`${(7.8 * t).toFixed(1).replace(".", ",")}%`, b.x + b.w - pad, b.y + 36 * k);
  ctx.textAlign = "left";
  // 51 sequências, 4 refeitas
  const n = 51, cols = 17, refeitas = new Set([6, 19, 33, 44]);
  const gx = b.x + pad, gy = b.y + 52 * k, gw = b.w - pad * 2;
  const cel = gw / cols, lado = cel - 4 * k;
  const linhas = 3;
  const altCel = Math.min(cel, (b.h - 52 * k - pad) / linhas);
  for (let i = 0; i < n; i++) {
    const c = i % cols, l = Math.floor(i / cols);
    const ap = saida(clamp(t * 1.6 - i * 0.012));
    if (ap <= 0) continue;
    ctx.globalAlpha = op * ap;
    ctx.fillStyle = refeitas.has(i) ? COR.ambar : "rgba(143,230,247,.5)";
    rr(ctx, gx + c * cel, gy + l * altCel, lado, altCel - 4 * k, 2 * k); ctx.fill();
  }
  ctx.restore();
}

/* ---------------- painel montado a partir da RM ---------------- */
function conteudoPainel(ctx: CanvasRenderingContext2D, i: number, b: Caixa, t: number, k: number) {
  const pad = 14 * k;
  const rotulos = ["Realizado da meta", "Tempo de troca", "Slot real", "Repetição de sequências", "Taxa de ocupação", "Protocolos mais demorados"];
  ctx.fillStyle = COR.rotulo; ctx.font = `600 ${12.5 * k}px ${TXT}`; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
  ctx.fillText(rotulos[i], b.x + pad, b.y + pad + 10 * k);
  const cx = b.x + b.w / 2, cy = b.y + b.h * 0.6;
  if (i === 0) {
    const r = Math.min(b.w * 0.3, b.h * 0.34);
    ctx.lineWidth = 9 * k; ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(160,190,255,.18)"; ctx.beginPath(); ctx.arc(cx, cy + r * 0.3, r, Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.strokeStyle = COR.ambar; ctx.beginPath(); ctx.arc(cx, cy + r * 0.3, r, Math.PI, Math.PI + Math.PI * 0.72 * t); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = `700 ${22 * k}px ${TIT}`;
    ctx.fillText(`${Math.round(72 * t)}%`, cx, cy + r * 0.3);
  } else if (i === 1 || i === 2) {
    const v = i === 1 ? 420 * t : 1076 * t;
    ctx.fillStyle = COR.alertaClaro; ctx.font = `700 ${Math.min(28 * k, b.w * 0.13)}px ${TIT}`; ctx.textAlign = "left";
    ctx.fillText(minSeg(v), b.x + pad, cy + 4 * k);
    ctx.fillStyle = COR.rotulo; ctx.font = `600 ${12.5 * k}px ${TXT}`;
    ctx.fillText(i === 1 ? "meta 5 min" : "meta 15 min", b.x + pad, cy + 26 * k);
  } else if (i === 3) {
    ctx.fillStyle = COR.ambar; ctx.font = `700 ${28 * k}px ${TIT}`; ctx.textAlign = "left";
    ctx.fillText(`${(7.8 * t).toFixed(1).replace(".", ",")}%`, b.x + pad, cy + 4 * k);
    ctx.fillStyle = COR.rotulo; ctx.font = `600 ${12.5 * k}px ${TXT}`;
    ctx.fillText("no período", b.x + pad, cy + 26 * k);
  } else if (i === 4) {
    const r = Math.min(b.w, b.h) * 0.25;
    ctx.lineWidth = 10 * k; ctx.lineCap = "butt";
    ctx.strokeStyle = "rgba(224,72,79,.7)"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = COR.ok; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.617 * t); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = `700 ${17 * k}px ${TIT}`;
    ctx.fillText(`${(61.7 * t).toFixed(1).replace(".", ",")}%`, cx, cy + 6 * k);
  } else {
    const v = [0.95, 0.78, 0.66, 0.52];
    const cores = [COR.alerta, "#e8664a", COR.ambar, "#f2bc5a"];
    for (let j = 0; j < 4; j++) {
      const y = b.y + pad + 28 * k + j * (b.h - pad * 2 - 30 * k) / 4;
      const hh = Math.min(16 * k, (b.h - pad * 2 - 30 * k) / 4 - 6 * k);
      ctx.fillStyle = "rgba(160,190,255,.12)"; rr(ctx, b.x + pad, y, b.w - pad * 2, hh, 3 * k); ctx.fill();
      ctx.fillStyle = cores[j]; rr(ctx, b.x + pad, y, (b.w - pad * 2) * v[j] * saida(clamp(t * 1.3 - j * 0.08)), hh, 3 * k); ctx.fill();
    }
  }
  ctx.textAlign = "left";
}

function painel(q: Quadro, A: Arranjo, p: number, sai = 0) {
  const { ctx } = q;
  const veu = suave(seg(p, 0.742, 0.775)) * (1 - sai);
  if (veu <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = 1 - sai;
  ctx.fillStyle = `rgba(8,14,38,${0.88 * veu})`; ctx.fillRect(0, 0, q.w, q.h);
  const k = A.estreito ? A.k * 0.9 : A.k;
  const area: Caixa = A.estreito
    ? { x: 12, y: q.area.y + 10, w: q.w - 24, h: Math.min(q.h * 0.62, q.area.h + 150) }
    : (() => {
      const esquerda = Math.max(Math.min(56, Math.max(20, q.w * 0.045)), (q.w - 1200) / 2);
      const x = Math.max(q.w * 0.47, esquerda + (q.w < 1200 ? 440 : 500) + 28);
      return { x, y: q.h * 0.06, w: q.w * 0.95 - x, h: q.h * 0.86 };
    })();
  const cols = A.estreito ? 2 : 3, rows = A.estreito ? 3 : 2;
  const g = Math.max(8, area.w * 0.018);
  const cw = (area.w - g * (cols - 1)) / cols, ch = (area.h - g * (rows - 1)) / rows;
  const [sx, sy] = q.conv(0.7, 0.42);
  const brilho = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200 * k);
  brilho.addColorStop(0, `rgba(38,185,218,${0.3 * veu})`); brilho.addColorStop(1, "rgba(38,185,218,0)");
  ctx.fillStyle = brilho; ctx.fillRect(sx - 220 * k, sy - 220 * k, 440 * k, 440 * k);
  for (let i = 0; i < 6; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const fx = area.x + col * (cw + g), fy = area.y + row * (ch + g);
    const t = saida(seg(p, 0.758 + i * 0.008, 0.792 + i * 0.008));
    if (t <= 0.001) continue;
    const x = mix(sx, fx, t), y = mix(sy, fy, t), w = mix(0, cw, t), h = mix(0, ch, t);
    if (t < 1) {
      ctx.strokeStyle = `rgba(143,230,247,${0.5 * (1 - t)})`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(x + w / 2, y + h / 2); ctx.stroke();
    }
    ctx.save();
    ctx.globalAlpha = Math.min(1, t * 1.6);
    rr(ctx, x, y, w, h, 10 * k); ctx.fillStyle = "#101a42"; ctx.fill();
    ctx.strokeStyle = "rgba(160,190,255,.24)"; ctx.lineWidth = 1; ctx.stroke();
    if (t > 0.98) conteudoPainel(ctx, i, { x: fx, y: fy, w: cw, h: ch }, saida(seg(p, 0.79 + i * 0.008, 0.86)), k);
    ctx.restore();
  }
  ctx.restore();
}

/* ---------------- desenho completo ---------------- */
/*
 * Linha do tempo da rolagem:
 * 0 a 0,07 topo | 0,07 a 0,42 troca no vídeo | 0,425 a 0,585 recepção cheia
 * 0,585 a 0,735 painel | 0,738 a 1 recepção esvaziando
 * As peças da troca foram desenhadas numa escala própria; "caminhada" converte.
 */
function caminhada(p: number) {
  if (p <= 0.07) return (p / 0.07) * 0.1;
  if (p <= 0.42) return 0.1 + ((p - 0.07) / 0.35) * 0.645;
  return 0.745 + (p - 0.42);
}
function tempoPainel(p: number) {
  return 0.742 + (p - 0.585) * (0.128 / 0.115);
}

export function criarCamadaTroca(fontes: { calma: string; pessoas: string }) {
  const recepcao = criarRecepcao(fontes);
  return (q: Quadro) => {
    const p = q.p;
    const A = arranjo(q);
    const pc = caminhada(p);
    const c1 = cronometro(q, A, pc);
    const c2 = slotReal(q, A, pc, A.estreito ? null : c1);
    agenda(q, A, pc, A.estreito ? null : c2);
    repeticoes(q, A, pc, A.estreito ? null : c2);
    recepcao(q, A.coluna, A.k, A.estreito);
    painel(q, A, tempoPainel(p), suave(seg(p, 0.71, 0.738)));
  };
}
