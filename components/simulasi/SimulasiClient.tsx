"use client";

import Image from "next/image";
import { OrbitGalaxySection } from "./OrbitGalaxySection";

export function SimulasiClient() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      <div className="fixed bottom-20 left-5 z-50 flex flex-col items-start gap-0">
        <div
          className="text-[12px] leading-[1.5] mb-2 max-w-[180px]"
          style={{
            background: "rgba(10,14,26,0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 16,
            padding: "10px 14px",
            color: "#f1f5f9",
          }}
        >
          Klik planet untuk melihat rasi bintang UKM-nya! ✨
        </div>
        <Image
          src="/assets/mascot-gilang.png"
          alt="Gilang"
          width={110}
          height={110}
          style={{
            height: 110,
            width: "auto",
            filter: "drop-shadow(0 0 12px rgba(59,130,246,0.3))",
          }}
        />
      </div>

      <OrbitGalaxySection className="min-h-screen flex items-center justify-center" sectionPadding="32px 24px 88px" />
    </div>
  );
}
