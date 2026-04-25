"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SimulasiClient } from "@/components/simulasi/SimulasiClient";
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

      <SimulasiClient />

      <div ref={bilikRef}>
        <BilikFotoClient />
      </div>
    </div>
  );
}
