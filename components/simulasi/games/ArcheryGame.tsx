"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onBack: () => void;
}

const FIELD_W = 560;
const FIELD_H = 300;
const TARGET_X = 446;
const SHOT_LIMIT = 6;

export function ArcheryGame({ onBack }: Props) {
  const frameRef = useRef<number>(0);
  const lastRef = useRef(0);
  const holdStartedAtRef = useRef(0);
  const startedRef = useRef(false);
  const doneRef = useRef(false);
  const chargingRef = useRef(false);
  const targetYRef = useRef(FIELD_H / 2);
  const targetSpeedRef = useRef(1.4);

  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [charging, setCharging] = useState(false);
  const [power, setPower] = useState(0);
  const [shots, setShots] = useState(0);
  const [score, setScore] = useState(0);
  const [targetY, setTargetY] = useState(FIELD_H / 2);
  const [shotsView, setShotsView] = useState<{ x: number; y: number; score: number }[]>([]);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    doneRef.current = done;
  }, [done]);

  useEffect(() => {
    chargingRef.current = charging;
  }, [charging]);

  useEffect(() => {
    if (!started || done) return;

    const loop = (ts: number) => {
      if (!startedRef.current || doneRef.current) return;
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min(0.03, (ts - lastRef.current) / 1000);
      lastRef.current = ts;

      let nextTargetY = targetYRef.current + targetSpeedRef.current * 150 * dt;
      if (nextTargetY >= 232) {
        nextTargetY = 232;
        targetSpeedRef.current = -Math.abs(targetSpeedRef.current) - 0.02;
      }
      if (nextTargetY <= 72) {
        nextTargetY = 72;
        targetSpeedRef.current = Math.abs(targetSpeedRef.current) + 0.02;
      }
      targetYRef.current = nextTargetY;
      setTargetY(nextTargetY);

      if (chargingRef.current) {
        const elapsed = (performance.now() - holdStartedAtRef.current) / 1000;
        setPower(((Math.sin(elapsed * 3.4) + 1) / 2) * 100);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [done, started]);

  const startCharge = () => {
    if (doneRef.current) return;
    if (!startedRef.current) {
      setStarted(true);
    }
    if (chargingRef.current) return;
    holdStartedAtRef.current = performance.now();
    setCharging(true);
  };

  const release = () => {
    if (!chargingRef.current || doneRef.current) return;
    chargingRef.current = false;
    setCharging(false);

    const aimY = 238 - power * 1.55;
    const distance = Math.abs(targetYRef.current - aimY);
    const shotScore = Math.max(0, 100 - Math.round(distance * 1.15));

    setScore((prev) => prev + shotScore);
    setShots((prev) => {
      const next = prev + 1;
      if (next >= SHOT_LIMIT) {
        setDone(true);
      }
      return next;
    });
    setShotsView((prev) => [...prev.slice(-4), { x: TARGET_X - 22, y: aimY, score: shotScore }]);
    setPower(0);
  };

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    lastRef.current = 0;
    holdStartedAtRef.current = 0;
    targetYRef.current = FIELD_H / 2;
    targetSpeedRef.current = 1.4;
    startedRef.current = false;
    doneRef.current = false;
    chargingRef.current = false;
    setStarted(false);
    setDone(false);
    setCharging(false);
    setPower(0);
    setShots(0);
    setScore(0);
    setTargetY(FIELD_H / 2);
    setShotsView([]);
  };

  return (
    <div className="text-center">
      <div className="mb-3 flex items-center justify-between text-[11px] font-bold" style={{ color: "#94a3b8" }}>
        <span>Shot {shots}/{SHOT_LIMIT}</span>
        <span>Total {score}</span>
      </div>

      <div
        className="relative mx-auto mb-4 overflow-hidden rounded-3xl"
        style={{
          width: "100%",
          maxWidth: FIELD_W,
          height: FIELD_H,
          background: "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(12,74,110,0.22) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(245,200,66,0.14), 0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 72,
            background: "linear-gradient(180deg, rgba(20,83,45,0.3), rgba(20,83,45,0.86))",
          }}
        />

        <div className="absolute left-[42px] top-[126px] text-[58px]">🏹</div>

        <div
          className="absolute"
          style={{
            left: TARGET_X,
            top: targetY - 38,
            width: 78,
            height: 78,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(248,250,252,0.95) 0 16%, rgba(239,68,68,0.95) 16% 34%, rgba(248,250,252,0.95) 34% 52%, rgba(249,115,22,0.95) 52% 72%, rgba(30,41,59,1) 72% 100%)",
            boxShadow: "0 0 20px rgba(249,115,22,0.25)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: TARGET_X + 35,
            top: 28,
            width: 8,
            height: FIELD_H - 8,
            background: "rgba(148,163,184,0.28)",
          }}
        />

        {shotsView.map((shot, index) => (
          <div
            key={`${shot.y}-${index}`}
            className="absolute"
            style={{ left: shot.x, top: shot.y - 2 }}
          >
            <div className="h-[4px] w-[74px] rounded-full" style={{ background: "linear-gradient(90deg, #f8fafc, #f59e0b)" }} />
            <div className="mt-1 text-[10px] font-bold" style={{ color: "#f5c842" }}>
              +{shot.score}
            </div>
          </div>
        ))}

        {!started && !done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.42)] px-6">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              AIM AND RELEASE
            </div>
            <p className="max-w-[360px] text-[12px] leading-[1.6]" style={{ color: "#e2e8f0" }}>
              Tahan tombol untuk menarik busur. Lepas saat target berada di jalur panahmu.
            </p>
          </div>
        )}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.55)]">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              RANGE COMPLETE
            </div>
            <p className="text-[12px]" style={{ color: "#e2e8f0" }}>
              Total skor: {score}
            </p>
            <button className="btn-primary mt-2" onClick={reset}>
              Ulangi Latihan
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-center gap-3">
        <button
          className="btn-primary"
          onMouseDown={startCharge}
          onMouseUp={release}
          onMouseLeave={() => charging && release()}
          onTouchStart={(e) => {
            e.preventDefault();
            startCharge();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            release();
          }}
        >
          {charging ? `Lepas (${Math.round(power)})` : "Tarik Busur"}
        </button>
        <button className="btn-secondary" onClick={onBack}>
          Kembali
        </button>
      </div>

      <div className="mx-auto max-w-[420px] overflow-hidden rounded-full" style={{ height: 8, background: "rgba(148,163,184,0.16)" }}>
        <div
          style={{
            width: `${power}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f59e0b, #f5c842)",
            transition: charging ? "none" : "width 120ms ease",
          }}
        />
      </div>
    </div>
  );
}
