"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/translate";

const infos = [
  ["📅", "Tanggal", "Date", "15–17 Agustus 2026", "August 15–17, 2026"],
  ["📍", "Lokasi", "Location", "Lapangan Grha Sabha Pramana, UGM", "Grha Sabha Pramana Field, UGM"],
  ["🌌", "Tema", "Theme", "Galaxy: Orbit Pilihanmu", "Galaxy: Your Chosen Orbit"],
];

export function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section
      style={{
        padding: "80px clamp(24px,5vw,80px)",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a2340,#1e2a4a)",
          border: "1px solid rgba(245,200,66,0.15)",
          borderRadius: 24,
          padding: "clamp(32px,5vw,60px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent)",
          }}
        />

        <div className="relative z-[1]">
          <div className="chip mb-4">{tr(lang, "TENTANG GELEX", "ABOUT GELEX")}</div>
          <h2
            className="font-orbitron font-extrabold leading-[1.2] mb-5"
            style={{ fontSize: "clamp(20px,3vw,32px)", letterSpacing: "0.06em" }}
          >
            {tr(lang, "MISI GALAKSI 2026", "GALAXY MISSION 2026")}
          </h2>
          <p
            className="text-[15px] leading-[1.7] mb-7"
            style={{ color: "#94a3b8" }}
          >
            {lang === "id"
              ? "GELEX adalah pameran tahunan UKM Universitas Gadjah Mada. Tahun ini kami hadir lebih interaktif, lebih imersif, dan lebih seru dari sebelumnya. Temukan komunitas yang cocok, orbit pilihanmu, dan mulailah petualangan baru sebagai mahasiswa UGM."
              : "GELEX is the annual student organization expo of Universitas Gadjah Mada. This year, we are more interactive, more immersive, and more exciting than ever. Find the community that fits you, discover your orbit, and begin a new adventure as a UGM student."}
          </p>
          <Link href="/ukmatch">
            <button className="btn-primary">
              {tr(lang, "✦ Mulai Sekarang", "✦ Start Now")}
            </button>
          </Link>
        </div>

        <div className="relative z-[1] flex flex-col gap-4">
          {infos.map(([icon, idLabel, enLabel, idVal, enVal]) => (
            <div
              key={idLabel}
              className="flex items-center gap-3.5"
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                background: "rgba(10,14,26,0.4)",
                border: "1px solid rgba(241,245,249,0.06)",
              }}
            >
              <span className="text-[22px]">{icon}</span>
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.1em] mb-0.5"
                  style={{ color: "#64748b" }}
                >
                  {lang === "id" ? idLabel : enLabel}
                </div>
                <div className="text-[14px] font-bold" style={{ color: "#f1f5f9" }}>
                  {lang === "id" ? idVal : enVal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
