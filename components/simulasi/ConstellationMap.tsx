"use client";

import { useMemo, useState } from "react";
import type { OrbitGroup, UKMEntry } from "./orbitData";

interface Props {
  group: OrbitGroup;
  onUKMClick: (ukm: UKMEntry) => void;
  onClose: () => void;
}

const POSITIONS = [
  { cx: 0.13, cy: 0.28 },
  { cx: 0.33, cy: 0.15 },
  { cx: 0.56, cy: 0.18 },
  { cx: 0.82, cy: 0.28 },
  { cx: 0.2, cy: 0.72 },
  { cx: 0.43, cy: 0.55 },
  { cx: 0.64, cy: 0.78 },
  { cx: 0.84, cy: 0.64 },
];

const W = 900;
const H = 480;

export function ConstellationMap({ group, onUKMClick, onClose }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const bgStars = useMemo(
    () =>
      Array.from({ length: 180 }, (_, index) => ({
        x: (index * 137.508) % 100,
        y: (index * 97.3) % 100,
        r: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center"
      style={{ background: "rgba(3,4,12,0.97)", padding: 20 }}
    >
      <button
        onClick={onClose}
        className="fixed z-[320]"
        style={{
          top: 84,
          left: 24,
          background: "rgba(10,14,26,0.96)",
          border: `1px solid ${group.color}88`,
          borderRadius: 999,
          padding: "12px 18px",
          color: "#f8fafc",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: `0 0 24px ${group.color}22`,
          cursor: "pointer",
        }}
      >
        {"< Back"}
      </button>

      <button
        onClick={onClose}
        className="fixed bg-transparent border-none text-[#94a3b8] text-2xl cursor-pointer z-[320]"
        style={{ top: 82, right: 24 }}
      >
        ✕
      </button>

      <div className="text-center mb-5 relative z-[2]">
        <div
          className="inline-flex items-center gap-2 font-orbitron text-[10px] font-bold tracking-[0.15em] uppercase mb-2.5 px-3.5 py-1 rounded"
          style={{
            background: `${group.color}18`,
            border: `1px solid ${group.color}30`,
            color: group.color,
          }}
        >
          {group.emoji} {group.name.toUpperCase()} - PETA RASI BINTANG
        </div>
        <p className="text-[12px]" style={{ color: "#64748b" }}>
          Hover untuk melihat - Klik untuk bermain
        </p>
      </div>

      <div className="relative flex-shrink-0" style={{ width: "min(900px,95vw)", height: "min(480px,65vh)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id={`bgNebula-${group.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={group.color} stopOpacity={0.04} />
              <stop offset="100%" stopColor={group.color} stopOpacity={0} />
            </radialGradient>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="starGlowHover">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx={W / 2} cy={H / 2} rx={W * 0.6} ry={H * 0.6} fill={`url(#bgNebula-${group.id})`} />

          {bgStars.map((star, index) => (
            <circle
              key={`bg-${index}`}
              cx={(star.x / 100) * W}
              cy={(star.y / 100) * H}
              r={star.r}
              fill="white"
              opacity={star.opacity}
            />
          ))}

          {group.ukms.map((ukm, ukmIndex) => {
            const pos = POSITIONS[ukmIndex] || POSITIONS[4];
            const cx = pos.cx * W;
            const cy = pos.cy * H;
            const scale = Math.min(W, H) * 0.1;
            const isHovered = hoveredIdx === ukmIndex;
            const starColor = isHovered ? "#fff" : group.color;
            const lineColor = isHovered ? `${group.color}cc` : `${group.color}55`;

            return (
              <g
                key={ukm.short}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIdx(ukmIndex)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onUKMClick(ukm)}
              >
                <circle cx={cx} cy={cy} r={scale * 1.2} fill={isHovered ? `${group.color}08` : "transparent"} />

                {ukm.links.map(([a, b], lineIndex) => {
                  const ax = cx + (ukm.stars[a].x / 50) * scale;
                  const ay = cy + (ukm.stars[a].y / 50) * scale;
                  const bx = cx + (ukm.stars[b].x / 50) * scale;
                  const by = cy + (ukm.stars[b].y / 50) * scale;
                  return (
                    <line
                      key={`l-${lineIndex}`}
                      x1={ax}
                      y1={ay}
                      x2={bx}
                      y2={by}
                      stroke={lineColor}
                      strokeWidth={isHovered ? 1.2 : 0.8}
                    />
                  );
                })}

                {ukm.stars.map((star, starIndex) => {
                  const sx = cx + (star.x / 50) * scale;
                  const sy = cy + (star.y / 50) * scale;
                  const r = starIndex === 0 ? (isHovered ? 5.5 : 4) : isHovered ? 3.5 : 2.5;
                  return (
                    <circle
                      key={`s-${starIndex}`}
                      cx={sx}
                      cy={sy}
                      r={r}
                      fill={starColor}
                      filter={isHovered ? "url(#starGlowHover)" : "url(#starGlow)"}
                    />
                  );
                })}

                <text
                  x={cx}
                  y={cy + scale * 1.4}
                  textAnchor="middle"
                  fill={isHovered ? "#fff" : "rgba(255,255,255,0.5)"}
                  fontSize={isHovered ? 12 : 10}
                  fontFamily="var(--font-grotesk), sans-serif"
                  fontWeight={isHovered ? 700 : 500}
                >
                  {ukm.short}
                </text>
                {isHovered && (
                  <text x={cx} y={cy - scale * 1.3} textAnchor="middle" fontSize={18}>
                    {ukm.emoji}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hoveredIdx !== null && (
          <div
            className="absolute -bottom-11 left-1/2 -translate-x-1/2 text-center whitespace-nowrap z-[3]"
            style={{
              background: "rgba(10,14,26,0.95)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${group.color}33`,
              borderRadius: 12,
              padding: "10px 20px",
            }}
          >
            <div className="text-[14px] font-bold mb-0.5" style={{ color: "#f1f5f9" }}>
              {group.ukms[hoveredIdx].name}
            </div>
            <div className="text-[12px]" style={{ color: "#64748b" }}>
              Klik untuk bermain mini game -&gt;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
