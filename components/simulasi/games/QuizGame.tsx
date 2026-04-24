"use client";
import { useState } from "react";

interface Question {
  q: string;
  opts: string[];
  ans: number;
}

interface Props {
  questions: Question[];
  onBack: () => void;
}

export function QuizGame({ questions, onBack }: Props) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[qIdx].ans) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIdx + 1 >= questions.length) {
        setDone(true);
      } else {
        setQIdx((q) => q + 1);
        setSelected(null);
      }
    }, 700);
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-[48px] mb-2.5">
          {score === questions.length ? "🎉" : score >= 2 ? "✨" : "💫"}
        </div>
        <div
          className="font-orbitron text-[20px] font-black mb-1.5"
          style={{ color: "#f5c842" }}
        >
          {score}/{questions.length}
        </div>
        <p className="mb-5" style={{ color: "#94a3b8" }}>
          {score === questions.length
            ? "Sempurna!"
            : score >= 2
            ? "Bagus sekali!"
            : "Terus belajar!"}
        </p>
        <div className="flex gap-2.5 justify-center">
          <button
            className="btn-secondary"
            onClick={() => {
              setQIdx(0);
              setSelected(null);
              setScore(0);
              setDone(false);
            }}
          >
            ↺ Ulangi
          </button>
          <button className="btn-primary" onClick={onBack}>
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  const q = questions[qIdx];

  return (
    <div>
      <div className="flex justify-between mb-3.5">
        <div className="text-[11px] font-bold" style={{ color: "#64748b" }}>
          {qIdx + 1}/{questions.length}
        </div>
        <div className="text-[11px] font-bold" style={{ color: "#f5c842" }}>
          Skor: {score}
        </div>
      </div>

      <div
        className="rounded-xl p-4 mb-3.5"
        style={{
          background: "rgba(6,182,212,0.08)",
          border: "1px solid rgba(6,182,212,0.2)",
        }}
      >
        <p className="text-[14px] font-semibold leading-[1.6]" style={{ color: "#f1f5f9" }}>
          {q.q}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {q.opts.map((opt, i) => {
          let bg = "rgba(26,35,64,0.8)";
          let border = "1px solid rgba(241,245,249,0.1)";
          let color = "#f1f5f9";

          if (selected !== null) {
            if (i === q.ans) {
              bg = "rgba(16,185,129,0.2)";
              border = "1px solid rgba(16,185,129,0.5)";
              color = "#10b981";
            } else if (i === selected) {
              bg = "rgba(239,68,68,0.15)";
              border = "1px solid rgba(239,68,68,0.4)";
              color = "#ef4444";
            }
          }

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className="text-left rounded-xl text-[13px] font-medium font-grotesk transition-all duration-200"
              style={{ padding: "10px 14px", background: bg, border, color }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
