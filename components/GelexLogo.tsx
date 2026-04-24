import Image from "next/image";

interface GelexLogoProps {
  height?: number;
  className?: string;
}

export function GelexLogo({ height = 34, className = "" }: GelexLogoProps) {
  return (
    <Image
      src="/assets/logo-icon.svg"
      alt="GELEX Logo"
      width={Math.round(height * 0.4)}
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
