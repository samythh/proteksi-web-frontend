"use client";

import Link from "next/link";
import {
   GraduationCap,
   BookOpen,
   Library,
   Database,
   MonitorPlay,
   MessageSquareWarning
} from "lucide-react";

const OTHER_LINKS = [
   {
      id: 1,
      title: "Sistem Akademik",
      href: "https://portal.unand.ac.id",
      icon: GraduationCap
   },
   {
      id: 2,
      title: "E-Learning",
      href: "/elearning",
      icon: MonitorPlay
   },
   {
      id: 3,
      title: "Perpustakaan",
      href: "/library",
      icon: Library
   },
   {
      id: 4,
      title: "Repository",
      href: "/repository",
      icon: Database
   },
   {
      id: 5,
      title: "Jurnal Online",
      href: "/jurnal",
      icon: BookOpen
   },
   {
      id: 6,
      title: "Layanan Aduan",
      href: "/aduan",
      icon: MessageSquareWarning
   },
];

export default function OtherLinksSection() {
   return (
      <section className="bg-white py-16 md:py-24">
         <div className="container mx-auto px-6 md:px-12 lg:px-24">

            {/* --- 1. KOTAK BESAR WARNA HIJAU (CONTAINER) --- */}
            <div className="bg-[#749F74] rounded-[2.5rem] px-6 py-12 md:px-16 md:py-16 shadow-xl relative overflow-hidden">

               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none"></div>

               {/* HEADER */}
               <div className="text-center mb-10 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                     Lainnya
                  </h2>
               </div>

               {/* --- 2. GRID KOTAK KECIL (ITEMS) --- */}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 relative z-10">

                  {OTHER_LINKS.map((item) => (
                     <Link
                        key={item.id}
                        href={item.href}
                        className="group bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[130px]"
                     >
                        {/* Icon: Warna Hijau  */}
                        <div className="p-3 rounded-full bg-green-50 text-[#749F74] group-hover:bg-[#749F74] group-hover:text-white transition-colors duration-300">
                           <item.icon size={28} strokeWidth={2} />
                        </div>

                        {/* Teks: Warna Hitam/Gelap */}
                        <span className="font-bold text-gray-800 text-xs md:text-sm leading-tight group-hover:text-[#749F74] transition-colors">
                           {item.title}
                        </span>
                     </Link>
                  ))}

               </div>

            </div>

         </div>
      </section>
   );
}