"use client";
import { useState, useEffect } from "react";
import { GelexLogo } from "./GelexLogo";
import Link from "next/link";
import { sharedAudioRef } from "@/lib/audioRef";
import { useLanguage } from "./LanguageProvider";
import { tr } from "@/lib/translate";

export function MiniPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const audio = sharedAudioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const toggle = () => {
    const audio = sharedAudioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {expanded ? (
        <div
          style={{
            background: "rgba(10,14,26,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(245,200,66,0.25)",
            borderRadius: 20,
            padding: "20px 22px",
            width: 260,
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(245,200,66,0.1)",
          }}
        >
          <div className="flex justify-between items-center mb-3.5">
            <div className="flex items-center gap-2">
              <GelexLogo height={20} />
              <span
                className="font-orbitron text-[10px] font-black tracking-[0.15em]"
                style={{ color: "#f5c842" }}
              >
                ANTHEM
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#94a3b8] bg-transparent border-none cursor-pointer text-base"
            >
              ×
            </button>
          </div>

          <div className="text-[12px] mb-1" style={{ color: "#94a3b8" }}>
            Orbit Pilihanmu
          </div>
          <div className="text-[11px] mb-4" style={{ color: "#64748b" }}>
            GELEX 2026 Official Anthem
          </div>

          <div
            className="h-[3px] rounded-full mb-3.5 overflow-hidden"
            style={{ background: "rgba(241,245,249,0.1)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg,#7c3aed,#f5c842)",
                width: `${progress}%`,
                transition: "width 250ms linear",
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={toggle}
              className="flex items-center justify-center text-base"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#fdd677,#f5c842)",
                border: "none",
                cursor: "pointer",
                color: "#0a0e1a",
                boxShadow: "0 0 16px rgba(245,200,66,0.4)",
              }}
            >
              {playing ? "⏸" : "▶"}
            </button>
            <Link
              href="/anthem"
              onClick={() => setExpanded(false)}
              className="text-[11px] font-bold no-underline"
              style={{
                color: "#f5c842",
                background: "none",
                border: "1px solid rgba(245,200,66,0.3)",
                borderRadius: 8,
                padding: "5px 10px",
                fontFamily: "var(--font-grotesk)",
              }}
            >
              {tr(lang, "Lihat Lirik →", "View Lyrics →")}
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          title={tr(lang, "Pemutar Anthem", "Anthem Player")}
          className="flex items-center justify-center text-xl cursor-pointer"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(10,14,26,0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(245,200,66,0.35)",
            color: "#f5c842",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.5), 0 0 16px rgba(245,200,66,0.15)",
            transition: "all 200ms",
            animation: playing ? "pulseMini 2s ease-in-out infinite" : "none",
          }}
        >
          {playing ? "⏸" : "♪"}
        </button>
      )}
    </div>
  );
}
