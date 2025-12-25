"use client";

import { useState, useEffect } from "react";
import {
   Accessibility,
   X,
   Type,
   SunMoon,
   Link as LinkIcon,
   RefreshCcw,
   EyeOff,
   LucideIcon
} from "lucide-react";

export default function AccessibilityWidget() {
   const [isOpen, setIsOpen] = useState(false);

   // State untuk fitur-fitur
   const [isHighContrast, setIsHighContrast] = useState(false);
   const [isLargeText, setIsLargeText] = useState(false);
   const [isLinksHighlighted, setIsLinksHighlighted] = useState(false);
   const [isImagesHidden, setIsImagesHidden] = useState(false);

   // --- LOGIKA PENERAPAN STYLE ---
   useEffect(() => {
      // 1. High Contrast
      if (isHighContrast) {
         document.documentElement.style.filter = "grayscale(100%) contrast(120%)";
      } else {
         document.documentElement.style.filter = "none";
      }

      // 2. Large Text
      if (isLargeText) {
         document.documentElement.style.fontSize = "120%";
      } else {
         document.documentElement.style.fontSize = "100%";
      }

      // 3. Highlight Links
      if (isLinksHighlighted) {
         document.body.classList.add("access-highlight-links");
      } else {
         document.body.classList.remove("access-highlight-links");
      }

      // 4. Hide Images
      if (isImagesHidden) {
         document.body.classList.add("access-hide-images");
      } else {
         document.body.classList.remove("access-hide-images");
      }

   }, [isHighContrast, isLargeText, isLinksHighlighted, isImagesHidden]);

   // Fungsi Reset Semua
   const resetAll = () => {
      setIsHighContrast(false);
      setIsLargeText(false);
      setIsLinksHighlighted(false);
      setIsImagesHidden(false);
   };

   return (
      <>
         <style dangerouslySetInnerHTML={{
            __html: `
        body.access-highlight-links a {
          text-decoration: underline !important;
          background-color: yellow !important;
          color: black !important;
          font-weight: bold !important;
        }
        
        body.access-hide-images img,
        body.access-hide-images video,
        body.access-hide-images iframe {
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}} />

         {/* --- TOMBOL FLOAT UTAMA --- */}
         <div className="fixed bottom-24 right-8 z-50">

            <button
               onClick={() => setIsOpen(!isOpen)}
               className="bg-[#005320] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white"
               aria-label="Menu Aksesibilitas"
            >
               {isOpen ? <X size={24} /> : <Accessibility size={24} />}
            </button>

            {/* --- MENU POPUP --- */}
            {isOpen && (
               <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl p-5 border border-gray-200 animate-in fade-in slide-in-from-bottom-5">

                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                     <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Accessibility size={18} className="text-[#749F74]" />
                        Aksesibilitas
                     </h3>
                     <button
                        onClick={resetAll}
                        className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
                     >
                        <RefreshCcw size={12} /> Reset
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <FeatureButton
                        active={isHighContrast}
                        onClick={() => setIsHighContrast(!isHighContrast)}
                        icon={SunMoon}
                        label="Kontras +"
                     />
                     <FeatureButton
                        active={isLargeText}
                        onClick={() => setIsLargeText(!isLargeText)}
                        icon={Type}
                        label="Teks Besar"
                     />
                     <FeatureButton
                        active={isLinksHighlighted}
                        onClick={() => setIsLinksHighlighted(!isLinksHighlighted)}
                        icon={LinkIcon}
                        label="Sorot Link"
                     />
                     <FeatureButton
                        active={isImagesHidden}
                        onClick={() => setIsImagesHidden(!isImagesHidden)}
                        icon={EyeOff}
                        label="Hapus Gambar"
                     />
                  </div>

                  <div className="mt-4 text-[10px] text-center text-gray-400">
                     Accessibility Tools
                  </div>

               </div>
            )}
         </div>
      </>
   );
}

// Interface Props (Mempertahankan perbaikan TypeScript sebelumnya)
interface FeatureButtonProps {
   active: boolean;
   onClick: () => void;
   icon: LucideIcon;
   label: string;
}

function FeatureButton({ active, onClick, icon: Icon, label }: FeatureButtonProps) {
   return (
      <button
         onClick={onClick}
         className={`
        flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all border
        ${active
               ? "bg-[#749F74] text-white border-[#749F74] shadow-inner"
               : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
            }
      `}
      >
         <Icon size={24} />
         <span className="text-xs font-semibold">{label}</span>
      </button>
   );
}