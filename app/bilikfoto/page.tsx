import type { Metadata } from "next";
import { BilikFotoClient } from "@/components/bilikfoto/BilikFotoClient";

export const metadata: Metadata = {
  title: "Bilik Foto · GELEX 2026",
  description: "Foto bersama teman dengan filter UKM favoritmu!",
};

export default function BilikFotoPage() {
  return <BilikFotoClient />;
}
