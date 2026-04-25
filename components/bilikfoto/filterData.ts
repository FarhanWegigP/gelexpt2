export interface SekberDef {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  desc: string;
}

export const SEKBER: SekberDef[] = [
  { id: "rohani",   name: "Rohani",   emoji: "☮️",  color: "#22c55e", glow: "rgba(34,197,94,0.25)",    desc: "Spiritualitas & Nilai" },
  { id: "olahraga", name: "Olahraga", emoji: "🏐",  color: "#ef4444", glow: "rgba(239,68,68,0.25)",     desc: "Atletik & Kompetisi" },
  { id: "seni",     name: "Seni",     emoji: "🎨",  color: "#7c3aed", glow: "rgba(124,58,237,0.25)",    desc: "Kreasi & Ekspresi" },
  { id: "khusus",   name: "Khusus",   emoji: "🔬",  color: "#1e40af", glow: "rgba(30,64,175,0.25)",     desc: "Minat & Kepemimpinan" },
];

export interface FilterDef {
  id: string;
  sekber: string;
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
  // ── ROHANI ────────────────────────────────────────────
  {
    id: "rohani",
    sekber: "rohani",
    name: "Rohani",
    emoji: "✨",
    color: "#f5c842",
    overlay: "rgba(245,200,66,0.12)",
    label: "UKM Rohani",
    graphicSrc: "/filters/rohani-overlay.png",
    graphicHint: "public/filters/rohani-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("✨", w * 0.04, h * 0.10);
      ctx.fillText("🌙", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(202,138,4,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#0a0e1a";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM ROHANI - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "js",
    sekber: "rohani",
    name: "Jamaah Shalahuddin",
    emoji: "🕌",
    color: "#16a34a",
    overlay: "rgba(22,163,74,0.12)",
    label: "Jamaah Shalahuddin",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🕌", w * 0.04, h * 0.10);
      ctx.fillText("☪️", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(21,128,61,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.042)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("JAMAAH SHALAHUDDIN - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },

  // ── OLAHRAGA ──────────────────────────────────────────
  {
    id: "basket",
    sekber: "olahraga",
    name: "Basket",
    emoji: "🏀",
    color: "#f97316",
    overlay: "rgba(249,115,22,0.18)",
    label: "UKM Basket",
    graphicSrc: "/filters/basket-overlay.png",
    graphicHint: "public/filters/basket-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🏀", w * 0.04, h * 0.10);
      ctx.fillText("🏀", w * 0.86, h * 0.10);
      ctx.fillStyle = "rgba(249,115,22,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM BASKET - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "voli",
    sekber: "olahraga",
    name: "Voli",
    emoji: "🏐",
    color: "#06b6d4",
    overlay: "rgba(6,182,212,0.15)",
    label: "UKM Voli",
    graphicSrc: "/filters/voli-overlay.png",
    graphicHint: "public/filters/voli-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🏐", w * 0.04, h * 0.10);
      ctx.fillText("🏐", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(8,145,178,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#cffafe";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM VOLI - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "panahan",
    sekber: "olahraga",
    name: "Panahan",
    emoji: "🏹",
    color: "#b45309",
    overlay: "rgba(180,83,9,0.15)",
    label: "UKM Panahan",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🏹", w * 0.04, h * 0.10);
      ctx.fillText("🎯", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(146,64,14,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fef3c7";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM PANAHAN - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },

  // ── SENI ──────────────────────────────────────────────
  {
    id: "gamaband",
    sekber: "seni",
    name: "Gamaband",
    emoji: "🎸",
    color: "#3b82f6",
    overlay: "rgba(59,130,246,0.15)",
    label: "UKM Gamaband",
    graphicSrc: "/filters/gamaband-overlay.png",
    graphicHint: "public/filters/gamaband-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🎸", w * 0.04, h * 0.10);
      ctx.fillText("🎵", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(37,99,235,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UKM GAMABAND - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "psm",
    sekber: "seni",
    name: "Paduan Suara",
    emoji: "🎵",
    color: "#ec4899",
    overlay: "rgba(236,72,153,0.15)",
    label: "PSM UGM",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🎵", w * 0.04, h * 0.10);
      ctx.fillText("🎤", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(190,24,93,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.floor(w * 0.042)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("PADUAN SUARA MAHASISWA - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "teater",
    sekber: "seni",
    name: "Teater UFO",
    emoji: "🎭",
    color: "#a855f7",
    overlay: "rgba(168,85,247,0.15)",
    label: "UFO Teater UGM",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🎭", w * 0.04, h * 0.10);
      ctx.fillText("🌟", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(126,34,206,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#f5d0fe";
      ctx.font = `bold ${Math.floor(w * 0.042)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("UFO TEATER UGM - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },

  // ── KHUSUS ────────────────────────────────────────────
  {
    id: "mapagama",
    sekber: "khusus",
    name: "Mapagama",
    emoji: "🏔️",
    color: "#0ea5e9",
    overlay: "rgba(14,165,233,0.15)",
    label: "Mapagama UGM",
    graphicSrc: "/filters/mapagama-overlay.png",
    graphicHint: "public/filters/mapagama-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("🏔️", w * 0.04, h * 0.10);
      ctx.fillText("⛺", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(7,89,133,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#bae6fd";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("MAPAGAMA - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "pramuka",
    sekber: "khusus",
    name: "Pramuka",
    emoji: "⚜️",
    color: "#84cc16",
    overlay: "rgba(132,204,22,0.15)",
    label: "Pramuka UGM",
    graphicSrc: "/filters/pramuka-overlay.png",
    graphicHint: "public/filters/pramuka-overlay.png",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("⚜️", w * 0.04, h * 0.10);
      ctx.fillText("🌿", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(63,98,18,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#d9f99d";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("PRAMUKA UGM - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
  {
    id: "kopma",
    sekber: "khusus",
    name: "KOPMA",
    emoji: "💼",
    color: "#f59e0b",
    overlay: "rgba(245,158,11,0.15)",
    label: "KOPMA UGM",
    draw(ctx, w, h) {
      ctx.font = `${Math.floor(w * 0.07)}px serif`;
      ctx.fillText("💼", w * 0.04, h * 0.10);
      ctx.fillText("📊", w * 0.85, h * 0.10);
      ctx.fillStyle = "rgba(180,83,9,0.9)";
      ctx.fillRect(0, h * 0.88, w, h * 0.12);
      ctx.fillStyle = "#fef3c7";
      ctx.font = `bold ${Math.floor(w * 0.045)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("KOPMA UGM - GELEX 2026", w / 2, h * 0.955);
      ctx.textAlign = "left";
    },
  },
];
