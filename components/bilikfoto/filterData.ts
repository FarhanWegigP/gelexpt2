export interface FilterDef {
  id: string;
  name: string;
  emoji: string;
  color: string;
  overlay: string;
  label: string;
  graphicSrc?: string;
  graphicHint?: string;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
}

export const FILTERS: FilterDef[] = [
  {
    id: "basket",
    name: "Basket",
    emoji: "🏀",
    color: "#f97316",
    overlay: "rgba(249,115,22,0.18)",
    label: "UKM Basket",
    graphicSrc: "/filters/basket-overlay.png",
    graphicHint: "public/filters/basket-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.8);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(249,115,22,0.35)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${Math.floor(w * 0.06)}px serif`;
      ctx.fillText("🏀", w * 0.04, h * 0.09);
      ctx.fillText("🏀", w * 0.88, h * 0.09);

      ctx.fillStyle = "rgba(249,115,22,0.65)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM BASKET - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "berkuda",
    name: "Berkuda",
    emoji: "🐎",
    color: "#8b5cf6",
    overlay: "rgba(139,92,246,0.15)",
    label: "UKM Berkuda",
    graphicSrc: "/filters/berkuda-overlay.png",
    graphicHint: "public/filters/berkuda-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(139,92,246,0.4)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${Math.floor(w * 0.065)}px serif`;
      ctx.fillText("🐎", w * 0.03, h * 0.1);
      ctx.fillText("🐎", w * 0.86, h * 0.1);
      ctx.fillStyle = "rgba(139,92,246,0.7)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM BERKUDA - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "seni",
    name: "Seni",
    emoji: "🎨",
    color: "#ec4899",
    overlay: "rgba(236,72,153,0.15)",
    label: "UKM Seni",
    graphicSrc: "/filters/seni-overlay.png",
    graphicHint: "public/filters/seni-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w / 2, h / 2, h * 0.85);
      grad.addColorStop(0, "rgba(236,72,153,0.12)");
      grad.addColorStop(0.5, "rgba(168,85,247,0.08)");
      grad.addColorStop(1, "rgba(236,72,153,0.3)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${Math.floor(w * 0.06)}px serif`;
      ctx.fillText("🎨", w * 0.04, h * 0.09);
      ctx.fillText("✨", w * 0.87, h * 0.09);
      ctx.fillStyle = "rgba(236,72,153,0.65)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM SENI - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "rohani",
    name: "Rohani",
    emoji: "✨",
    color: "#f5c842",
    overlay: "rgba(245,200,66,0.12)",
    label: "UKM Rohani",
    graphicSrc: "/filters/rohani-overlay.png",
    graphicHint: "public/filters/rohani-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, h / 2, h);
      grad.addColorStop(0, "rgba(245,200,66,0.2)");
      grad.addColorStop(1, "rgba(245,200,66,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(245,200,66,0.7)";
      for (let i = 0; i < 18; i++) {
        const sx = (((i * 53.7) % 100) / 100) * w;
        const sy = (((i * 37.1) % 60) / 100) * h;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.font = `${Math.floor(w * 0.06)}px serif`;
      ctx.fillText("✨", w * 0.04, h * 0.09);
      ctx.fillText("🌙", w * 0.87, h * 0.09);
      ctx.fillStyle = "rgba(245,200,66,0.7)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#0a0e1a";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM ROHANI - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "voli",
    name: "Voli",
    emoji: "🏐",
    color: "#06b6d4",
    overlay: "rgba(6,182,212,0.15)",
    label: "UKM Voli",
    graphicSrc: "/filters/voli-overlay.png",
    graphicHint: "public/filters/voli-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.8);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(6,182,212,0.35)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${Math.floor(w * 0.06)}px serif`;
      ctx.fillText("🏐", w * 0.04, h * 0.09);
      ctx.fillText("🏐", w * 0.87, h * 0.09);
      ctx.fillStyle = "rgba(6,182,212,0.65)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM VOLI - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "alam",
    name: "Alam",
    emoji: "🌿",
    color: "#10b981",
    overlay: "rgba(16,185,129,0.15)",
    label: "UKM Alam",
    graphicSrc: "/filters/alam-overlay.png",
    graphicHint: "public/filters/alam-overlay.png",
    draw(ctx, w, h) {
      const grad = ctx.createRadialGradient(w * 0.5, h, 0, w / 2, h / 2, h * 0.9);
      grad.addColorStop(0, "rgba(16,185,129,0.25)");
      grad.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${Math.floor(w * 0.06)}px serif`;
      ctx.fillText("🌿", w * 0.04, h * 0.09);
      ctx.fillText("🏔️", w * 0.86, h * 0.09);
      ctx.fillStyle = "rgba(16,185,129,0.7)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM ALAM - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
];
