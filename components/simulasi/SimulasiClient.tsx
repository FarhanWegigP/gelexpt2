"use client";

import { OrbitGalaxySection } from "./OrbitGalaxySection";

export function SimulasiClient() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
<OrbitGalaxySection className="min-h-screen flex items-center justify-center" sectionPadding="32px 24px 88px" showLegend={false} />
    </div>
  );
}
