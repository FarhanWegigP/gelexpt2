"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { LYRICS, TOTAL_DURATION } from "./lyricsData";

type Lang = "id" | "en";

const BAR_COUNT = 32;

export function AnthemClient() {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [lang, setLang] = useState<Lang>("id");
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(0));
  const [ttsSupported, setTtsSupported] = useState(false);
  const [ttsSpeaking, setTtsSpeaking] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const barTimerRef = useRef<ReturnType<typeof setInterval>>();
  const lyricsRef = useRef<HTMLDivElement>(null);

  // TTS support check
  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // Active lyric index
  const activeLyricIdx = LYRICS.reduce((acc, line, i) => {
    if (currentTime >= line.time) return i;
    return acc;
  }, -1);

  // Scroll active lyric into view
  useEffect(() => {
    if (activeLyricIdx < 0 || !lyricsRef.current) return;
    const el = lyricsRef.current.children[activeLyricIdx] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLyricIdx]);

  // Fake equalizer bars animation
  const animateBars = useCallback((active: boolean) => {
    clearInterval(barTimerRef.current);
    if (!active) {
      setBars(Array(BAR_COUNT).fill(0));
      return;
    }
    barTimerRef.current = setInterval(() => {
      setBars(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          const base = Math.sin(Date.now() / 200 + i * 0.5) * 0.3 + 0.4;
          const rand = Math.random() * 0.4;
          // center bars taller
          const center = 1 - Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2) * 0.4;
          return Math.max(0.05, Math.min(1, (base + rand) * center));
        })
      );
    }, 80);
  }, []);

  // Play/pause
  const togglePlay = () => {
    if (playing) {
      clearInterval(timerRef.current);
      animateBars(false);
      setPlaying(false);
    } else {
      setPlaying(true);
      animateBars(true);
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= TOTAL_DURATION) {
            clearInterval(timerRef.current);
            animateBars(false);
            setPlaying(false);
            return 0;
          }
          return t + 0.25;
        });
      }, 250);
    }
  };

  // Restart
  const restart = () => {
    clearInterval(timerRef.current);
    setCurrentTime(0);
    if (playing) {
      // keep playing from start
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= TOTAL_DURATION) {
            clearInterval(timerRef.current);
            animateBars(false);
            setPlaying(false);
            return 0;
          }
          return t + 0.25;
        });
      }, 250);
    }
  };

  // Seek by clicking progress bar
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.max(0, Math.min(TOTAL_DURATION, ratio * TOTAL_DURATION)));
  };

  // TTS current lyric
  const speakCurrentLyric = () => {
    if (!ttsSupported) return;
    const line = LYRICS[activeLyricIdx];
    if (!line) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(lang === "id" ? line.id : line.en);
    utt.lang = lang === "id" ? "id-ID" : "en-US";
    utt.volume = volume;
    utt.onstart = () => setTtsSpeaking(true);
    utt.onend = () => setTtsSpeaking(false);
    utt.onerror = () => setTtsSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(barTimerRef.current);
      if (ttsSupported) window.speechSynthesis?.cancel();
    };
  }, [ttsSupported]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="chip mb-4">🎵 ANTHEM</div>
      <h2
        className="font-orbitron font-extrabold text-center mb-1"
        style={{ fontSize: "clamp(18px,3vw,30px)", letterSpacing: "0.08em" }}
      >
        LAGU GELEX 2026
      </h2>
      <p className="text-[12px] mb-8 text-center" style={{ color: "#64748b" }}>
        Anthem resmi Gelanggang Expo UGM 2026
      </p>

      <div className="w-full flex flex-col gap-6" style={{ maxWidth: 680 }}>
        {/* Player card */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg,rgba(26,35,64,0.95),rgba(10,14,26,0.95))",
            border: "1px solid rgba(245,200,66,0.2)",
            boxShadow: "0 0 60px rgba(245,200,66,0.08)",
          }}
        >
          {/* Album art */}
          <div className="flex items-center gap-5 mb-6">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-2xl"
              style={{
                width: 80,
                height: 80,
                background: "radial-gradient(circle,#fdd677,#f5c842,#ffb839)",
                boxShadow: playing ? "0 0 30px rgba(245,200,66,0.6)" : "0 0 10px rgba(245,200,66,0.2)",
                transition: "box-shadow 500ms",
              }}
            >
              <Image src="/assets/logo-icon.svg" alt="GELEX" width={48} height={48} />
            </div>
            <div>
              <div className="font-orbitron font-black text-[18px]" style={{ color: "#f5c842" }}>
                GELEX 2026
              </div>
              <div className="text-[14px] mt-0.5" style={{ color: "#94a3b8" }}>
                Anthem Resmi · Gelanggang Expo UGM
              </div>
              <div className="text-[11px] mt-1" style={{ color: "#475569" }}>
                {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
              </div>
            </div>
          </div>

          {/* Equalizer */}
          <div
            className="flex items-end justify-center gap-[2px] mb-5 rounded-xl overflow-hidden"
            style={{ height: 60, background: "rgba(10,14,26,0.5)", padding: "0 12px" }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h * 100}%`,
                  background: `hsl(${42 + i * 2},95%,${55 + h * 15}%)`,
                  transition: "height 80ms ease",
                  minWidth: 2,
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="relative rounded-full mb-4 cursor-pointer"
            style={{ height: 6, background: "rgba(241,245,249,0.1)" }}
            onClick={seek}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg,#f5c842,#ffb839)" }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white"
              style={{ left: `calc(${progress}% - 6px)`, background: "#f5c842" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Restart */}
              <button
                onClick={restart}
                className="text-[20px] bg-transparent border-none cursor-pointer transition-opacity"
                style={{ color: "#94a3b8", opacity: 0.8 }}
                title="Mulai ulang"
              >
                ⏮
              </button>

              {/* Play/pause */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center rounded-full border-none cursor-pointer font-bold text-[22px] transition-all duration-200"
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg,#f5c842,#ffb839)",
                  color: "#0a0e1a",
                  boxShadow: playing ? "0 0 24px rgba(245,200,66,0.5)" : "none",
                }}
              >
                {playing ? "⏸" : "▶"}
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 flex-1 justify-center max-w-[160px]">
              <span className="text-[14px]" style={{ color: "#64748b" }}>🔈</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-yellow-400"
                style={{ accentColor: "#f5c842" }}
              />
              <span className="text-[14px]" style={{ color: "#64748b" }}>🔊</span>
            </div>

            {/* Language toggle */}
            <div
              className="flex rounded-full overflow-hidden"
              style={{ border: "1px solid rgba(245,200,66,0.3)" }}
            >
              {(["id", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 font-bold text-[11px] border-none cursor-pointer transition-all duration-200"
                  style={{
                    background: lang === l ? "#f5c842" : "transparent",
                    color: lang === l ? "#0a0e1a" : "#94a3b8",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lyrics panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,14,26,0.8)",
            border: "1px solid rgba(241,245,249,0.06)",
            maxHeight: 360,
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderBottom: "1px solid rgba(241,245,249,0.06)" }}
          >
            <div className="font-orbitron font-bold text-[12px]" style={{ color: "#64748b" }}>
              LIRIK · {lang === "id" ? "BAHASA INDONESIA" : "ENGLISH"}
            </div>
            {ttsSupported && (
              <button
                onClick={speakCurrentLyric}
                className="text-[12px] px-3 py-1 rounded-full border-none cursor-pointer transition-all duration-200"
                style={{
                  background: ttsSpeaking ? "rgba(245,200,66,0.2)" : "rgba(241,245,249,0.06)",
                  color: ttsSpeaking ? "#f5c842" : "#64748b",
                  border: `1px solid ${ttsSpeaking ? "rgba(245,200,66,0.4)" : "rgba(241,245,249,0.1)"}`,
                }}
              >
                {ttsSpeaking ? "🔊 Berbicara…" : "🔊 TTS"}
              </button>
            )}
          </div>
          <div
            ref={lyricsRef}
            className="overflow-y-auto"
            style={{ maxHeight: 300, padding: "8px 0", scrollBehavior: "smooth" }}
          >
            {LYRICS.map((line, i) => {
              const isActive = i === activeLyricIdx;
              const isPast = i < activeLyricIdx;
              return (
                <div
                  key={i}
                  className="px-5 py-2.5 cursor-pointer transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(245,200,66,0.08)" : "transparent",
                    borderLeft: isActive ? "3px solid #f5c842" : "3px solid transparent",
                  }}
                  onClick={() => setCurrentTime(line.time)}
                >
                  <div
                    className="text-[14px] font-medium leading-[1.5] transition-all duration-300"
                    style={{
                      color: isActive ? "#f5c842" : isPast ? "#475569" : "#94a3b8",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {lang === "id" ? line.id : line.en}
                  </div>
                  {isActive && (
                    <div className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
                      {lang === "id" ? line.en : line.id}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info note */}
        <div
          className="rounded-xl px-4 py-3 text-[12px] text-center"
          style={{
            background: "rgba(245,200,66,0.06)",
            border: "1px solid rgba(245,200,66,0.15)",
            color: "#64748b",
          }}
        >
          🎵 Klik lirik untuk loncat ke bagian tersebut · Klik TTS untuk dengar lirik saat ini
        </div>
      </div>
    </div>
  );
}
