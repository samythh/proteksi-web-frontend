"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
   const [isVisible, setIsVisible] = useState(false);

   // Fungsi memantau posisi scroll
   const toggleVisibility = () => {
      if (window.scrollY > 300) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   // Fungsi scroll ke atas
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
         window.removeEventListener("scroll", toggleVisibility);
      };
   }, []);

   return (
      <button
         onClick={scrollToTop}
         aria-label="Kembali ke atas"
         className={`
        fixed bottom-8 right-8 z-50 
        p-3 rounded-full shadow-lg border border-white/20
        bg-[#749F74] text-white hover:bg-[#5e855e] hover:-translate-y-1
        transition-all duration-300 ease-in-out
        flex items-center justify-center
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
      >
         <ArrowUp size={24} strokeWidth={2.5} />
      </button>
   );
}