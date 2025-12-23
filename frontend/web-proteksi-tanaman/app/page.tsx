import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccess from "@/components/sections/QuickAccess";
import VideoProfile from "@/components/sections/VideoProfile";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">

            {/* 1. Hero Slider */}
            <HeroSlider />

            {/* 2. Akses Cepat */}
            <QuickAccess />

            {/* 3. Video Profil Sarjana & Magister (BARU) */}
            <VideoProfile />

            {/* 4. Konten Lainnya */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    {/* Placeholder konten selanjutnya... */}
                </div>
            </section>

        </main>
    );
}