"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

let splashDone = false;

const SPEECH_TEXT =
  "Halo! Selamat datang di GELEX 2026. " +
  "Jika kamu memiliki keterbatasan penglihatan, " +
  "tekan layar dua kali untuk mengaktifkan fitur pembaca layar. " +
  "Pada sentuhan kedua, text to speech akan langsung menyala. " +
  "Kami akan membantumu menjelajahi website ini dengan mudah.";

export function SplashIntro() {
  const [visible, setVisible] = useState(!splashDone);
  const [clickCount, setClickCount] = useState(0);
  const [fading, setFading] = useState(false);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const allowSplashSpeechRef = useRef(true);

  useEffect(() => {
    if (splashDone) return;

    const trySpeak = () => {
      if (!allowSplashSpeechRef.current) return;
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(SPEECH_TEXT);
      utt.lang = "id-ID";
      utt.rate = 0.88;
      utt.volume = 1;
      window.speechSynthesis.speak(utt);
      setTimeout(() => window.speechSynthesis.resume(), 100);
    };

    speechTimeoutRef.current = setTimeout(() => {
      trySpeak();
    }, 500);

    const onFirstInteraction = () => {
      if (!allowSplashSpeechRef.current) return;
      if (!window.speechSynthesis?.speaking) {
        trySpeak();
      }
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      document.removeEventListener("keydown", onFirstInteraction);
    };

    document.addEventListener("click", onFirstInteraction);
    document.addEventListener("touchstart", onFirstInteraction);
    document.addEventListener("keydown", onFirstInteraction);

    return () => {
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      document.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  const dismiss = (activateTTS: boolean) => {
    if (fading) return;
    allowSplashSpeechRef.current = activateTTS;
    if (!activateTTS && speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
    setFading(true);
    window.speechSynthesis?.cancel();
    document.dispatchEvent(
      new CustomEvent(activateTTS ? "gelex:tts-activate" : "gelex:audio-start"),
    );
    hideTimeoutRef.current = setTimeout(() => {
      splashDone = true;
      setVisible(false);
    }, 500);
  };

  const handleOverlayClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 2) dismiss(true);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-4"
      style={{
        background: "rgba(3,4,12,0.97)",
        backdropFilter: "blur(6px)",
        opacity: fading ? 0 : 1,
        transition: "opacity 500ms ease",
      }}
      onClick={handleOverlayClick}
    >
      <div className="flex items-end justify-center gap-6 mb-2">
        <Image
          src="/assets/mascot-gantari.png"
          alt="Gantari"
          width={140}
          height={140}
          style={{
            height: "clamp(100px,18vh,160px)",
            width: "auto",
            filter: "drop-shadow(0 0 24px rgba(16,185,129,0.4))",
          }}
          priority
        />

        <div
          className="rounded-2xl px-5 py-4 text-center relative"
          style={{
            maxWidth: 300,
            background: "rgba(26,35,64,0.98)",
            border: "1px solid rgba(245,200,66,0.35)",
            boxShadow: "0 0 40px rgba(245,200,66,0.12)",
          }}
        >
          <p
            className="text-[13px] font-semibold leading-[1.65]"
            style={{ color: "#f1f5f9" }}
          >
            Jika kamu memiliki{" "}
            <span style={{ color: "#f5c842", fontWeight: 800 }}>
              keterbatasan penglihatan
            </span>
            , tekan layar dua kali untuk mengaktifkan fitur pembaca layar.
            Kami akan membantumu menjelajahi website ini dengan mudah.
          </p>

          <div className="flex gap-2 justify-center mt-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    clickCount > i ? "#f5c842" : "rgba(241,245,249,0.15)",
                  boxShadow:
                    clickCount > i ? "0 0 8px rgba(245,200,66,0.7)" : "none",
                }}
              />
            ))}
          </div>

          <p className="text-[10px] mt-1.5" style={{ color: "#475569" }}>
            {clickCount === 0 ? "tekan di mana saja" : "sekali lagi, TTS langsung aktif"}
          </p>
        </div>

        <Image
          src="/assets/mascot-gilang.png"
          alt="Gilang"
          width={140}
          height={140}
          style={{
            height: "clamp(100px,18vh,160px)",
            width: "auto",
            filter: "drop-shadow(0 0 24px rgba(59,130,246,0.4))",
          }}
          priority
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dismiss(false);
        }}
        className="mt-8 px-7 py-3 rounded-full font-bold text-[13px] cursor-pointer transition-all duration-200 hover:scale-105"
        style={{
          background: "linear-gradient(135deg,#f5c842,#ffb839)",
          color: "#0a0e1a",
          border: "none",
          boxShadow: "0 0 24px rgba(245,200,66,0.3)",
        }}
      >
        Saya tidak memerlukan pembaca layar
      </button>
    </div>
  );
}
