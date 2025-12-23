import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccess from "@/components/sections/QuickAccess";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">

            {/* 1. Hero Slider */}
            <HeroSlider />

            {/* 2. Akses Cepat */}
            <QuickAccess />

            {/* 3. Konten Lainnya */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    {/* Konten selanjutnya... */}
                </div>
            </section>

        </main>
    );
}