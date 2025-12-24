import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccess from "@/components/sections/QuickAccess";
import VideoProfile from "@/components/sections/VideoProfile";
import WelcomeSection from "@/components/sections/WelcomeSection";
import StatsAndAccreditation from "@/components/sections/StatsAndAccreditation";
import LatestNews from "@/components/sections/LatestNews";
import AgendaSection from "@/components/sections/AgendaSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import VisitorStats from "@/components/sections/VisitorStats";
import FeaturedVideoSection from "@/components/sections/FeaturedVideoSection";


export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <HeroSlider />
            <QuickAccess />
            <VideoProfile />
            <WelcomeSection />
            <StatsAndAccreditation />
            <LatestNews />
            <AgendaSection />
            <PartnershipSection />
            <VisitorStats />
            <FeaturedVideoSection />

        </main>
    );
}