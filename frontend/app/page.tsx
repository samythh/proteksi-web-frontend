import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccess from "@/components/sections/QuickAccess";
import VideoProfile from "@/components/sections/VideoProfile";
import WelcomeSection from "@/components/sections/WelcomeSection";
import StatsAndAccreditation from "@/components/sections/StatsAndAccreditation";
import LatestNews from "@/components/sections/LatestNews";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />
      <QuickAccess />
      <VideoProfile />
      <WelcomeSection />
      <StatsAndAccreditation />
      <LatestNews />
    </main>
  );
}
