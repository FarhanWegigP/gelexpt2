"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PAGE_SCRIPTS: Record<string, { title: string; text: string }> = {
  "/": {
    title: "Beranda GELEX 2026",
    text:
      "Selamat datang di website GELEX 2026, Gelanggang Expo Universitas Gadjah Mada. " +
      "Acara ini berlangsung selama 3 hari, pada tanggal 15 hingga 17 Agustus 2026, " +
      "di Lapangan Grha Sabha Pramana, UGM, Yogyakarta. " +
      "Tersedia 4 fitur interaktif yang bisa Anda coba sekarang. " +
      "Pertama, UKMatch: kuis kepribadian 8 pertanyaan untuk mencocokkan Anda dengan UKM yang tepat. Klik menu UKMatch di navigasi atas untuk memulai. " +
      "Kedua, Simulasi UKM: jelajahi planet-planet UKM beranimasi dan mainkan mini game. Klik menu Simulasi UKM. " +
      "Ketiga, Bilik Foto: foto bersama teman dengan filter overlay UKM favorit Anda. Klik menu Bilik Foto. " +
      "Keempat, Anthem: dengarkan lagu resmi GELEX 2026 dengan lirik sinkron. Klik menu Anthem. " +
      "Untuk memulai petualangan, klik tombol Mulai Petualangan di tengah halaman.",
  },
  "/ukmatch": {
    title: "UKMatch",
    text:
      "Anda berada di halaman UKMatch. " +
      "Fitur ini adalah kuis kepribadian 8 pertanyaan yang akan mencocokkan Anda dengan UKM terbaik dari 39 UKM Universitas Gadjah Mada. " +
      "Cara bermain: klik tombol Mulai Kuis, lalu pilih salah satu jawaban dari setiap pertanyaan. " +
      "Setelah 8 pertanyaan selesai, sistem akan menampilkan UKM yang paling cocok dengan kepribadian Anda, " +
      "beserta visualisasi rasi bintang dan daftar UKM alternatif. " +
      "Klik tombol Mulai Kuis sekarang untuk memulai.",
  },
  "/simulasi": {
    title: "Simulasi UKM",
    text:
      "Anda berada di halaman Simulasi UKM. " +
      "Halaman ini menampilkan sistem tata surya virtual dengan 4 planet yang bergerak mengorbit. " +
      "Setiap planet mewakili satu kategori UKM: Rohani, Olahraga, Seni, dan Khusus. " +
      "Cara menggunakan: klik salah satu planet yang bergerak, atau klik tombol kategori di bagian bawah layar. " +
      "Setelah mengklik planet, akan muncul peta rasi bintang yang menampilkan semua UKM dalam kategori tersebut. " +
      "Arahkan kursor ke bintang untuk melihat nama UKM, lalu klik untuk membuka mini game UKM tersebut.",
  },
  "/bilikfoto": {
    title: "Bilik Foto",
    text:
      "Anda berada di halaman Bilik Foto. " +
      "Fitur ini memungkinkan Anda berfoto menggunakan kamera perangkat dengan filter overlay bertema UKM. " +
      "Tahap pertama: pilih salah satu dari 6 filter yang tersedia, yaitu Basket, Berkuda, Seni, Rohani, Voli, atau Alam. " +
      "Tahap kedua: klik tombol Mulai Foto. Browser akan meminta izin akses kamera, klik Izinkan. " +
      "Sistem akan otomatis mengambil 4 foto dengan hitungan mundur 3 detik setiap foto. " +
      "Tahap ketiga: unduh hasil foto sebagai strip PNG dengan mengklik tombol Download Strip.",
  },
  "/anthem": {
    title: "Anthem GELEX 2026",
    text:
      "Anda berada di halaman Anthem, lagu resmi GELEX 2026 berjudul Orbit Pilihanmu. " +
      "Cara menggunakan: klik tombol play berbentuk segitiga di bagian tengah untuk memulai lagu. " +
      "Lirik lagu akan muncul di bawah dan menyala secara otomatis sesuai bagian yang sedang dimainkan. " +
      "Klik teks lirik mana saja untuk melompat ke bagian tersebut. " +
      "Gunakan tombol TTS di panel lirik untuk mendengarkan lirik yang sedang aktif diucapkan secara lisan. " +
      "Gunakan tombol ID dan EN untuk beralih antara lirik Bahasa Indonesia dan Bahasa Inggris.",
  },
};

const FALLBACK: { title: string; text: string } = {
  title: "GELEX 2026",
  text: "Selamat datang di GELEX 2026. Silakan navigasi menggunakan menu di bagian atas layar.",
};

export function TTSGuide() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // Stop speech on route change
  useEffect(() => {
    stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    return () => stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const speak = () => {
    if (!supported) return;
    const script = PAGE_SCRIPTS[pathname] ?? FALLBACK;

    if (speaking) {
      stop();
      return;
    }

    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(script.text);
    utt.lang = "id-ID";
    utt.rate = 0.92;
    utt.pitch = 1;
    utt.volume = 1;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
  };

  if (!supported) return null;

  const script = PAGE_SCRIPTS[pathname] ?? FALLBACK;

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-[500] flex flex-col items-start gap-2">
      {/* Panel */}
      {open && (
        <div
          className="rounded-2xl p-4 mb-1"
          style={{
            width: 240,
            background: "rgba(10,14,26,0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(245,200,66,0.25)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(245,200,66,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">♿</span>
              <span
                className="font-orbitron font-black text-[10px] tracking-[0.12em]"
                style={{ color: "#f5c842" }}
              >
                AKSESIBILITAS
              </span>
            </div>
            <button
              onClick={() => { stop(); setOpen(false); }}
              className="bg-transparent border-none text-[#64748b] cursor-pointer text-base leading-none"
            >
              ✕
            </button>
          </div>

          {/* Page info */}
          <div
            className="rounded-xl px-3 py-2.5 mb-3"
            style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.15)" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5" style={{ color: "#64748b" }}>
              Halaman saat ini
            </div>
            <div className="font-orbitron font-bold text-[13px]" style={{ color: "#f5c842" }}>
              {script.title}
            </div>
          </div>

          {/* Script preview */}
          <div
            className="text-[11px] leading-[1.6] mb-4 max-h-[120px] overflow-y-auto"
            style={{ color: "#94a3b8" }}
          >
            {script.text}
          </div>

          {/* Play / Stop button */}
          <button
            onClick={speak}
            className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-[12px] border-none cursor-pointer py-2.5 transition-all duration-200"
            style={{
              background: speaking
                ? "rgba(239,68,68,0.2)"
                : "linear-gradient(135deg,#f5c842,#ffb839)",
              color: speaking ? "#ef4444" : "#0a0e1a",
              border: speaking ? "1px solid rgba(239,68,68,0.4)" : "none",
            }}
          >
            {speaking ? (
              <>
                <span className="animate-pulse">■</span> Hentikan
              </>
            ) : (
              <>▶ Baca Halaman Ini</>
            )}
          </button>

          <p className="text-[10px] mt-2.5 text-center" style={{ color: "#475569" }}>
            Gunakan headphone untuk pengalaman terbaik
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { if (open) stop(); setOpen((o) => !o); }}
        title="Aksesibilitas TTS"
        className="flex items-center justify-center rounded-full border-none cursor-pointer transition-all duration-200"
        style={{
          width: 44,
          height: 44,
          background: open
            ? "rgba(245,200,66,0.15)"
            : "rgba(10,14,26,0.9)",
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${open ? "rgba(245,200,66,0.5)" : "rgba(245,200,66,0.2)"}`,
          boxShadow: speaking
            ? "0 0 16px rgba(245,200,66,0.5)"
            : "0 4px 20px rgba(0,0,0,0.4)",
          fontSize: 20,
        }}
      >
        {speaking ? (
          <span
            className="font-bold text-[14px]"
            style={{ color: "#f5c842", animation: "pulse 1s ease-in-out infinite" }}
          >
            🔊
          </span>
        ) : (
          "♿"
        )}
      </button>
    </div>
  );
}
