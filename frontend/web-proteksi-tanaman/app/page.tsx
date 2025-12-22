// File: app/page.tsx
import HeroSlider from "@/components/sections/HeroSlider"; // Memanggil komponen Slider

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">

            {/* 1. Hero Section (Slider) */}
            {/* Kita panggil komponennya di sini. Tidak perlu props 'data' karena sudah ada dummy di dalamnya. */}
            <HeroSlider />

            {/* 2. Konten Halaman Lainnya */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Selamat Datang</h2>
                    <p className="text-gray-600">
                        Ini adalah area konten di bawah slider. Anda bisa menambahkan fitur berita,
                        profil, atau layanan di bagian ini nantinya.
                    </p>
                </div>
            </section>

        </main>
    );
}