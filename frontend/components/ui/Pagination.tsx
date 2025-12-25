"use client";

import { ChevronDown } from "lucide-react";

interface PaginationProps {
   onLoadMore: () => void; // Fungsi saat diklik
   hasMore: boolean;       // Cek apakah masih ada data
   isLoading?: boolean;    // Status loading (opsional)
}

export default function Pagination({
   onLoadMore,
   hasMore,
   isLoading = false
}: PaginationProps) {

   // Jika hasMore = false (data habis), tampilkan pesan habis
   if (!hasMore) {
      return (
         <div className="mt-12 text-center animate-in fade-in">
            <span className="text-gray-400 text-sm font-medium italic border px-4 py-2 rounded-full bg-gray-50">
               — Semua fasilitas telah ditampilkan —
            </span>
         </div>
      );
   }

   // Jika hasMore = true, tampilkan tombol Load More
   return (
      <div className="mt-12 flex justify-center pb-10 animate-in fade-in slide-in-from-bottom-4">
         <button
            onClick={onLoadMore}
            disabled={isLoading}
            className={`
          group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-md active:scale-95
          ${isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#749F74] text-white hover:bg-[#5e855e] hover:shadow-lg hover:-translate-y-0.5"
               }
        `}
         >
            {isLoading ? "MEMUAT..." : "LOAD MORE"}
            {!isLoading && (
               <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
            )}
         </button>
      </div>
   );
}