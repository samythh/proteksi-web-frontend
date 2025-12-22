// File: components/sections/HeroSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

// --- DEFINISI TIPE DATA ---
interface SlideImage {
    data: {
        attributes: {
            url: string;
            alternativeText?: string;
        };
    } | null;
}

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    image?: SlideImage;
}

interface HeroSliderProps {
    data?: {
        slides: Slide[];
    };
}

// --- DATA DUMMY ---
const dummySlides: Slide[] = [
    {
        id: 1,
        title: "INOVASI PROTEKSI TANAMAN",
        subtitle: "Mewujudkan pertanian berkelanjutan dengan teknologi deteksi dini hama dan penyakit berbasis kecerdasan buatan.",
        image: {
            data: {
                attributes: {
                    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop"
                }
            }
        }
    },
    {
        id: 2,
        title: "RISET BERDAMPAK LUAS",
        subtitle: "Kolaborasi riset unggulan untuk menciptakan varietas tanaman yang tahan terhadap perubahan iklim ekstrem.",
        image: {
            data: {
                attributes: {
                    url: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c8019?q=80&w=1740&auto=format&fit=crop"
                }
            }
        }
    },
    {
        id: 3,
        title: "PENGABDIAN MASYARAKAT",
        subtitle: "Turun langsung mendampingi petani dalam menerapkan teknik pengendalian hama terpadu yang ramah lingkungan.",
        image: {
            data: {
                attributes: {
                    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1740&auto=format&fit=crop"
                }
            }
        }
    }
];

export default function HeroSlider({ data }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);

    const slides = data?.slides && data.slides.length > 0 ? data.slides : dummySlides;
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        if (length <= 1) return;
        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);
        return () => clearTimeout(timer);
    }, [current, length]);

    const getImageUrl = (image: SlideImage | undefined) => {
        const url = image?.data?.attributes?.url;
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;
    };

    if (!slides || slides.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center bg-gray-200 text-gray-500">
                No Slides Data Available
            </div>
        );
    }

    return (
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden group">
            {slides.map((slide, index) => {
                const imageUrl = getImageUrl(slide.image);
                const isActive = index === current;

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* LAYER 1: GAMBAR */}
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-600">
                                <ImageIcon size={64} className="mb-2 opacity-20" />
                            </div>
                        )}

                        {/* LAYER 2: GRADIENT OVERLAY */}
                        {/* Gradien Bawah ke Atas (Agar footer slider jelas) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                        {/* Gradien Kiri ke Kanan (PENTING UNTUK RATA KIRI) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent opacity-90" />

                        {/* LAYER 3: KONTEN TEKS - PENEGASAN RATA KIRI */}
                        {/* - items-start: Memaksa semua anak (text, btn) menempel ke KIRI.
                           - text-left: Memastikan alinea teks rata KIRI.
                           - pl-8 md:pl-20: Memberikan jarak (padding) dari sisi KIRI layar.
                        */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-8 md:px-20 lg:px-32 z-20 w-full">

                            {/* Judul Utama */}
                            <h2
                                className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-xl transition-all duration-700 delay-100 transform max-w-4xl leading-tight ${
                                    isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                }`}
                            >
                                {slide.title}
                            </h2>

                            {/* Subjudul */}
                            <p
                                className={`text-gray-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed drop-shadow-md transition-all duration-700 delay-200 transform ${
                                    isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                }`}
                            >
                                {slide.subtitle}
                            </p>

                            {/* Tombol Selengkapnya */}
                            {/* Div pembungkus juga defaultnya block, jadi akan mengikuti items-start dari parent */}
                            <div className={`mt-8 transition-all duration-500 delay-300 transform ${
                                isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}>
                                <button
                                    className="px-8 py-3 bg-[#005700] hover:bg-[#004200] text-white rounded-full font-medium transition-all shadow-lg border border-green-500/30 hover:scale-105 active:scale-95"
                                >
                                    Selengkapnya
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* LAYER 4: NAVIGASI (PANAH & DOTS) */}
            {length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-all z-30 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-all z-30 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                                    idx === current ? 'w-8 bg-[#005700] border border-white/50' : 'w-2 bg-white/50 hover:bg-white'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}