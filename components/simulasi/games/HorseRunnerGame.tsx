"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  onBack: () => void;
}

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
};

const TRACK_W = 560;
const TRACK_H = 300;
const GROUND_BASE = 58;
const RUNNER_X = 92;
const RUNNER_W = 156;
const RUNNER_H = 120;
const HORSE_IMAGE_SRC = "/assets/game-horse.png";

export function HorseRunnerGame({ onBack }: Props) {
  const frameRef = useRef<number>(0);
  const lastRef = useRef(0);
  const obstacleIdRef = useRef(0);
  const horseImgRef = useRef<HTMLImageElement | null>(null);
  const startedRef = useRef(false);
  const gameOverRef = useRef(false);
  const jumpingRef = useRef(false);
  const runnerYRef = useRef(0);
  const speedRef = useRef(300);
  const velocityRef = useRef(0);
  const spawnCooldownRef = useRef(0.9);
  const scoreAccRef = useRef(0);
  const obstaclesRef = useRef<Obstacle[]>([]);

  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [horseReady, setHorseReady] = useState(false);
  const [runnerY, setRunnerY] = useState(0);
  const [speed, setSpeed] = useState(300);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    lastRef.current = 0;
    obstacleIdRef.current = 0;
    runnerYRef.current = 0;
    speedRef.current = 300;
    velocityRef.current = 0;
    spawnCooldownRef.current = 0.9;
    scoreAccRef.current = 0;
    obstaclesRef.current = [];
    startedRef.current = false;
    gameOverRef.current = false;
    jumpingRef.current = false;
    setStarted(false);
    setGameOver(false);
    setScore(0);
    setJumping(false);
    setRunnerY(0);
    setSpeed(300);
    setObstacles([]);
  };

  const jump = () => {
    if (!startedRef.current || gameOverRef.current || jumpingRef.current) return;
    velocityRef.current = 760;
    jumpingRef.current = true;
    setJumping(true);
  };

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      horseImgRef.current = img;
      setHorseReady(true);
    };
    img.onerror = () => {
      horseImgRef.current = null;
      setHorseReady(false);
    };
    img.src = HORSE_IMAGE_SRC;
  }, []);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  const skyline = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: i * 50 + (i % 2) * 10,
        h: 32 + (i % 4) * 20,
      })),
    [],
  );

  useEffect(() => {
    if (!started || gameOver) return;

    const loop = (ts: number) => {
      if (!startedRef.current || gameOverRef.current) return;
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min(0.03, (ts - lastRef.current) / 1000);
      lastRef.current = ts;

      speedRef.current = Math.min(speedRef.current + dt * 18, 620);
      setSpeed(speedRef.current);

      runnerYRef.current += velocityRef.current * dt;
      velocityRef.current -= 1800 * dt;
      if (runnerYRef.current <= 0) {
        runnerYRef.current = 0;
        velocityRef.current = 0;
        if (jumpingRef.current) {
          jumpingRef.current = false;
          setJumping(false);
        }
      }
      setRunnerY(runnerYRef.current);

      spawnCooldownRef.current -= dt;
      if (spawnCooldownRef.current <= 0) {
        obstaclesRef.current = [
          ...obstaclesRef.current,
          {
            id: obstacleIdRef.current++,
            x: TRACK_W + 40,
            width: 24 + Math.random() * 34,
            height: 32 + Math.random() * 56,
          },
        ];
        spawnCooldownRef.current =
          Math.max(0.5, 1.16 - speedRef.current / 920) + Math.random() * 0.42;
      }

      obstaclesRef.current = obstaclesRef.current
        .map((obstacle) => ({ ...obstacle, x: obstacle.x - speedRef.current * dt }))
        .filter((obstacle) => obstacle.x + obstacle.width > -40);
      setObstacles(obstaclesRef.current);

      const runnerBox = {
        left: RUNNER_X + 24,
        right: RUNNER_X + RUNNER_W - 26,
        bottom: GROUND_BASE + runnerYRef.current + 6,
        top: GROUND_BASE + runnerYRef.current + RUNNER_H - 20,
      };

      const hit = obstaclesRef.current.some((obstacle) => {
        const obstacleBox = {
          left: obstacle.x,
          right: obstacle.x + obstacle.width,
          bottom: GROUND_BASE,
          top: GROUND_BASE + obstacle.height,
        };
        return (
          runnerBox.right > obstacleBox.left &&
          runnerBox.left < obstacleBox.right &&
          runnerBox.top > obstacleBox.bottom &&
          runnerBox.bottom < obstacleBox.top
        );
      });

      if (hit) {
        gameOverRef.current = true;
        startedRef.current = false;
        setGameOver(true);
        setStarted(false);
        cancelAnimationFrame(frameRef.current);
        return;
      }

      scoreAccRef.current += dt * (speedRef.current / 18);
      setScore(Math.floor(scoreAccRef.current));
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [gameOver, started]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      if (gameOverRef.current) {
        reset();
        return;
      }
      if (!startedRef.current) {
        setStarted(true);
        return;
      }
      jump();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="text-center">
      <div className="mb-3 flex items-center justify-between text-[11px] font-bold" style={{ color: "#94a3b8" }}>
        <span>Skor: {score}</span>
        <span>Kecepatan: {Math.round(speed)}</span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (gameOver) {
            reset();
            return;
          }
          if (!started) {
            setStarted(true);
            return;
          }
          jump();
        }}
        className="relative mx-auto mb-4 block overflow-hidden rounded-3xl border-none"
        style={{
          width: "100%",
          maxWidth: TRACK_W,
          height: TRACK_H,
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.98) 62%, rgba(120,53,15,0.95) 100%)",
          boxShadow: "inset 0 0 0 1px rgba(245,200,66,0.14), 0 20px 40px rgba(0,0,0,0.35)",
          cursor: "pointer",
        }}
      >
        <div className="absolute inset-0 opacity-30">
          {skyline.map((building, i) => (
            <div
              key={i}
              className="absolute rounded-t-md"
              style={{
                left: building.x,
                bottom: GROUND_BASE + 10,
                width: 32,
                height: building.h,
                background: "linear-gradient(180deg, rgba(148,163,184,0.25), rgba(15,23,42,0.08))",
              }}
            />
          ))}
        </div>

        <div
          className="absolute left-0 right-0"
          style={{
            bottom: GROUND_BASE - 10,
            height: 6,
            background: "linear-gradient(90deg, rgba(245,200,66,0.1), rgba(245,200,66,0.42), rgba(245,200,66,0.1))",
          }}
        />

        <div
          className="absolute"
          style={{
            left: RUNNER_X,
            bottom: GROUND_BASE + runnerY,
            width: RUNNER_W,
            height: RUNNER_H,
            transition: started ? "none" : "transform 220ms ease",
            transform: jumping ? "rotate(-4deg)" : "rotate(0deg)",
          }}
        >
          {horseReady && horseImgRef.current ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HORSE_IMAGE_SRC}
              alt="Kuda"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div
              className="absolute inset-x-0 bottom-0 flex items-end justify-center rounded-2xl"
              style={{
                height: 84,
                background: "linear-gradient(180deg, rgba(146,64,14,0.92), rgba(120,53,15,0.98))",
                clipPath:
                  "polygon(0 78%, 15% 44%, 28% 34%, 40% 10%, 56% 16%, 68% 34%, 88% 40%, 100% 70%, 100% 100%, 0 100%)",
              }}
            />
          )}
          <div
            className="absolute left-[26px] top-[8px] flex h-[38px] w-[38px] items-center justify-center rounded-full text-[18px] font-black"
            style={{ background: "rgba(59,130,246,0.18)", boxShadow: "0 0 20px rgba(59,130,246,0.2)" }}
          >
            G
          </div>
          <div
            className="absolute left-[48px] top-[38px] h-[18px] w-[18px] rounded-full"
            style={{ background: "#0f172a" }}
          />
        </div>

        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className="absolute rounded-t-xl"
            style={{
              left: obstacle.x,
              bottom: GROUND_BASE,
              width: obstacle.width,
              height: obstacle.height,
              background: "linear-gradient(180deg, rgba(248,113,113,0.85), rgba(153,27,27,0.98))",
              boxShadow: "0 0 12px rgba(239,68,68,0.3)",
            }}
          />
        ))}

        {!started && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.38)] px-6">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              GALLOP MODE
            </div>
            <p className="max-w-[340px] text-[12px] leading-[1.6]" style={{ color: "#e2e8f0" }}>
              Klik area game atau tekan spasi untuk mulai. Setelah itu, klik atau spasi untuk melompati rintangan.
            </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(2,6,23,0.58)]">
            <div className="font-orbitron text-[18px] font-black" style={{ color: "#f5c842" }}>
              FINISH GALLOP
            </div>
            <p className="text-[12px]" style={{ color: "#e2e8f0" }}>
              Skor akhir: {score}
            </p>
            <p className="text-[11px]" style={{ color: "#94a3b8" }}>
              Klik lagi atau tekan spasi untuk restart
            </p>
          </div>
        )}
      </button>

      <div className="mb-4 text-[11px] leading-[1.6]" style={{ color: "#64748b" }}>
        Tip: gambar kuda yang kamu upload sudah dibaca dari <code>/public/assets/game-horse.png</code>.
      </div>

      <button className="btn-secondary" onClick={onBack}>
        Kembali
      </button>
    </div>
  );
}
