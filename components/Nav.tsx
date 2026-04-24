"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GelexLogo } from "./GelexLogo";
import { useLanguage } from "./LanguageProvider";
import { tr } from "@/lib/translate";

const links = [
  { href: "/", id: "Beranda", en: "Home" },
  { href: "/ukmatch", id: "UKMatch", en: "UKMatch" },
  { href: "/simulasi", id: "Simulasi UKM", en: "UKM Simulation" },
  { href: "/bilikfoto", id: "Bilik Foto", en: "Photo Booth" },
  { href: "/anthem", id: "Anthem", en: "Anthem" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between transition-all duration-300"
      style={{
        padding: "0 clamp(20px, 4vw, 48px)",
        background: scrolled ? "rgba(10,14,26,0.95)" : "rgba(10,14,26,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(245,200,66,0.15)"
          : "1px solid rgba(245,200,66,0.06)",
      }}
    >
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <GelexLogo height={34} />
        <span
          className="font-orbitron text-[15px] font-black tracking-[0.18em]"
          style={{
            background: "linear-gradient(135deg,#fdd677,#f5c842,#ffb839)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          GELEX
        </span>
      </Link>

      <div className="nav-desktop-links hidden md:flex gap-8 items-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[12px] font-bold tracking-[0.08em] uppercase transition-colors duration-200"
            style={{
              color: pathname === l.href ? "#f5c842" : "#94a3b8",
              textShadow:
                pathname === l.href
                  ? "0 0 12px rgba(245,200,66,0.5)"
                  : "none",
            }}
          >
            {tr(lang, l.id, l.en)}
          </Link>
        ))}
        <button
          onClick={toggleLang}
          className="rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] cursor-pointer"
          style={{
            background: "rgba(245,200,66,0.12)",
            color: "#f5c842",
            border: "1px solid rgba(245,200,66,0.25)",
          }}
          title={lang === "id" ? "Bahasa aktif: Indonesia" : "Active language: English"}
        >
          {lang.toUpperCase()}
        </button>
      </div>

      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-[#f1f5f9] text-xl bg-transparent border-none cursor-pointer"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menu"
      >
        {menuOpen ? "×" : "☰"}
      </button>

      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 md:hidden flex flex-col gap-1"
          style={{
            background: "rgba(10,14,26,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(245,200,66,0.1)",
            padding: "12px 24px 16px",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-bold tracking-wide"
              style={{
                color: pathname === l.href ? "#f5c842" : "#f1f5f9",
                borderBottom: "1px solid rgba(241,245,249,0.05)",
              }}
            >
              {tr(lang, l.id, l.en)}
            </Link>
          ))}
          <button
            onClick={toggleLang}
            className="mt-2 self-start rounded-full px-3 py-2 text-sm font-bold border-none cursor-pointer"
            style={{
              background: "rgba(245,200,66,0.12)",
              color: "#f5c842",
            }}
          >
            {lang === "id" ? "ID aktif" : "EN active"}
          </button>
        </div>
      )}
    </nav>
  );
}
