"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/translate";

const features = [
  {
    id: "ukmatch",
    icon: "♥",
    titleId: "UKMatch",
    titleEn: "UKMatch",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.2)",
    descId: "Jawab 8 pertanyaan kuis kepribadian. Sistem AI cocokkan kamu dengan UKM terbaik dari 39 UKM UGM.",
    descEn: "Answer 8 personality quiz questions. The AI system matches you with the best UKM from 39 UGM student organizations.",
  },
  {
    id: "gelexy",
    icon: "🌌",
    titleId: "Gelexy",
    titleEn: "Gelexy",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
    descId: "Dua pengalaman dalam satu: jelajahi simulasi orbit UKM interaktif & abadikan momen di bilik foto dengan filter UKM.",
    descEn: "Two experiences in one: explore the interactive UKM orbit simulation & capture memories in the UKM photo booth.",
  },
  {
    id: "anthem",
    icon: "♪",
    titleId: "Anthem",
    titleEn: "Anthem",
    color: "#10b981",
    glow: "rgba(16,185,129,0.2)",
    descId: "Dengarkan anthem GELEX 2026 dengan visualizer, lirik sinkron, dan toggle text-to-speech.",
    descEn: "Listen to the GELEX 2026 anthem with a visualizer, synced lyrics, and a text-to-speech toggle.",
  },
];

export function FeaturesSection() {
  const { lang } = useLanguage();

  return (
    <section
      style={{
        padding: "80px clamp(24px,5vw,80px)",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div className="text-center mb-14">
        <div className="chip mb-3.5">
          {tr(lang, "EKSPLORASI DIGITAL GELEX 2026", "GELEX 2026 DIGITAL EXPLORATION")}
        </div>
        <h2
          className="font-orbitron font-extrabold mb-4"
          style={{ fontSize: "clamp(22px,3.5vw,36px)", letterSpacing: "0.08em" }}
        >
          {tr(lang, "JELAJAHI SEBELUM HADIR", "EXPLORE BEFORE YOU ARRIVE")}
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "clamp(13px,1.5vw,16px)", maxWidth: 560, margin: "0 auto" }}>
          {lang === "id"
            ? "Kenali UKM-UKM UGM sebelum kamu datang langsung ke acara. Coba semua fitur interaktif di bawah ini — gratis, tanpa daftar."
            : "Get to know UGM student organizations before you arrive at the event. Try all the interactive features below — free, with no sign-up required."}
        </p>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}
      >
        {features.map((f) => (
          <Link key={f.id} href={`/${f.id}`} className="no-underline">
            <div
              className="card cursor-pointer relative overflow-hidden min-h-[180px] flex flex-col"
              style={{ minHeight: 200 }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: `radial-gradient(circle,${f.glow},transparent)`,
                }}
              />
              <div className="text-3xl mb-4" style={{ color: f.color }}>
                {f.icon}
              </div>
              <h3
                className="font-orbitron font-bold tracking-[0.1em] mb-2.5"
                style={{ fontSize: 13, color: "#f1f5f9" }}
              >
                {lang === "id" ? f.titleId : f.titleEn}
              </h3>
              <p className="text-[13px] leading-[1.65] flex-1" style={{ color: "#94a3b8" }}>
                {lang === "id" ? f.descId : f.descEn}
              </p>
              <div
                className="mt-4 text-[12px] font-bold tracking-[0.06em]"
                style={{ color: f.color }}
              >
                {tr(lang, "Jelajahi →", "Explore →")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
