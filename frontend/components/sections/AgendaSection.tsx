"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";

// --- TIPE DATA ---
interface AgendaItem {
    id: number;
    title: string;
    dateRange: string;
    image: string;
    tags: string[];
}

// --- DATA DUMMY ---
const AGENDAS: AgendaItem[] = [
    {
        id: 1,
        title: "Kuliah Umum: Proteksi Tanaman di Era 5.0",
        dateRange: "12 Okt 2025",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop",
        tags: ["Umum", "Free Sertifikat", "Hybrid"],
    },
    {
        id: 2,
        title: "Workshop Bio-Pestisida Alami",
        dateRange: "15 - 17 Okt 2025",
        image: "https://images.unsplash.com/photo-1505373877741-e174b4cc1035?q=80&w=1000&auto=format&fit=crop",
        tags: ["Mahasiswa S1", "Offline", "Wajib"],
    },
    {
        id: 3,
        title: "Seminar Nasional Pertanian Berkelanjutan",
        dateRange: "20 Okt 2025",
        image: "https://images.unsplash.com/photo-1589330694653-4d5c95281743?q=80&w=1000&auto=format&fit=crop",
        tags: ["Nasional", "Berbayar", "SKP", "Umum"],
    },
    {
        id: 4,
        title: "Rapat Tinjauan Kurikulum 2025",
        dateRange: "25 Okt 2025",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
        tags: ["Internal", "Dosen", "Rapat"],
    },
    {
        id: 5,
        title: "Kunjungan Lapangan ke Balitbang",
        dateRange: "01 Nov 2025",
        image: "https://images.unsplash.com/photo-1628359355624-855775b5c9c8?q=80&w=1000&auto=format&fit=crop",
        tags: ["Mahasiswa S2", "Ekskursi"],
    },
    {
        id: 6,
        title: "Pelatihan Penulisan Jurnal Internasional",
        dateRange: "10 Nov 2025",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
        tags: ["Workshop", "S2 & S3", "Publikasi"],
    },
];

const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("umum") || t.includes("nasional")) return "bg-green-100 text-green-700 border-green-200";
    if (t.includes("free") || t.includes("gratis")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (t.includes("wajib") || t.includes("penting") || t.includes("internal")) return "bg-red-100 text-red-700 border-red-200";
    if (t.includes("online") || t.includes("hybrid") || t.includes("zoom")) return "bg-purple-100 text-purple-700 border-purple-200";
    if (t.includes("mahasiswa") || t.includes("dosen")) return "bg-orange-100 text-orange-700 border-orange-200";
    if (t.includes("berbayar")) return "bg-gray-100 text-gray-700 border-gray-200";
    return "bg-teal-50 text-teal-700 border-teal-200";
};

export default function AgendaSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = AGENDAS;

    const nextSlide = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const isEnd = currentIndex >= data.length - 1;
    const isStart = currentIndex === 0;

    return (
        <section className="bg-gray-50 py-16 md:py-20 overflow-hidden">

            {/* GLOBAL STYLE UTILITY */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <div className="container mx-auto px-6 md:px-12 lg:px-24">

                {/* HEADER */}
                <div className="flex justify-between items-end mb-8 md:mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Agenda Kegiatan
                        </h2>
                    </div>

                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={prevSlide}
                            disabled={isStart}
                            className={`p-2.5 rounded-full border transition-all ${isStart ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-[#749F74] text-[#749F74] hover:bg-[#749F74] hover:text-white'}`}
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={isEnd}
                            className={`p-2.5 rounded-full border transition-all ${isEnd ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-[#749F74] text-[#749F74] hover:bg-[#749F74] hover:text-white'}`}
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </div>

                {/* CAROUSEL TRACK */}
                <div className="relative">
                    <div className="overflow-hidden -mx-4 px-4 py-2">
                        <div
                            className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out [--slide-pct:100%] md:[--slide-pct:50%] lg:[--slide-pct:25%]"
                            // 3. Menggunakan Inline Style dengan kalkulasi CSS Variable (Aman dari Hydration)
                            style={{
                                transform: `translateX(calc(var(--slide-pct) * -${currentIndex}))`
                            }}
                        >
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                                >
                                    {/* ISI KARTU */}
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-100 overflow-hidden group">

                                        {/* GAMBAR FLYER */}
                                        <div className="p-5 pb-0">
                                            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>

                                        {/* KONTEN */}
                                        <div className="p-4 flex flex-col flex-1 text-center">

                                            <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-[#749F74] transition-colors">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium mb-3">
                                                <Calendar size={12} className="text-[#749F74]" />
                                                <span>{item.dateRange}</span>
                                            </div>

                                            {/* TAGS */}
                                            <div className="w-full overflow-hidden mb-4 relative">
                                                <div className="flex flex-nowrap gap-1.5 justify-center overflow-x-auto no-scrollbar scroll-smooth px-1">
                                                    {item.tags.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${getTagStyle(tag)}`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                                                <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                                            </div>

                                            <div className="mt-auto flex justify-end">
                                                <Link
                                                    href={`/agenda/${item.id}`}
                                                    className="text-[#749F74] font-semibold text-[10px] md:text-xs flex items-center gap-1 hover:gap-1.5 transition-all"
                                                >
                                                    Selengkapnya <ArrowRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NAVIGASI MOBILE */}
                    <div className="flex md:hidden justify-between mt-4 px-2">
                        <button onClick={prevSlide} disabled={isStart} className="p-2 border rounded-full disabled:opacity-30"><ChevronLeft size={20} /></button>
                        <button onClick={nextSlide} disabled={isEnd} className="p-2 border rounded-full disabled:opacity-30"><ChevronRight size={20} /></button>
                    </div>
                </div>

                {/* FOOTER BUTTON */}
                <div className="mt-10 flex justify-end">
                    <Link href="/agenda" className="inline-flex items-center gap-2 bg-[#749F74] hover:bg-[#5e855e] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Lihat Semua Agenda
                        <ChevronRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}