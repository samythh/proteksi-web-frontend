"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// --- 1. DATA DUMMY ---
const FACILITIES = [
   {
      id: 1,
      title: "Laboratorium Sentral",
      description: "Laboratorium utama yang digunakan untuk penelitian tingkat lanjut dengan peralatan standar internasional. Mendukung kegiatan praktikum mahasiswa dan riset dosen dalam bidang proteksi tanaman. Fasilitas ini menjamin akurasi data dan keamanan kerja bagi seluruh civitas akademika.",
      youtubeId: "ysz5S6PUM-U",
      images: ["https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"]
   },
   {
      id: 2,
      title: "Rumah Kaca (Greenhouse)",
      description: "Fasilitas rumah kaca modern dengan kontrol suhu otomatis untuk eksperimen tanaman dalam kondisi lingkungan terkendali. Memungkinkan penelitian sepanjang tahun tanpa terpengaruh cuaca ekstrem di luar ruangan.",
      youtubeId: "LXb3EKWsInQ",
      images: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop"]
   },
   {
      id: 3,
      title: "Kebun Percobaan",
      description: "Lahan seluas 2 hektar yang digunakan untuk praktek lapangan dan pengujian varietas, serta studi ekologi hama penyakit secara langsung di alam terbuka.",
      youtubeId: "ScMzIvxBSi4",
      images: ["https://images.unsplash.com/photo-1628359355624-855775b5c9c8?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1599598425947-320d3b66479f?q=80&w=800&auto=format&fit=crop"]
   },
   {
      id: 4,
      title: "Klinik Tanaman",
      description: "Pusat layanan diagnosa penyakit tanaman bagi masyarakat umum dan petani. Dilengkapi dengan mikroskop digital dan perangkat uji cepat molekuler.",
      youtubeId: "p3X9Vl3JqOQ",
      images: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"]
   },
   {
      id: 5,
      title: "Perpustakaan Departemen",
      description: "Menyediakan ribuan koleksi buku, jurnal internasional, dan skripsi mahasiswa terdahulu sebagai referensi studi yang lengkap bagi mahasiswa tingkat akhir.",
      youtubeId: "jNQXAC9IVRw",
      images: ["https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop"]
   }
];

// --- 2. KOMPONEN ITEM ---
interface ItemProps {
   item: typeof FACILITIES[0];
   isLast: boolean; // Prop untuk cek item terakhir (garis pembatas)
   onImageClick: (url: string) => void;
}

const FacilityItem = ({ item, isLast, onImageClick }: ItemProps) => {
   const scrollRef = useRef<HTMLDivElement>(null);

   // Fungsi Scroll Panah Kiri/Kanan
   const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
         const scrollAmount = 300;
         scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
         });
      }
   };

   return (
      <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">

         {/* BAGIAN ATAS */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* KOLOM KIRI: Judul & Deskripsi */}
            <div className="flex flex-col gap-4">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-left">
                  {item.title}
               </h2>
               <p className="text-gray-600 leading-relaxed text-justify">
                  {item.description}
               </p>
            </div>

            {/* KOLOM KANAN: Video Youtube */}
            <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
               <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                  title={`Video profil ${item.title}`}
                  className="w-full h-full"
                  allowFullScreen
               />
            </div>
         </div>

         {/* BAGIAN TENGAH: Carousel Foto */}
         <div className="relative group/carousel w-full">
            {/* Panah Kiri */}
            <button
               onClick={() => scroll('left')}
               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-opacity -ml-4 hover:bg-white hover:scale-105"
            >
               <ChevronLeft size={24} className="text-gray-700" />
            </button>

            {/* Container Gambar */}
            <div
               ref={scrollRef}
               className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
               style={{ scrollbarWidth: 'none' }}
            >
               {item.images.map((imgUrl, idx) => (
                  <div
                     key={idx}
                     onClick={() => onImageClick(imgUrl)}
                     className="flex-shrink-0 w-[200px] md:w-[250px] aspect-[4/3] relative rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group/img transition-all"
                  >
                     <Image
                        src={imgUrl}
                        alt={`Foto ${idx}`}
                        fill
                        className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                  </div>
               ))}
            </div>

            {/* Panah Kanan */}
            <button
               onClick={() => scroll('right')}
               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-opacity -mr-4 hover:bg-white hover:scale-105"
            >
               <ChevronRight size={24} className="text-gray-700" />
            </button>
         </div>

         {/* BAGIAN BAWAH: Tombol Selengkapnya (Kanan Bawah) */}
         <div className="flex justify-end">
            <Link
               href={`/fasilitas/${item.id}`}
               className="flex items-center gap-2 bg-[#749F74] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#5e855e] transition-colors shadow-sm hover:shadow-md text-sm md:text-base"
            >
               Selengkapnya <ArrowRight size={18} />
            </Link>
         </div>

         {/* Garis Pembatas (Abu-abu), Muncul jika bukan item terakhir */}
         {!isLast && (
            <hr className="border-t border-gray-200 mt-4" />
         )}

      </div>
   );
};

// --- 3. KOMPONEN UTAMA ---
export default function FacilitiesListSection() {
   // CONFIG: Mulai dengan 2 item agar tombol "Muat Lebih Banyak" muncul
   const [itemsCnt, setItemsCnt] = useState(2);
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   const currentItems = FACILITIES.slice(0, itemsCnt);
   const hasMore = itemsCnt < FACILITIES.length;

   return (
      <section className="bg-white py-16 px-4 md:px-12 min-h-screen">
         <div className="container mx-auto max-w-6xl">

            {/* List Items */}
            <div className="flex flex-col gap-12">
               {currentItems.map((item, index) => (
                  <FacilityItem
                     key={item.id}
                     item={item}
                     // Kirim prop isLast agar garis pembatas muncul dengan benar
                     isLast={index === currentItems.length - 1}
                     onImageClick={setSelectedImage}
                  />
               ))}
            </div>

            {/* --- TOMBOL LOAD MORE (BAHASA INDONESIA) --- */}
            <div className="mt-16 flex justify-center pb-10">
               {hasMore ? (
                  <button
                     onClick={() => setItemsCnt(prev => prev + 2)}
                     className="group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-wide bg-[#749F74] text-white hover:bg-[#5e855e] shadow-lg hover:shadow-xl transition-all active:scale-95 uppercase"
                  >
                     MUAT LEBIH BANYAK <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                  </button>
               ) : (
                  <div className="text-gray-400 text-sm font-medium italic border px-4 py-2 rounded-full bg-gray-50 animate-in fade-in">
                     — Semua fasilitas telah ditampilkan —
                  </div>
               )}
            </div>

         </div>

         {/* Modal Popup (Lightbox) */}
         {selectedImage && (
            <div
               className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
               onClick={() => setSelectedImage(null)}
            >
               <button className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 bg-white/10 rounded-full">
                  <X size={32} />
               </button>
               <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
                  <Image src={selectedImage} alt="Fullscreen Preview" fill className="object-contain" priority />
               </div>
            </div>
         )}
      </section>
   );
}