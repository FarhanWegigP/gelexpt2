"use client";

import { useState } from "react";
import type { UKMEntry, OrbitGroup } from "./orbitData";
import { QuizGame } from "./games/QuizGame";
import { ReactionGame } from "./games/ReactionGame";
import { HorseRunnerGame } from "./games/HorseRunnerGame";
import { ArcheryGame } from "./games/ArcheryGame";
import { VolleySpikeGame } from "./games/VolleySpikeGame";

interface Props {
  ukm: UKMEntry;
  group: OrbitGroup;
  onClose: () => void;
}

export function UKMModal({ ukm, group, onClose }: Props) {
  const [gameActive, setGameActive] = useState(false);

  const renderGame = () => {
    if (ukm.gameType === "quiz" && ukm.quizQuestions) {
      return <QuizGame questions={ukm.quizQuestions} onBack={() => setGameActive(false)} />;
    }
    if (ukm.gameType === "reaction") {
      return <ReactionGame ukm={ukm} onBack={() => setGameActive(false)} />;
    }
    if (ukm.gameType === "runner") {
      return <HorseRunnerGame onBack={() => setGameActive(false)} />;
    }
    if (ukm.gameType === "archery") {
      return <ArcheryGame onBack={() => setGameActive(false)} />;
    }
    if (ukm.gameType === "volley") {
      return <VolleySpikeGame onBack={() => setGameActive(false)} />;
    }

    return (
      <div className="py-5 text-center">
        <div className="mb-3 font-orbitron text-[28px] font-black" style={{ color: "#f5c842" }}>
          GAME
        </div>
        <div className="mb-2 font-orbitron text-[16px] font-black" style={{ color: "#f5c842" }}>
          GAME BELUM DIBUAT
        </div>
        <p className="mb-5 text-[13px]" style={{ color: "#94a3b8" }}>
          Mini game untuk {ukm.name} masih dalam tahap pengembangan dan akan ditambahkan di update berikutnya.
        </p>
        <button className="btn-secondary" onClick={() => setGameActive(false)}>
          Kembali
        </button>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-5"
      style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="w-full overflow-y-auto"
        style={{
          background: "linear-gradient(135deg,#1a2340,#1e2a4a)",
          border: `1px solid ${group.color}44`,
          borderRadius: 24,
          padding: 32,
          maxWidth: 780,
          maxHeight: "88vh",
          boxShadow: `0 0 60px ${group.color}22`,
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <button onClick={onClose} className="btn-secondary" style={{ padding: "10px 16px", fontSize: 12 }}>
            {"< Back"}
          </button>
          <button onClick={onClose} className="cursor-pointer border-none bg-transparent text-xl text-[#64748b]">
            x
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="font-orbitron text-[16px] font-black tracking-[0.06em]" style={{ color: "#f1f5f9" }}>
              {ukm.emoji} {ukm.name}
            </div>
            <div className="mt-0.5 text-[12px]" style={{ color: "#64748b" }}>
              {group.name} - {group.desc}
            </div>
          </div>
        </div>

        {!gameActive ? (
          <>
            <div className="mb-5 rounded-2xl p-5" style={{ background: "rgba(10,14,26,0.5)" }}>
              <p className="text-[15px] leading-[1.8]" style={{ color: "#94a3b8" }}>
                {ukm.desc}
              </p>
            </div>
            <div className="flex gap-2.5">
              {ukm.hasGame && (
                <button className="btn-primary flex-1 justify-center" onClick={() => setGameActive(true)}>
                  Main Mini Game
                </button>
              )}
              <button className="btn-secondary" onClick={onClose}>
                Kembali
              </button>
            </div>
          </>
        ) : (
          renderGame()
        )}
      </div>
    </div>
  );
}
