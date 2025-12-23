import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccess from "@/components/sections/QuickAccess";
import VideoProfile from "@/components/sections/VideoProfile";
import WelcomeSection from "@/components/sections/WelcomeSection";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <HeroSlider />
            <QuickAccess />
            <VideoProfile />

            {/* Bagian Sambutan Zig-Zag */}
            <WelcomeSection />

            {/* Footer atau konten lain nanti... */}
        </main>
    );
}