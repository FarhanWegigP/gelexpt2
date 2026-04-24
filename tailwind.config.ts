import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#0a0e1a",
        "bg-surface": "#0f1525",
        "bg-card": "#1a2340",
        "bg-card-alt": "#1e2a4a",
        gold: "#f5c842",
        "gold-light": "#fdd677",
        "gold-dark": "#ffb839",
        "gold-muted": "#c9952a",
        "nebula-purple": "#7c3aed",
        "nebula-violet": "#a855f7",
        "nebula-blue": "#3b82f6",
        "nebula-cyan": "#06b6d4",
        "nebula-pink": "#ec4899",
        "nebula-green": "#10b981",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, #fdd677 0%, #f5c842 50%, #ffb839 100%)",
        "gradient-card":
          "linear-gradient(135deg, #1a2340 0%, #1e2a4a 100%)",
        "gradient-nebula":
          "linear-gradient(135deg, #1a0a2e 0%, #0a0e1a 50%, #0a1a2e 100%)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbitSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        rocketRight: {
          from: { left: "-60px", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          to: { left: "110%", opacity: "0" },
        },
        rocketLeft: {
          from: { right: "-60px", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          to: { right: "110%", opacity: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        progressFill: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        pulseMini: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245,200,66,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(245,200,66,0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 400ms cubic-bezier(0.16,1,0.3,1) both",
        float: "float 4s ease-in-out infinite",
        orbitSpin: "orbitSpin 20s linear infinite",
        pulseDot: "pulseDot 1.5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        spin: "spin 8s linear infinite",
        pulseMini: "pulseMini 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
