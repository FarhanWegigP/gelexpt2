import type { Metadata } from "next";
import { AnthemClient } from "@/components/anthem/AnthemClient";

export const metadata: Metadata = {
  title: "Anthem · GELEX 2026",
  description: "Anthem resmi Gelanggang Expo UGM 2026 dengan lirik sinkron dan TTS.",
};

export default function AnthemPage() {
  return <AnthemClient />;
}
