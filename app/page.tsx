import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { Footer } from "@/components/Footer";
import { SplashIntro } from "@/components/landing/SplashIntro";
import { OrbitGalaxySection } from "@/components/simulasi/OrbitGalaxySection";

export default function Home() {
  return (
    <>
      <SplashIntro />
      <HeroSection />
      <OrbitGalaxySection sectionPadding="40px 24px 72px" />
      <FeaturesSection />
      <AboutSection />
      <Footer />
    </>
  );
}
