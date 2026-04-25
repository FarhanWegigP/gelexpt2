import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { StarCanvas } from "@/components/StarCanvas";
import { MiniPlayer } from "@/components/MiniPlayer";
import { AccessibilityLayer } from "@/components/AccessibilityLayer";
import { LanguageProvider } from "@/components/LanguageProvider";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GELEX 2026 – Gelanggang Expo UGM",
  description:
    "Jelajahi galaksi UKM Universitas Gadjah Mada. Temukan unit kegiatan mahasiswa yang paling cocok denganmu di GELEX 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body>
        <LanguageProvider>
          <StarCanvas />
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 75% 10%, rgba(100,50,220,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 15% 85%, rgba(245,200,66,0.06) 0%, transparent 60%)",
            }}
          />
          <Nav />
          <main className="relative z-[1]">{children}</main>
          <MiniPlayer />
<AccessibilityLayer />
        </LanguageProvider>
      </body>
    </html>
  );
}
