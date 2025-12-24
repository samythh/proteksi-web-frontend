"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BarChart3, CalendarDays, CalendarRange, Globe } from "lucide-react";

interface VisitorData {
   today: number;
   thisWeek: number;
   thisMonth: number;
   allTime: number;
}

export default function VisitorStats() {
   const [stats, setStats] = useState<VisitorData>({
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      allTime: 0
   });

   useEffect(() => {
      // Simulasi Data
      setTimeout(() => {
         setStats({
            today: 124,
            thisWeek: 892,
            thisMonth: 3401,
            allTime: 45290
         });
      }, 1000);
   }, []);

   const STAT_ITEMS = [
      { label: "Hari Ini", value: stats.today, icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Minggu Ini", value: stats.thisWeek, icon: CalendarDays, color: "text-green-600", bg: "bg-green-50" },
      { label: "Bulan Ini", value: stats.thisMonth, icon: CalendarRange, color: "text-orange-600", bg: "bg-orange-50" },
      { label: "Total Kunjungan", value: stats.allTime, icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
   ];

   return (
      // Section utama
      <section className="relative z-20 pb-24 bg-white">

         <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="relative w-full h-full">
               <Image
                  src="/images/pattern-batik-besar.png"
                  alt="Pattern Batik"
                  fill
                  // object-cover: Memastikan batik memenuhi area
                  // object-top: Memulai motif dari atas (dekat hijau)
                  className="object-cover object-top"
               />
            </div>
         </div>

         {/* 2. FLOATING BOX STATISTIK */}
         <div className="container mx-auto px-6 md:px-12 lg:px-32 relative z-10">

            {/* Negative Margin untuk efek tumpuk (Overlap) */}
            {/* Box ini akan duduk di perbatasan: Atasnya Hijau, Bawahnya Batik */}
            <div className="-mt-32 md:-mt-40 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-gray-100">

               {/* Header */}
               <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                     Statistik Kunjungan
                  </h2>
               </div>

               {/* Grid Data */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                  {STAT_ITEMS.map((item, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-2 pt-4 md:pt-0">

                        <div className={`mb-3 p-3 rounded-full ${item.bg} ${item.color} transform transition-transform hover:scale-110 shadow-sm`}>
                           <item.icon size={28} />
                        </div>

                        <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                           {item.value.toLocaleString('id-ID')}
                        </span>

                        <span className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wide">
                           {item.label}
                        </span>
                     </div>
                  ))}
               </div>

            </div>
         </div>

      </section>
   );
}