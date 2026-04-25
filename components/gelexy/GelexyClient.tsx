"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OrbitGalaxySection } from "@/components/simulasi/OrbitGalaxySection";
import { BilikFotoClient } from "@/components/bilikfoto/BilikFotoClient";

const STATES = {
  orbit: {
    src: "/assets/mascot-gilang.png",
    alt: "Gilang",
    msg: "Klik planet untuk melihat rasi bintang UKM-nya! ✨",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.3)",
  },
  foto: {
    src: "/assets/mascot-gantari.png",
    alt: "Gantari",
    msg: "Ayo foto bareng UKM favoritmu! 📸",
    border: "rgba(236,72,153,0.3)",
    glow: "rgba(236,72,153,0.3)",
  },
};

const JAM_DESC =
  '"Jika Aku Menjadi" adalah fitur interaktif yang mengajakmu untuk mencoba berbagai Unit Kegiatan Mahasiswa (UKM) secara virtual. Tampilan utama fitur ini berupa pusat tata surya dengan Gelex sebagai pusatnya, dikelilingi oleh 4 planet yang masing-masing mewakili empat Sekretariat Bersama (Sekber) di UGM. Setiap planet dapat diklik dan akan menampilkan berbagai UKM dalam bentuk ilustrasi rasi bintang 2D. Ketika logo suatu UKM diklik, pengguna akan diajak untuk "menjadi bagian" dari UKM tersebut dan mencoba langsung aktivitas khas yang biasa dilakukan di dalamnya. Fitur ini berfungsi sebagai pintu masuk untuk memahami keberagaman dunia organisasi di UGM, membangun rasa penasaran, serta menunjukkan bahwa setiap UKM memiliki energi dan cerita yang berbeda, namun tetap terikat dalam satu semangat kekeluargaan.';


export function GelexyClient() {
  const bilikRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"orbit" | "foto">("orbit");

  useEffect(() => {
    const el = bilikRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMode(entry.isIntersecting ? "foto" : "orbit"),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const state = STATES[mode];

  return (
    <div className="min-h-screen">
      {/* Single mascot, changes with scroll */}
      <div className="fixed bottom-20 left-5 z-50 flex flex-col items-start gap-0">
        <div
          className="text-[12px] leading-[1.5] mb-2 max-w-[180px] transition-all duration-500"
          style={{
            background: "rgba(10,14,26,0.9)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${state.border}`,
            borderRadius: 16,
            padding: "10px 14px",
            color: "#f1f5f9",
          }}
        >
          {state.msg}
        </div>
        <Image
          key={state.src}
          src={state.src}
          alt={state.alt}
          width={110}
          height={110}
          style={{
            height: 110,
            width: "auto",
            filter: `drop-shadow(0 0 12px ${state.glow})`,
          }}
        />
      </div>

      {/* Jika Aku Menjadi — orbit (3/4) + description (1/4) */}
      <div
        className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-screen relative overflow-hidden pt-20"
        style={{ gap: 0 }}
      >
        <div className="w-full lg:w-3/4 flex items-center justify-center">
          <OrbitGalaxySection
            className="w-full flex items-center justify-center"
            sectionPadding="32px 24px 88px"
            showLegend={false}
          />
        </div>

        <div
          className="w-full lg:w-1/4 flex items-center justify-center px-6 py-10 lg:py-0"
          style={{ minHeight: 200 }}
        >
          <div
            style={{
              background: "rgba(10,14,26,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(245,200,66,0.15)",
              borderRadius: 20,
              padding: "28px 24px",
              maxWidth: 340,
            }}
          >
            <div
              className="font-orbitron font-extrabold mb-4 tracking-[0.08em]"
              style={{ fontSize: 13, color: "#f5c842", letterSpacing: "0.12em" }}
            >
              JIKA AKU MENJADI
            </div>
            <p
              className="leading-[1.8] text-[13px]"
              style={{ color: "#cbd5e1" }}
            >
              {JAM_DESC}
            </p>
          </div>
        </div>
      </div>

      {/* Bilik Foto UKM */}
      <div ref={bilikRef}>
        <BilikFotoClient />
      </div>
    </div>
  );
}
