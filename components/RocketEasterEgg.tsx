"use client";
import { useState, useEffect } from "react";

interface Rocket {
  id: number;
  fromRight: boolean;
  y: number;
}

export function RocketEasterEgg() {
  const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    const spawn = () => {
      const id = Date.now();
      const fromRight = Math.random() < 0.5;
      const y = 80 + Math.random() * (window.innerHeight - 200);
      setRockets((r) => [...r, { id, fromRight, y }]);
      setTimeout(
        () => setRockets((r) => r.filter((x) => x.id !== id)),
        5000
      );
    };

    const first = setTimeout(spawn, 10000 + Math.random() * 8000);
    const interval = setInterval(() => {
      if (Math.random() < 0.4) spawn();
    }, 20000 + Math.random() * 20000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {rockets.map((r) => (
        <div
          key={r.id}
          className="absolute text-3xl"
          style={{
            top: r.y,
            left: r.fromRight ? undefined : "-60px",
            right: r.fromRight ? "-60px" : undefined,
            transform: r.fromRight ? "scaleX(-1)" : "scaleX(1)",
            animation: r.fromRight
              ? "rocketLeft 5s linear forwards"
              : "rocketRight 5s linear forwards",
            filter: "drop-shadow(0 0 8px rgba(245,200,66,0.8))",
          }}
        >
          🚀
        </div>
      ))}
    </div>
  );
}
