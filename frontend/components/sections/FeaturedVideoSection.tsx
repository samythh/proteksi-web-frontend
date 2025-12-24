"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// --- TIPE DATA DUMMY ---
interface VideoItem {
   id: number;
   title: string;
   youtubeId: string;
}

// --- DATA DUMMY ---
const VIDEOS: VideoItem[] = [
   { id: 1, title: "Profil Universitas Andalas: Kampus Hijau", youtubeId: "ysz5S6PUM-U" },
   { id: 2, title: "Inovasi Teknologi Pertanian Masa Depan", youtubeId: "ScMzIvxBSi4" },
   { id: 3, title: "Kegiatan Mahasiswa di Laboratorium Lapangan", youtubeId: "LXb3EKWsInQ" },
   { id: 4, title: "Webinar Nasional: Ketahanan Pangan", youtubeId: "p3X9Vl3JqOQ" },
   { id: 5, title: "Testimoni Alumni Sukses", youtubeId: "jNQXAC9IVRw" },
];

export default function FeaturedVideoSection() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);

   const totalVideos = VIDEOS.length;

   const handleNext = () => {
      setIsPlaying(false);
      setActiveIndex((prev) => (prev + 1) % totalVideos);
   };

   const handlePrev = () => {
      setIsPlaying(false);
      setActiveIndex((prev) => (prev - 1 + totalVideos) % totalVideos);
   };

   // --- LOGIKA POSISI BERTUMPUK (STACKED) ---
   const getCardStyle = (index: number) => {
      let offset = (index - activeIndex + totalVideos) % totalVideos;
      if (offset > totalVideos / 2) {
         offset -= totalVideos;
      }

      if (offset === 0) {
         // TENGAH (AKTIF)
         return "z-30 scale-100 opacity-100 translate-x-0 pointer-events-auto shadow-2xl";
      } else if (offset === -1) {
         // KIRI (BELAKANG)
         return "z-20 scale-90 opacity-60 -translate-x-[35%] md:-translate-x-[30%] pointer-events-none blur-[1px] grayscale-[50%]";
      } else if (offset === 1) {
         // KANAN (BELAKANG)
         return "z-20 scale-90 opacity-60 translate-x-[35%] md:translate-x-[30%] pointer-events-none blur-[1px] grayscale-[50%]";
      } else {
         // SEMBUNYI DI BELAKANG TENGAH
         return "z-10 scale-75 opacity-0 translate-x-0 pointer-events-none";
      }
   };

   return (
      <section className="bg-gray-50 py-20 md:py-28 overflow-hidden relative group/section">

         {/* Pattern Grid Halus */}
         <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

         <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 h-full">

            {/* HEADER */}
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Galeri Video
               </h2>
               <div className="w-20 h-1.5 bg-[#749F74] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* --- AREA CAROUSEL BERTUMPUK --- */}
            <div className="relative w-full h-[250px] md:h-[400px] lg:h-[480px] flex items-center justify-center">

               {VIDEOS.map((video, index) => {
                  const isActive = index === activeIndex;
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

                  return (
                     <div
                        key={video.id}
                        className={`absolute top-0 left-0 right-0 mx-auto w-[85%] md:w-[60%] lg:w-[55%] aspect-video rounded-2xl bg-black overflow-hidden transition-all duration-700 ease-in-out transform-gpu border border-gray-200 ${getCardStyle(index)}`}
                     >

                        {isActive && isPlaying ? (
                           <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                           ></iframe>
                        ) : (
                           <div className="relative w-full h-full group/video cursor-pointer" onClick={() => isActive && setIsPlaying(true)}>
                              {/* Thumbnail */}
                              <Image
                                 src={thumbnailUrl}
                                 alt={video.title}
                                 fill
                                 className="object-cover"
                              />

                              {/* Overlay Gelap */}
                              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? 'group-hover/video:bg-black/30' : ''}`}></div>

                              {/* Konten Tengah */}
                              <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>

                                 <div className="mb-6 p-4 md:p-5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white group-hover/video:scale-110 group-hover/video:bg-[#749F74] group-hover/video:border-transparent transition-all duration-300 shadow-lg">
                                    <Play size={32} fill="currentColor" className="md:w-10 md:h-10 ml-1" />
                                 </div>

                                 <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-lg">
                                    {video.title}
                                 </h3>
                              </div>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            {/* --- NAVIGASI ARROW --- */}
            <button
               onClick={handlePrev}
               className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-white text-gray-600 shadow-md hover:bg-[#749F74] hover:text-white transition-all -ml-2 md:ml-0 border border-gray-100"
            >
               <ChevronLeft size={28} className="md:w-8 md:h-8" />
            </button>

            <button
               onClick={handleNext}
               className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-white text-gray-600 shadow-md hover:bg-[#749F74] hover:text-white transition-all -mr-2 md:mr-0 border border-gray-100"
            >
               <ChevronRight size={28} className="md:w-8 md:h-8" />
            </button>

         </div>
      </section>
   );
}