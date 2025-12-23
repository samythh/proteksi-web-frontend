"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, Play, Pause } from "lucide-react";

// --- TIPE DATA ---
interface VideoSlide {
    id: number;
    header: string;
    description: string;
    videoTitle: string;
    videoUrl: string;
}

// --- DATA DUMMY ---
const DUMMY_VIDEOS: VideoSlide[] = [
    {
        id: 1,
        header: "PROGRAM SARJANA (S1)",
        description: "Mencetak sarjana pertanian yang kompeten, inovatif, dan berkarakter dalam bidang proteksi tanaman untuk mendukung ketahanan pangan nasional.",
        videoTitle: "Profil Lulusan Sarjana",
        videoUrl: "https://videos.pexels.com/video-files/4440938/4440938-hd_1920_1080_25fps.mp4",
    },
    {
        id: 2,
        header: "PROGRAM MAGISTER (S2)",
        description: "Mengembangkan riset mendalam dan solusi terpadu hama penyakit tanaman dengan pendekatan teknologi molekuler dan ekologis terkini.",
        videoTitle: "Riset Unggulan Magister",
        videoUrl: "https://videos.pexels.com/video-files/5527814/5527814-hd_1920_1080_25fps.mp4",
    },
];

export default function VideoProfile() {
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const data = DUMMY_VIDEOS;

    // --- LOGIKA NAVIGASI ---
    const nextSlide = () => {
        setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
        setProgress(0);
    };

    const goToSlide = (index: number) => {
        setCurrent(index);
        setProgress(0);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            const percent = duration > 0 ? (current / duration) * 100 : 0;
            setProgress(percent);
        }
    };

    // Toggle Play/Pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    // Efek ganti slide
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        }
    }, [current]);

    const activeSlide = data[current];

    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden group">

            {/* 1. VIDEO PLAYER */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover transition-transform duration-2000 scale-105"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={nextSlide}

                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}

                    muted
                    loop={false}
                    playsInline
                >
                    <source src={activeSlide.videoUrl} type="video/mp4" />
                    Browser Anda tidak mendukung tag video.
                </video>
            </div>

            {/* 2. OVERLAY GRADIENT */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-0" />

            {/* 3. KONTEN TEKS UTAMA */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 pb-40">
                <div key={activeSlide.id} className="max-w-2xl space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl animate-fade-in-up">
                        {activeSlide.header}
                    </h1>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed drop-shadow-lg animate-fade-in-up delay-100">
                        {activeSlide.description}
                    </p>
                    <div className="animate-fade-in-up delay-200">
                        <button className="px-8 py-3 bg-[#005700] hover:bg-[#004200] text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(0,87,0,0.5)] border border-green-500/30 flex items-center gap-2 group/btn w-fit hover:scale-105 active:scale-95">
                            <span>Selengkapnya</span>
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. PLAYLIST BAR (FLOATING) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-black/95 via-black/60 to-transparent pt-20 pb-12">
                <div className="container mx-auto px-8 md:px-16 lg:px-24">

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-12">

                        {data.map((item, index) => {
                            const isActive = index === current;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => goToSlide(index)}
                                    className={`cursor-pointer group/item transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
                                >
                                    {/* Judul Video & Status Play */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm md:text-base font-bold tracking-wide drop-shadow-md ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                          {item.videoTitle}
                                        </span>

                                        {isActive && (
                                            <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-[#005700] hover:text-green-400 transition-colors">
                                                {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
                                            </button>
                                        )}
                                    </div>

                                    {/* Loading Bar */}
                                    <div className="relative h-[3px] w-full bg-gray-600/50 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div className="absolute inset-0 bg-white/10"></div>
                                        {isActive && (
                                            <div
                                                className="absolute left-0 top-0 h-full bg-[#005700] shadow-[0_0_10px_#005700]"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        )}
                                    </div>

                                    {/* Status Text */}
                                    <div className="mt-1 text-[10px] text-gray-400 font-mono text-left drop-shadow-sm">
                                        {isActive ? (
                                            <span className="text-green-400 animate-pulse">● Sedang Diputar ({Math.round(progress)}%)</span>
                                        ) : (
                                            <span>Klik untuk memutar</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

        </section>
    );
}