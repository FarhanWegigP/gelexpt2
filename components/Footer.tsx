"use client";
import Link from "next/link";
import { GelexLogo } from "./GelexLogo";
import { useLanguage } from "./LanguageProvider";
import { tr } from "@/lib/translate";

const links = [
  { href: "/ukmatch", id: "UKMatch", en: "UKMatch" },
  { href: "/simulasi", id: "Simulasi", en: "Simulation" },
  { href: "/bilikfoto", id: "Bilik Foto", en: "Photo Booth" },
  { href: "/anthem", id: "Anthem", en: "Anthem" },
];

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(245,200,66,0.08)",
        padding: "32px clamp(24px,5vw,80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div className="flex items-center gap-2.5">
        <GelexLogo height={26} className="opacity-70" />
        <div>
          <div
            className="font-orbitron text-[11px] font-black tracking-[0.15em]"
            style={{ color: "#f5c842" }}
          >
            GELEX 2026
          </div>
          <div className="text-[11px]" style={{ color: "#64748b" }}>
            Gelanggang Expo UGM · Universitas Gadjah Mada
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 no-underline"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5c842")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
          >
            {tr(lang, l.id, l.en)}
          </Link>
        ))}
      </div>

      <div className="text-[11px]" style={{ color: "#64748b" }}>
        © 2026 GELEX UGM
      </div>
    </footer>
  );
}
