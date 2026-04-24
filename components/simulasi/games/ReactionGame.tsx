"use client";
import { useState, useEffect, useRef } from "react";
import type { UKMEntry } from "../orbitData";

const EMOJI_MAP: Record<string, string> = {
  VOLI: "🏐",
  BASKET: "🏀",
  ESPORTS: "🎮",
};

interface Props {
  ukm: UKMEntry;
  onBack: () => void;
}

export function ReactionGame({ ukm, onBack }: Props) {
  const emoji = EMOJI_MAP[ukm.short] || "⚡";
  const [active, setActive] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const spawnRef = useRef<ReturnType<typeof setInterval>>();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const start = () => {
    setStarted(true);
    setScore(0);
    setTime(30);
    setDone(false);
    setActive(null);

    spawnRef.current = setInterval(() => {
      setActive(Math.floor(Math.random() * 12));
      setTimeout(() => setActive(null), 1100);
    }, 1400);

    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(spawnRef.current);
          clearInterval(timerRef.current);
          setDone(true);
          setStarted(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(spawnRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  if (!started && !done) {
    return (
      <div className="text-center py-2">
        <div className="text-[40px] mb-2">{emoji}</div>
        <p className="text-[13px] mb-2" style={{ color: "#94a3b8" }}>
          Ketuk item yang muncul secepat mungkin!
        </p>
        <p className="text-[11px] mb-4" style={{ color: "#64748b" }}>
          30 detik · Klik secepat mungkin
        </p>
        <div className="flex gap-2.5 justify-center">
          <button className="btn-primary" onClick={start}>
            ▶ Mulai
          </button>
          <button className="btn-secondary" onClick={onBack}>
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center py-2">
        <div className="text-[40px] mb-2">
          {score >= 20 ? "🏆" : score >= 12 ? "🥈" : "🥉"}
        </div>
        <div
          className="font-orbitron text-[20px] font-black mb-1.5"
          style={{ color: "#f5c842" }}
        >
          {score} pts
        </div>
        <p className="mb-5" style={{ color: "#94a3b8" }}>
          {score >= 20 ? "Luar biasa!" : score >= 12 ? "Bagus!" : "Coba lagi!"}
        </p>
        <div className="flex gap-2.5 justify-center">
          <button className="btn-secondary" onClick={start}>
            ↺ Ulangi
          </button>
          <button className="btn-primary" onClick={onBack}>
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-2.5">
        <div
          className="font-orbitron text-[16px] font-black"
          style={{ color: "#f5c842" }}
        >
          {score} pts
        </div>
        <div
          className="font-orbitron text-[16px]"
          style={{ color: time <= 10 ? "#ef4444" : "#f1f5f9" }}
        >
          {time}s
        </div>
      </div>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === active) {
                setScore((s) => s + 1);
                setActive(null);
              }
            }}
            className="flex items-center justify-center text-[22px] rounded-xl border-none cursor-pointer"
            style={{
              aspectRatio: "1",
              background:
                active === i
                  ? "rgba(249,115,22,0.85)"
                  : "rgba(26,35,64,0.8)",
              transition: "all 100ms",
              transform: active === i ? "scale(1.12)" : "scale(1)",
              boxShadow:
                active === i ? "0 0 18px rgba(249,115,22,0.7)" : "none",
            }}
          >
            {active === i ? emoji : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
