"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onBack: () => void;
}

const COURT_W = 560;
const COURT_H = 300;
const RALLY_LIMIT = 7;

export function VolleySpikeGame({ onBack }: Props) {
  const frameRef = useRef<number>(0);
  const lastRef = useRef(0);
  const rallyStartRef = useRef(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [rally, setRally] = useState(1);
  const [ballX, setBallX] = useState(132);
  const [ballY, setBallY] = useState(130);
  const [sweetSpot, setSweetSpot] = useState({ min: 0.48, max: 0.61 });
  const [message, setMessage] = useState("Tunggu toss dari setter");
  const [locked, setLocked] = useState(false);

  const spawnRally = (keepStarted = true) => {
    lastRef.current = 0;
    rallyStartRef.current = performance.now();
    const apex = 0.48 + Math.random() * 0.12;
    const width = 0.08 + Math.random() * 0.06;
    setSweetSpot({ min: apex - width / 2, max: apex + width / 2 });
    setBallX(148 + Math.random() * 20);
    setBallY(198);
    setLocked(false);
    setMessage(keepStarted ? "Setter mengirim bola..." : "Klik mulai untuk rally pertama");
  };

  useEffect(() => {
    spawnRally(false);
  }, []);

  useEffect(() => {
    if (!started || done) return;

    const loop = (ts: number) => {
      if (!lastRef.current) lastRef.current = ts;
      lastRef.current = ts;

      const elapsed = (performance.now() - rallyStartRef.current) / 1000;
      const duration = Math.max(1.3, 2 - rally * 0.08);
      const progress = Math.min(1, elapsed / duration);
      const horizontal = progress * (210 + rally * 9);
      const verticalArc = Math.sin(progress * Math.PI) * (108 + (rally % 3) * 12);

      setBallX(146 + horizontal);
      setBallY(206 - verticalArc);

      if (progress >= 1) {
        setLocked(true);
        setMessage("Miss! Bola jatuh.");
        window.setTimeout(() => {
          if (rally >= RALLY_LIMIT) {
            setStarted(false);
            setDone(true);
          } else {
            setRally((prev) => prev + 1);
            spawnRally();
          }
        }, 650);
        return;
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [done, rally, started]);

  const handleSpike = () => {
    if (done) return;
    if (!started) {
      setStarted(true);
      spawnRally();
      return;
    }
    if (locked) return;

    const elapsed = (performance.now() - rallyStartRef.current) / 1000;
    const duration = Math.max(1.3, 2 - rally * 0.08);
    const progress = Math.min(1, elapsed / duration);
    setLocked(true);

    const center = (sweetSpot.min + sweetSpot.max) / 2;
    const distance = Math.abs(progress - center);
    const shotScore = Math.max(0, 100 - Math.round(distance * 900));

    if (progress >= sweetSpot.min && progress <= sweetSpot.max) {
      setScore((prev) => prev + shotScore);
      setMessage(shotScore > 88 ? "Perfect spike!" : "Nice hit!");
    } else {
      setMessage("Timing meleset!");
    }

    window.setTimeout(() => {
      if (rally >= RALLY_LIMIT) {
        setStarted(false);
        setDone(true);
      } else {
        setRally((prev) => prev + 1);
        spawnRally();
      }
    }, 650);
  };

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    setStarted(false);
    setDone(false);
    setScore(0);
    setRally(1);
    spawnRally(false);
  };

  return (
    <div className="text-center">
      <div className="mb-3 flex items-center justify-between text-[11px] font-bold" style={{ color: "#94a3b8" }}>
        <span>Rally {Math.min(rally, RALLY_LIMIT)}/{RALLY_LIMIT}</span>
        <span>Skor {score}</span>
      </div>

      <div
        className="relative mx-auto mb-4 overflow-hidden rounded-3xl"
        style={{
          width: "100%",
          maxWidth: COURT_W,
          height: COURT_H,
          background: "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(2,132,199,0.16) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(245,200,66,0.14), 0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 82,
            background: "linear-gradient(180deg, rgba(14,116,144,0.24), rgba(14,116,144,0.78))",
          }}
        />
        <div className="absolute bottom-[68px] left-[212px] right-[154px] h-[3px] bg-[rgba(248,250,252,0.7)]" />
        <div className="absolute bottom-[70px] left-[306px] h-[96px] w-[2px] bg-[rgba(248,250,252,0.5)]" />

        <div className="absolute left-[92px] bottom-[68px] text-[48px]">🙋</div>
        <div className="absolute left-[174px] bottom-[68px] text-[48px]">🏐</div>

        <div
          className="absolute flex h-[28px] w-[28px] items-center justify-center rounded-full text-[18px]"
          style={{
            left: ballX,
            top: ballY,
            background: "linear-gradient(180deg, #f8fafc, #cbd5e1)",
            boxShadow: "0 0 14px rgba(248,250,252,0.3)",
          }}
        >
          •
        </div>

        {!started && !done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.42)] px-6">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              SPIKE TIMING
            </div>
            <p className="max-w-[360px] text-[12px] leading-[1.6]" style={{ color: "#e2e8f0" }}>
              Tunggu bola hasil set masuk ke timing emas, lalu klik untuk spike.
            </p>
          </div>
        )}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.55)]">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              MATCH POINT
            </div>
            <p className="text-[12px]" style={{ color: "#e2e8f0" }}>
              Total skor: {score}
            </p>
            <button className="btn-primary mt-2" onClick={reset}>
              Main Lagi
            </button>
          </div>
        )}
      </div>

      <div className="mb-2 text-[12px] font-semibold" style={{ color: "#f1f5f9" }}>
        {message}
      </div>
      <div className="mb-4 overflow-hidden rounded-full" style={{ height: 8, background: "rgba(148,163,184,0.16)" }}>
        <div
          style={{
            marginLeft: `${sweetSpot.min * 100}%`,
            width: `${(sweetSpot.max - sweetSpot.min) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f59e0b, #f5c842)",
          }}
        />
      </div>

      <div className="flex justify-center gap-3">
        <button className="btn-primary" onClick={handleSpike}>
          {started ? "Spike Sekarang" : "Mulai Rally"}
        </button>
        <button className="btn-secondary" onClick={onBack}>
          Kembali
        </button>
      </div>
    </div>
  );
}
