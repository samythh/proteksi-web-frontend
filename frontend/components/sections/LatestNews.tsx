import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

// --- TIPE DATA ---
type NewsType = "Pengumuman" | "Berita" | "Acara";

interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
    type: NewsType;
    description?: string;
}

// --- DATA DUMMY ---
const MAIN_NEWS: NewsItem = {
    id: 1,
    title: "Welcome Tahreem, Far from Pakistan",
    date: "Selasa, 23 September 2025",
    type: "Pengumuman",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    description:
        "Welcome Tahreem di Kursus Musim Panas Perlindungan Tanaman 2025 diselenggarakan oleh Departemen Perlindungan Tanaman, Fakultas Pertanian, Universitas Andalas, bekerja sama dengan Program Ekuitas.",
};

const SIDE_NEWS: NewsItem[] = [
    {
        id: 2,
        title: "SUMMER COURSE ON PLANT PROTECTION 2025",
        date: "Selasa, 23 September 2025",
        type: "Acara",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Universitas Andalas and Hue University Begin Collaboration",
        date: "Selasa, 23 September 2025",
        type: "Berita",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Pelatihan Bioekologi Wereng Padi Bersama Dr. My Syahrawati",
        date: "Selasa, 23 September 2025",
        type: "Acara",
        image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Berbagi dengan petani terkait pengendalian wereng batang coklat",
        date: "Selasa, 23 September 2025",
        type: "Berita",
        image: "https://images.unsplash.com/photo-1595835026938-163e77840132?q=80&w=1000&auto=format&fit=crop",
    },
];

// --- HELPER: WARNA TAG ---
const getTagColor = (type: NewsType) => {
    switch (type) {
        case "Pengumuman":
            return "bg-red-600";
        case "Acara":
            return "bg-green-500";
        case "Berita":
            return "bg-blue-600";
        default:
            return "bg-gray-600";
    }
};

export default function LatestNews() {
    return (
        <section className="bg-white py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">

                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Berita Terkini
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">

                    {/* --- KOLOM KIRI: BOX UTAMA (BESAR) --- */}
                    <Link href={`/berita/${MAIN_NEWS.id}`} className="lg:col-span-2 group/main">
                        <div className="bg-[#749F74] rounded-2xl overflow-hidden shadow-lg h-full flex flex-col p-5 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">

                            {/* Gambar Utama */}
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src={MAIN_NEWS.image}
                                    alt={MAIN_NEWS.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/main:scale-105"
                                />

                                {/* Gradien Overlay (Biru Gelap #0E295D) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E295D]/90 via-transparent to-transparent"></div>

                                {/* Tag Kanan Atas */}
                                <span className={`absolute top-4 right-4 ${getTagColor(MAIN_NEWS.type)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                  {MAIN_NEWS.type}
                </span>

                                {/* Tanggal Kanan Bawah */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    <Calendar size={14} />
                                    <span className="text-xs font-medium">{MAIN_NEWS.date}</span>
                                </div>
                            </div>

                            {/* Konten Teks Box Utama */}
                            <div className="pt-6 pb-2 text-white flex-1 flex flex-col justify-start">
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover/main:text-green-100 transition-colors">
                                    {MAIN_NEWS.title}
                                </h3>
                                <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3">
                                    {MAIN_NEWS.description}
                                </p>
                            </div>

                        </div>
                    </Link>


                    {/* --- KOLOM KANAN: BOX KECIL (LIST) --- */}
                    <div className="flex flex-col gap-6">
                        {SIDE_NEWS.map((item) => (
                            <Link key={item.id} href={`/berita/${item.id}`}>
                                <div className="group flex flex-row gap-4 items-start bg-white p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 hover:shadow-sm">

                                    {/* Gambar Kecil */}
                                    {/* Rasio 4:3 (w-32 h-24) */}
                                    <div className="relative w-28 h-20 md:w-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Konten Teks */}
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <h4 className="text-sm md:text-base font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#749F74] transition-colors">
                                            {item.title}
                                        </h4>

                                        {/* Tanggal */}
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                            <Calendar size={12} />
                                            <span>{item.date}</span>
                                        </div>

                                        {/* Tag */}
                                        <div className="mt-1">
                       <span className={`${getTagColor(item.type)} text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block shadow-sm`}>
                          {item.type}
                       </span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}

                        {/* Tombol Lebih Banyak */}
                        <div className="mt-4 flex justify-end">
                            <Link href="/berita" className="inline-flex items-center gap-2 bg-[#749F74] hover:bg-[#5e855e] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Lebih Banyak
                                <ChevronRight size={16} />
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}