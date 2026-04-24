"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sharedAudioRef } from "@/lib/audioRef";

const PAGE_SCRIPTS: Record<string, string> = {
  "/":
    "Selamat datang di website GELEX 2026, Gelanggang Expo Universitas Gadjah Mada. " +
    "Acara ini berlangsung pada tanggal 15 hingga 17 Agustus 2026 di Lapangan Grha Sabha Pramana, UGM. " +
    "Tersedia 4 fitur: UKMatch, Simulasi UKM, Bilik Foto, dan Anthem. Gunakan navigasi di atas untuk berpindah halaman.",
  "/ukmatch":
    "Anda berada di halaman Pilih UKM. Geser kartu ke kanan jika tertarik, ke kiri untuk skip, ke atas untuk info lebih lanjut. Klik Start Swiping untuk mulai.",
  "/simulasi":
    "Anda berada di Simulasi UKM. Klik salah satu planet yang bergerak untuk melihat UKM dalam kategori tersebut, lalu klik bintang untuk membuka mini game.",
  "/bilikfoto":
    "Anda berada di Bilik Foto. Pilih filter, klik Mulai Foto, izinkan kamera, lalu sistem otomatis mengambil 4 foto. Klik Download Strip untuk mengunduh.",
  "/anthem":
    "Anda berada di halaman Anthem. Klik play untuk memutar lagu resmi GELEX 2026. Klik lirik untuk melompat ke bagian tersebut.",
};

const NORMAL_VOLUME = 0.7;
const TTS_VOLUME = 0.08;

export function AccessibilityLayer() {
  const pathname = usePathname();
  const [ttsMode, setTtsMode] = useState(false);
  const ttsModeRef = useRef(false);
  const audioStarted = useRef(false);
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "id-ID";
    utt.rate = 0.9;
    utt.volume = 1;
    window.speechSynthesis.speak(utt);
  };

  const startAudio = () => {
    const audio = sharedAudioRef.current;
    if (!audio || audioStarted.current) return;
    audioStarted.current = true;
    audio.volume = ttsModeRef.current ? TTS_VOLUME : NORMAL_VOLUME;
    audio.play().catch(() => {});
  };

  // ── Listen for events from SplashIntro ───────────────────────
  useEffect(() => {
    const onActivate = () => {
      ttsModeRef.current = true;
      setTtsMode(true);
      startAudio();
      if (sharedAudioRef.current) sharedAudioRef.current.volume = TTS_VOLUME;
      speak("Pembaca layar diaktifkan. " + (PAGE_SCRIPTS[pathname] ?? ""));
    };

    const onAudioStart = () => startAudio();

    document.addEventListener("gelex:tts-activate", onActivate);
    document.addEventListener("gelex:audio-start", onAudioStart);
    return () => {
      document.removeEventListener("gelex:tts-activate", onActivate);
      document.removeEventListener("gelex:audio-start", onAudioStart);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Fallback: start audio on any user gesture ─────────────────
  useEffect(() => {
    const tryPlay = () => {
      startAudio();
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
    document.addEventListener("click", tryPlay);
    document.addEventListener("keydown", tryPlay);
    document.addEventListener("touchstart", tryPlay);
    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-read on page change when TTS active ─────────────────
  useEffect(() => {
    if (!ttsModeRef.current) return;
    clearTimeout(speakTimeoutRef.current);
    speakTimeoutRef.current = setTimeout(() => {
      const script = PAGE_SCRIPTS[pathname];
      if (script) speak(script);
    }, 700);
    return () => clearTimeout(speakTimeoutRef.current);
  }, [pathname]);

  // ── Render: hidden audio element only ────────────────────────
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      ref={(el) => { sharedAudioRef.current = el; }}
      src="/assets/anthem.mp3"
      loop
      preload="auto"
      style={{ display: "none" }}
    />
  );
}
