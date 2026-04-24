"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/translate";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        padding: "100px clamp(24px,5vw,80px) 80px",
        background:
          "radial-gradient(ellipse at 65% 20%, rgba(124,58,237,0.18) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(245,200,66,0.08) 0%, transparent 45%)",
      }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        {[280, 400, 520].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              border: `1px solid rgba(245,200,66,${0.06 - i * 0.015})`,
              animation: `orbitSpin ${20 + i * 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "35%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(14,165,233,0.1),transparent)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="absolute bottom-0 pointer-events-none z-[2] hidden lg:block"
        style={{ left: "clamp(0px, 6vw, 80px)" }}
      >
        <Image
          src="/assets/mascot-gantari.png"
          alt="Gantari"
          width={300}
          height={460}
          style={{
            height: "clamp(260px,35vh,460px)",
            width: "auto",
            opacity: 0.92,
            filter: "drop-shadow(0 0 30px rgba(16,185,129,0.3))",
          }}
        />
      </div>
      <div
        className="absolute bottom-0 pointer-events-none z-[2] hidden lg:block"
        style={{ right: "clamp(0px, 4vw, 60px)" }}
      >
        <Image
          src="/assets/mascot-gilang.png"
          alt="Gilang"
          width={300}
          height={500}
          style={{
            height: "clamp(280px,38vh,500px)",
            width: "auto",
            opacity: 0.92,
            filter: "drop-shadow(0 0 30px rgba(59,130,246,0.3))",
          }}
        />
      </div>

      <div className="relative z-[3] max-w-[680px] mx-auto text-center animate-fadeUp">
        <div className="chip mb-6">✦ GELANGGANG EXPO UGM 2026</div>

        <h1
          className="font-orbitron font-black leading-[0.95] mb-6"
          style={{
            fontSize: "clamp(36px,7vw,88px)",
            letterSpacing: "0.06em",
            textWrap: "balance",
          }}
        >
          <span className="gold-text">GELANGGANG</span>
          <br />
          <span style={{ color: "#f1f5f9" }}>EXPO</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            2026
          </span>
        </h1>

        <p
          className="mb-9 mx-auto"
          style={{
            fontSize: "clamp(14px,1.8vw,18px)",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          {lang === "id" ? (
            <>
              Pameran tahunan UKM Universitas Gadjah Mada. Hadir langsung di{" "}
              <span style={{ color: "#f5c842" }}>Lapangan GSP, UGM</span> pada{" "}
              <span style={{ color: "#f5c842" }}>15–17 Agustus 2026</span>. Jelajahi
              39+ UKM, ikuti demo, dan rasakan vibes galaksi UGM secara live!
            </>
          ) : (
            <>
              The annual student organization expo of Universitas Gadjah Mada.
              Join us live at{" "}
              <span style={{ color: "#f5c842" }}>GSP Field, UGM</span> on{" "}
              <span style={{ color: "#f5c842" }}>August 15–17, 2026</span>.
              Explore 39+ student organizations, watch demos, and experience
              UGM's galaxy vibes live!
            </>
          )}
        </p>

        <div className="flex gap-3.5 flex-wrap justify-center">
          <Link href="/ukmatch">
            <button className="btn-primary" style={{ fontSize: "clamp(13px,1.5vw,16px)" }}>
              {tr(lang, "✦ Mulai Petualangan", "✦ Start Exploring")}
            </button>
          </Link>
          <Link href="/simulasi">
            <button className="btn-secondary" style={{ fontSize: "clamp(13px,1.5vw,16px)" }}>
              {tr(lang, "⊙ Simulasi UKM", "⊙ UKM Simulation")}
            </button>
          </Link>
        </div>

        <div className="flex gap-[clamp(20px,4vw,48px)] mt-14 justify-center flex-wrap">
          {[
            ["39+", tr(lang, "UKM Hadir", "UKMs Present")],
            [tr(lang, "3 Hari", "3 Days"), tr(lang, "15–17 Agt 2026", "Aug 15–17 2026")],
            ["4", tr(lang, "Fitur Digital", "Digital Features")],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div
                className="font-orbitron font-black"
                style={{
                  fontSize: "clamp(20px,3vw,28px)",
                  color: "#f5c842",
                  textShadow: "0 0 20px rgba(245,200,66,0.4)",
                }}
              >
                {n}
              </div>
              <div
                className="text-[11px] mt-1 uppercase tracking-[0.1em] font-bold"
                style={{ color: "#64748b" }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
