import FAQSection from "@/components/FAQSection";
import HeroSection from "./page/HeroSection";
import LandingPage from "./page/LandingPage";
import MissionVisionSection from "@/components/MissionVisionSection";


export default function Home() {
  return (
    <>
      <HeroSection/>
     
      <LandingPage/>
      <MissionVisionSection />
      <FAQSection />
    </>
  );
}