"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ORBIT_GROUPS, type OrbitGroup, type UKMEntry } from "./orbitData";
import { ConstellationMap } from "./ConstellationMap";
import { UKMModal } from "./UKMModal";

const ORBIT_RADII = [100, 160, 220, 285];

interface OrbitGalaxySectionProps {
  className?: string;
  sectionPadding?: string;
  showLegend?: boolean;
  chipLabel?: string;
  title?: string;
}

export function OrbitGalaxySection({
  className,
  sectionPadding = "64px 24px 88px",
  showLegend = true,
  chipLabel = "⊙ SIMULASI UKM",
  title = "ORBIT GALAKSI UKM",
}: OrbitGalaxySectionProps) {
  const [tick, setTick] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<OrbitGroup | null>(null);
  const [selectedUKM, setSelectedUKM] = useState<{ ukm: UKMEntry; group: OrbitGroup } | null>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.003;
      setTick((value) => value + 1);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const angles = ORBIT_RADII.map((_, index) =>
    timeRef.current * (0.8 - index * 0.15) + (index * Math.PI) / 2
  );

  return (
    <section className={className} style={{ padding: sectionPadding }}>
      <div className="flex flex-col items-center justify-center">
        <div className="chip mb-4 relative z-[2]">{chipLabel}</div>
        <h2
          className="font-orbitron font-extrabold text-center mb-8 relative z-[2]"
          style={{ fontSize: "clamp(16px,2.5vw,26px)", letterSpacing: "0.08em" }}
        >
          {title}
        </h2>

        <div className="relative" style={{ width: "min(580px,90vw)", height: "min(580px,90vw)" }}>
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full">
            {ORBIT_RADII.map((radius, index) => (
              <ellipse
                key={index}
                cx={300}
                cy={300}
                rx={radius}
                ry={radius * 0.45}
                fill="none"
                stroke={`rgba(245,200,66,${0.07 - index * 0.01})`}
                strokeWidth={1}
              />
            ))}
          </svg>

          <div
            className="absolute z-[3] flex items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "radial-gradient(circle,#fdd677,#f5c842,#ffb839)",
              boxShadow: "0 0 40px rgba(245,200,66,0.6),0 0 80px rgba(245,200,66,0.2)",
            }}
          >
            <Image
              src="/assets/logo-icon.svg"
              alt="GELEX"
              width={42}
              height={42}
              style={{ height: 42, width: "auto" }}
            />
          </div>

          {ORBIT_GROUPS.map((group, index) => {
            const radius = ORBIT_RADII[index];
            const angle = angles[index];
            const px = 300 + radius * Math.cos(angle);
            const sinA = Math.sin(angle);
            const py = 300 + radius * 0.45 * sinA;
            const size = 52 - index * 3;
            const isActive = selectedGroup?.id === group.id;
            const pctX = (px / 600) * 100;
            const pctY = (py / 600) * 100;
            const zIdx = sinA < 0 ? 2 : 4;
            const scaleDepth = sinA < 0 ? 0.82 + sinA * 0.12 : 1;

            return (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(isActive ? null : group)}
                className="absolute cursor-pointer"
                style={{
                  zIndex: zIdx,
                  left: `calc(${pctX}% - ${size / 2}px)`,
                  top: `calc(${pctY}% - ${size / 2}px)`,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  transform: `scale(${scaleDepth})`,
                  background: group.planetBg,
                  boxShadow: isActive
                    ? `0 0 30px ${group.color},0 0 60px ${group.color}66,inset -6px -6px 16px rgba(0,0,0,0.4)`
                    : group.planetShadow,
                  border: `2px solid ${isActive ? group.color : "transparent"}`,
                  transition: "box-shadow 300ms, border-color 300ms",
                }}
                title={group.name}
              >
                <div
                  className="absolute font-orbitron font-bold whitespace-nowrap"
                  style={{
                    top: "115%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 9,
                    color: group.color,
                    letterSpacing: "0.06em",
                    textShadow: `0 0 8px ${group.color}`,
                  }}
                >
                  {group.name}
                </div>
              </div>
            );
          })}
        </div>

        {showLegend && (
          <div className="flex gap-4 mt-10 flex-wrap justify-center">
            {ORBIT_GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(selectedGroup?.id === group.id ? null : group)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all duration-200"
                style={{
                  background: selectedGroup?.id === group.id ? `${group.color}20` : "rgba(26,35,64,0.8)",
                  border: `1px solid ${selectedGroup?.id === group.id ? group.color : "rgba(241,245,249,0.1)"}`,
                  color: selectedGroup?.id === group.id ? group.color : "#94a3b8",
                }}
              >
                <span>{group.emoji}</span>
                <span>{group.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedGroup && (
        <ConstellationMap
          group={selectedGroup}
          onUKMClick={(ukm) => setSelectedUKM({ ukm, group: selectedGroup })}
          onClose={() => setSelectedGroup(null)}
        />
      )}

      {selectedUKM && (
        <UKMModal
          ukm={selectedUKM.ukm}
          group={selectedUKM.group}
          onClose={() => setSelectedUKM(null)}
        />
      )}
    </section>
  );
}
