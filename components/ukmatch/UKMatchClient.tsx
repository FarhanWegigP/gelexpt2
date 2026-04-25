"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  UKM_CARDS, PREF_QUESTIONS, emptyScores, addScores, calcMatch,
  type Scores, type UKMCard,
} from "./swipeData";

type Stage = "landing" | "prefs" | "swipe" | "result";
type SwipeDir = "right" | "left" | "up" | null;

// ─── Detail Modal ─────────────────────────────────────────────
function DetailModal({ card, onClose }: { card: UKMCard; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(3,4,12,0.88)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full rounded-3xl overflow-hidden animate-fadeUp"
        style={{
          maxWidth: 440,
          maxHeight: "85vh",
          background: "linear-gradient(160deg,#1a2340,#0f1628)",
          border: `1px solid ${card.accent}44`,
          boxShadow: `0 0 60px ${card.accent}22`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header strip */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ background: card.gradient }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 32 }}>{card.emoji}</span>
            <div>
              <div className="font-orbitron font-black text-[15px]" style={{ color: "#fff" }}>
                {card.name}
              </div>
              <div className="flex gap-1.5 mt-1">
                {card.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 flex items-center justify-center rounded-full border-none cursor-pointer font-bold text-[16px] transition-all duration-200 hover:scale-110"
            style={{
              width: 36, height: 36,
              background: "rgba(0,0,0,0.3)",
              color: "#fff",
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5 flex flex-col gap-5">
          {/* Description */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${card.accent}22` }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
              style={{ color: card.accent }}
            >
              Tentang UKM
            </div>
            <p className="text-[13px] leading-[1.7]" style={{ color: "#94a3b8" }}>
              {card.detail}
            </p>
          </div>

          {/* Activities */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3"
              style={{ color: card.accent }}
            >
              Kegiatan Utama
            </div>
            <div className="flex flex-col gap-2">
              {card.activities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                    style={{ background: `${card.accent}22`, color: card.accent }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[13px] leading-[1.5]" style={{ color: "#cbd5e1" }}>
                    {act}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full rounded-2xl py-3 font-orbitron font-black text-[12px] tracking-[0.08em] border-none cursor-pointer transition-all duration-200"
            style={{ background: card.gradient, color: "#fff" }}
          >
            Lanjut Swipe →
          </button>
        </div>
      </div>
    </div>
  );
}

const SWIPE_THRESHOLD = 100;
const ROTATE_FACTOR = 0.12;

// ─── Swipe Card ───────────────────────────────────────────────
function SwipeCard({
  card,
  onSwipe,
  isTop,
  stackIdx,
}: {
  card: UKMCard;
  onSwipe: (dir: "right" | "left" | "up") => void;
  isTop: boolean;
  stackIdx: number;
}) {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [leaving, setLeaving] = useState<SwipeDir>(null);

  const indicator: SwipeDir =
    drag.x > 50 ? "right" : drag.x < -50 ? "left" : drag.y < -50 ? "up" : null;

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isTop) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!startRef.current || !isTop) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: e.clientY - startRef.current.y,
    });
  };

  const onPointerUp = () => {
    if (!startRef.current || !isTop) return;
    startRef.current = null;
    const { x, y } = drag;
    if (x > SWIPE_THRESHOLD) fire("right");
    else if (x < -SWIPE_THRESHOLD) fire("left");
    else if (y < -SWIPE_THRESHOLD) fire("up");
    else setDrag({ x: 0, y: 0 });
  };

  const fire = (dir: "right" | "left" | "up") => {
    setLeaving(dir);
    setTimeout(() => onSwipe(dir), 350);
  };

  const rotation = isTop ? drag.x * ROTATE_FACTOR : 0;
  const tx = leaving === "right" ? 600 : leaving === "left" ? -600 : leaving === "up" ? 0 : drag.x;
  const ty = leaving === "up" ? -600 : leaving ? 0 : drag.y;
  const scale = stackIdx === 0 ? 1 : stackIdx === 1 ? 0.94 : 0.88;
  const yOffset = stackIdx === 0 ? 0 : stackIdx === 1 ? 18 : 36;

  return (
    <div
      className="absolute select-none"
      style={{
        width: "min(340px,88vw)",
        height: "min(480px,72vh)",
        transform: isTop
          ? `translateX(${tx}px) translateY(${ty}px) rotate(${rotation}deg)`
          : `scale(${scale}) translateY(${yOffset}px)`,
        transition: leaving || !startRef.current ? "transform 350ms ease" : "none",
        zIndex: 10 - stackIdx,
        cursor: isTop ? "grab" : "default",
        touchAction: "none",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: isTop
          ? "0 24px 60px rgba(0,0,0,0.6)"
          : "0 8px 24px rgba(0,0,0,0.4)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Card background */}
      <div className="absolute inset-0" style={{ background: card.gradient }} />

      {/* Emoji hero */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: 120 }}>
        <div
          style={{
            fontSize: "clamp(80px,18vw,120px)",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          }}
        >
          {card.emoji}
        </div>
      </div>

      {/* Info panel */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      >
        <h3
          className="font-orbitron font-black mb-2"
          style={{ fontSize: "clamp(16px,4vw,20px)", color: "#f1f5f9" }}
        >
          {card.name}
        </h3>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {card.keywords.map((kw) => (
            <span
              key={kw}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${card.accent}22`, color: card.accent, border: `1px solid ${card.accent}44` }}
            >
              {kw}
            </span>
          ))}
        </div>
        <p className="text-[12px] leading-[1.6]" style={{ color: "#cbd5e1" }}>
          {card.caption}
        </p>
      </div>

      {/* Direction indicators */}
      {isTop && (
        <>
          <div
            className="absolute top-8 left-5 font-orbitron font-black text-[22px] px-4 py-1.5 rounded-xl border-4"
            style={{
              color: "#ef4444",
              borderColor: "#ef4444",
              transform: "rotate(-20deg)",
              opacity: indicator === "left" ? 1 : 0,
              transition: "opacity 100ms",
            }}
          >
            SKIP ✕
          </div>
          <div
            className="absolute top-8 right-5 font-orbitron font-black text-[22px] px-4 py-1.5 rounded-xl border-4"
            style={{
              color: "#22c55e",
              borderColor: "#22c55e",
              transform: "rotate(20deg)",
              opacity: indicator === "right" ? 1 : 0,
              transition: "opacity 100ms",
            }}
          >
            TERTARIK ❤️
          </div>
          <div
            className="absolute top-4 left-1/2 font-orbitron font-black text-[18px] px-4 py-1.5 rounded-xl border-4"
            style={{
              color: "#38bdf8",
              borderColor: "#38bdf8",
              transform: "translateX(-50%)",
              opacity: indicator === "up" ? 1 : 0,
              transition: "opacity 100ms",
            }}
          >
            LEBIH LANJUT ⬆
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export function UKMatchClient() {
  const [stage, setStage] = useState<Stage>("landing");
  const [prefStep, setPrefStep] = useState(0);
  const [scores, setScores] = useState<Scores>(emptyScores());
  const [cardIdx, setCardIdx] = useState(0);
  const [rightSwiped, setRightSwiped] = useState<UKMCard[]>([]);
  const [upSwiped, setUpSwiped] = useState<UKMCard[]>([]);
  const [detailCard, setDetailCard] = useState<UKMCard | null>(null);

  const pickPref = (delta: Partial<Scores>) => {
    setScores((s) => addScores(s, delta));
    if (prefStep + 1 >= PREF_QUESTIONS.length) {
      setStage("swipe");
    } else {
      setPrefStep((p) => p + 1);
    }
  };

  const handleSwipe = useCallback((dir: "right" | "left" | "up") => {
    const card = UKM_CARDS[cardIdx];
    // swipe up = show detail modal, don't advance card
    if (dir === "up") {
      setDetailCard(card);
      return;
    }
    if (dir === "right") {
      setScores((s) => addScores(s, card.weights, 3));
      setRightSwiped((p) => [...p, card]);
    }
    const next = cardIdx + 1;
    if (next >= UKM_CARDS.length) {
      setStage("result");
    } else {
      setCardIdx(next);
    }
  }, [cardIdx]);

  const results = UKM_CARDS
    .map((c) => ({ card: c, pct: calcMatch(scores, c) }))
    .sort((a, b) => b.pct - a.pct);
  const topMatch = results[0];
  const alts = results.slice(1, 5);

  const restart = () => {
    setStage("landing");
    setPrefStep(0);
    setScores(emptyScores());
    setCardIdx(0);
    setRightSwiped([]);
    setUpSwiped([]);
    setDetailCard(null);
  };

  // ── Landing ───────────────────────────────────────────────
  if (stage === "landing") {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 text-center">
        {/* Card stack preview */}
        <div className="relative mb-12" style={{ width: 280, height: 200 }}>
          {[2, 1, 0].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 rounded-2xl flex items-center justify-center"
              style={{
                width: 180 + i * 22,
                height: 130 + i * 12,
                transform: "translateX(-50%)",
                background: UKM_CARDS[i].gradient,
                bottom: i * 22,
                zIndex: i,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                fontSize: 40,
                opacity: 0.65 + i * 0.18,
              }}
            >
              {UKM_CARDS[i].emoji}
            </div>
          ))}
        </div>

        <div className="chip mb-4">💘 PILIH UKM-MU</div>
        <h1
          className="font-orbitron font-black mb-4"
          style={{ fontSize: "clamp(24px,5vw,44px)", letterSpacing: "0.06em" }}
        >
          TEMUKAN <span className="gold-text">UKM</span>-MU
        </h1>
        <p className="mb-10 max-w-[400px]" style={{ color: "#94a3b8", fontSize: "clamp(13px,1.8vw,16px)", lineHeight: 1.7 }}>
          Geser kartu UKM seperti main Tinder — ke kanan kalau tertarik,
          ke kiri kalau skip, ke atas kalau mau tahu lebih.
        </p>

        {/* Legend */}
        <div className="flex items-center gap-8 mb-10">
          {[
            { dir: "←", label: "Skip", color: "#ef4444" },
            { dir: "↑", label: "Info", color: "#38bdf8" },
            { dir: "→", label: "Tertarik", color: "#22c55e" },
          ].map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-1.5">
              <div
                className="font-orbitron font-black text-[22px] w-12 h-12 flex items-center justify-center rounded-full"
                style={{ background: `${g.color}22`, color: g.color }}
              >
                {g.dir}
              </div>
              <span className="text-[11px] font-bold" style={{ color: "#64748b" }}>{g.label}</span>
            </div>
          ))}
        </div>

        <button className="btn-primary text-[16px] px-10 py-3.5" onClick={() => setStage("prefs")}>
          ✦ Start Swiping
        </button>

        <div className="fixed bottom-20 right-5 z-50 hidden lg:block">
          <Image src="/assets/mascot-gantari.png" alt="Gantari" width={90} height={90}
            style={{ height: 90, width: "auto", filter: "drop-shadow(0 0 12px rgba(236,72,153,0.4))" }} />
        </div>
      </div>
    );
  }

  // ── Prefs ─────────────────────────────────────────────────
  if (stage === "prefs") {
    const q = PREF_QUESTIONS[prefStep];
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4">
        <div className="flex gap-2 mb-8">
          {PREF_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === prefStep ? 24 : 8,
                height: 8,
                background: i <= prefStep ? "#f5c842" : "rgba(241,245,249,0.15)",
              }}
            />
          ))}
        </div>

        <div className="chip mb-4">PREFERENSI {prefStep + 1}/{PREF_QUESTIONS.length}</div>
        <h2
          className="font-orbitron font-black text-center mb-10"
          style={{ fontSize: "clamp(16px,2.8vw,26px)", maxWidth: 480, letterSpacing: "0.04em" }}
        >
          {q.q}
        </h2>

        <div className="grid grid-cols-2 gap-3 w-full" style={{ maxWidth: 440 }}>
          {q.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => pickPref(opt.scores)}
              className="rounded-2xl p-4 text-left cursor-pointer transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "rgba(26,35,64,0.8)",
                border: "1px solid rgba(245,200,66,0.15)",
              }}
            >
              <div className="text-3xl mb-2">{opt.icon}</div>
              <div className="text-[13px] font-semibold leading-[1.4]" style={{ color: "#f1f5f9" }}>
                {opt.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Swipe ─────────────────────────────────────────────────
  if (stage === "swipe") {
    const visibleCards = UKM_CARDS.slice(cardIdx, cardIdx + 3);

    // also track upSwiped for result summary
    const closeDetail = () => {
      if (detailCard) {
        setScores((s) => addScores(s, detailCard.weights, 1));
        setUpSwiped((p) => [...p, detailCard]);
        setDetailCard(null);
      }
    };

    return (
      <>
      {detailCard && <DetailModal card={detailCard} onClose={closeDetail} />}
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center px-4">
        <div className="flex items-center justify-between w-full mb-5" style={{ maxWidth: 380 }}>
          <div className="text-[11px] font-bold" style={{ color: "#64748b" }}>
            {cardIdx + 1} / {UKM_CARDS.length}
          </div>
          <div className="chip">💘 SWIPE SESSION</div>
          <div className="text-[11px] font-bold" style={{ color: "#64748b" }}>
            {UKM_CARDS.length - cardIdx} tersisa
          </div>
        </div>

        {/* Card stack */}
        <div
          className="relative flex items-end justify-center"
          style={{ width: "min(340px,88vw)", height: "min(500px,74vh)" }}
        >
          {[...visibleCards].reverse().map((card, revIdx) => {
            const stackIdx = visibleCards.length - 1 - revIdx;
            return (
              <SwipeCard
                key={card.id + cardIdx}
                card={card}
                isTop={stackIdx === 0}
                stackIdx={stackIdx}
                onSwipe={handleSwipe}
              />
            );
          })}
        </div>

        {/* Button controls */}
        <div className="flex items-center gap-5 mt-6">
          {[
            { fn: () => handleSwipe("left"), icon: "✕", color: "#ef4444", size: 56, title: "Skip" },
            { fn: () => handleSwipe("up"), icon: "⬆", color: "#38bdf8", size: 46, title: "Info" },
            { fn: () => handleSwipe("right"), icon: "❤️", color: "#22c55e", size: 56, title: "Tertarik" },
          ].map((b) => (
            <button
              key={b.title}
              onClick={b.fn}
              title={b.title}
              className="flex items-center justify-center rounded-full border-none cursor-pointer text-[22px] transition-all duration-200 hover:scale-110"
              style={{
                width: b.size, height: b.size,
                background: `${b.color}15`,
                color: b.color,
                border: `2px solid ${b.color}33`,
              }}
            >
              {b.icon}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[11px]" style={{ color: "#475569" }}>
          Geser kartu atau gunakan tombol di atas
        </p>
      </div>
      </>
    );
  }

  // ── Result ────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center">
      <div className="chip mb-4">💘 HASIL MATCH</div>
      <h2
        className="font-orbitron font-black text-center mb-2"
        style={{ fontSize: "clamp(18px,3vw,30px)", letterSpacing: "0.08em" }}
      >
        UKM TERBAIK UNTUKMU
      </h2>
      <p className="mb-10 text-[13px] text-center" style={{ color: "#64748b" }}>
        {rightSwiped.length} tertarik · {upSwiped.length} ingin tahu · {UKM_CARDS.length - rightSwiped.length - upSwiped.length} skip
      </p>

      {/* Top match card */}
      {topMatch && (
        <div
          className="w-full rounded-3xl overflow-hidden mb-6"
          style={{
            maxWidth: 480,
            background: topMatch.card.gradient,
            boxShadow: `0 0 60px ${topMatch.card.accent}44`,
          }}
        >
          <div className="flex items-center justify-center py-10" style={{ fontSize: 80 }}>
            {topMatch.card.emoji}
          </div>
          <div className="p-6" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 font-orbitron font-black text-[13px]"
              style={{ background: `${topMatch.card.accent}22`, color: topMatch.card.accent, border: `1px solid ${topMatch.card.accent}55` }}
            >
              ❤️ {topMatch.pct}% MATCH
            </div>
            <h3 className="font-orbitron font-black text-[22px] mb-2" style={{ color: "#f1f5f9" }}>
              {topMatch.card.name}
            </h3>
            <div className="flex gap-2 flex-wrap mb-3">
              {topMatch.card.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${topMatch.card.accent}22`, color: topMatch.card.accent }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-[13px] leading-[1.65]" style={{ color: "#94a3b8" }}>
              {topMatch.card.caption}
            </p>
          </div>
        </div>
      )}

      {/* Alternatives */}
      <div className="w-full mb-8" style={{ maxWidth: 480 }}>
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: "#64748b" }}>
          Rekomendasi Lain
        </div>
        <div className="flex flex-col gap-3">
          {alts.map(({ card, pct }) => (
            <div
              key={card.id}
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: "rgba(26,35,64,0.7)", border: "1px solid rgba(241,245,249,0.06)" }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl text-[24px]"
                style={{ width: 46, height: 46, background: card.gradient }}
              >
                {card.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold mb-1 truncate" style={{ color: "#f1f5f9" }}>
                  {card.name}
                </div>
                <div className="relative rounded-full overflow-hidden" style={{ height: 4, background: "rgba(241,245,249,0.1)" }}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${pct}%`, background: card.accent }}
                  />
                </div>
              </div>
              <div className="font-orbitron font-black text-[13px] flex-shrink-0" style={{ color: card.accent }}>
                {pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liked summary */}
      {rightSwiped.length > 0 && (
        <div className="w-full mb-8" style={{ maxWidth: 480 }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "#64748b" }}>
            UKM yang kamu suka ❤️
          </div>
          <div className="flex gap-2 flex-wrap">
            {rightSwiped.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold"
                style={{ background: `${c.accent}18`, color: c.accent, border: `1px solid ${c.accent}33` }}
              >
                {c.emoji} {c.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap justify-center">
        <button className="btn-secondary" onClick={restart}>↺ Coba Lagi</button>
        <button className="btn-primary" onClick={() => { window.location.href = "/gelexy"; }}>🌌 Gelexy</button>
      </div>
    </div>
  );
}
