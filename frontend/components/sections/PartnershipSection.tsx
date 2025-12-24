"use client";

import Image from "next/image";

// --- 1. DEFINISI TIPE DATA (INTERFACE) ---
interface PartnerItem {
   id: number;
   name: string;
   logo: string;
}

// --- DATA DUMMY ---
const PARTNERS: PartnerItem[] = [
   { id: 1, name: "Universitas Andalas", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Lambang_Universitas_Andalas.svg/1200px-Lambang_Universitas_Andalas.svg.png" },
   { id: 2, name: "Kementerian Pertanian", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo_Kementerian_Pertanian_Republik_Indonesia.svg/2048px-Logo_Kementerian_Pertanian_Republik_Indonesia.svg.png" },
   { id: 3, name: "BRIN", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Logo_Badan_Riset_dan_Inovasi_Nasional_%28BRIN%29_Indonesia.svg/1200px-Logo_Badan_Riset_dan_Inovasi_Nasional_%28BRIN%29_Indonesia.svg.png" },
   { id: 4, name: "IPB University", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Lambang_IPB.svg" },
   { id: 5, name: "Universitas Gadjah Mada", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Lambang_Universitas_Gadjah_Mada.svg/1200px-Lambang_Universitas_Gadjah_Mada.svg.png" },
   { id: 6, name: "Universitas Brawijaya", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Logo_Universitas_Brawijaya.svg/1200px-Logo_Universitas_Brawijaya.svg.png" },
];

const MARQUEE_SET = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function PartnershipSection() {
   return (
      <section className="bg-[#749F74] pt-16 pb-48 md:pb-64 overflow-hidden relative group/section">
         <div className="container mx-auto px-6 md:px-12 lg:px-24 relative">

            {/* HEADER */}
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Kerja Sama
               </h2>
            </div>

            {/* --- MARQUEE TRACK AREA --- */}
            <div
               className="w-full overflow-hidden"
               style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
               <div className="flex w-full hover:pause-animation">

                  {/* SET 1 */}
                  <div className="flex gap-8 py-4 animate-marquee min-w-full flex-shrink-0 items-center justify-around pr-8">
                     {MARQUEE_SET.map((item, index) => (
                        <CardMitra key={`s1-${item.id}-${index}`} item={item} />
                     ))}
                  </div>

                  {/* SET 2 */}
                  <div className="flex gap-8 py-4 animate-marquee min-w-full flex-shrink-0 items-center justify-around pr-8" aria-hidden="true">
                     {MARQUEE_SET.map((item, index) => (
                        <CardMitra key={`s2-${item.id}-${index}`} item={item} />
                     ))}
                  </div>

               </div>
            </div>

         </div>

         <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .pause-animation:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      </section>
   );
}

function CardMitra({ item }: { item: PartnerItem }) {
   return (
      <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-lg overflow-hidden group/card cursor-pointer transform transition-transform hover:scale-105 flex-shrink-0">
         <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full h-full">
               <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
               />
            </div>
         </div>

         <div className="absolute inset-0 bg-[#005700]/90 flex items-center justify-center p-4 text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <span className="text-white font-bold text-xs md:text-sm leading-tight">
               {item.name}
            </span>
         </div>
      </div>
   );
}