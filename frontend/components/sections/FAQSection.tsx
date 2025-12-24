"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

// --- DATA DUMMY FAQ ---
const FAQS = [
   {
      question: "Bagaimana cara mendaftar praktikum di Laboratorium Sistem Informasi?",
      answer: "Pendaftaran praktikum dapat dilakukan melalui portal akademik atau website resmi laboratorium pada menu 'Pendaftaran' saat periode pendaftaran dibuka."
   },
   {
      question: "Apakah mahasiswa luar jurusan boleh mengikuti workshop?",
      answer: "Ya, sebagian besar workshop kami terbuka untuk umum, namun beberapa workshop spesifik mungkin memprioritaskan mahasiswa jurusan terkait. Silakan cek detail pada setiap poster kegiatan."
   },
   {
      question: "Bagaimana prosedur pengajuan surat keterangan bebas lab?",
      answer: "Mahasiswa dapat mengajukan surat bebas lab dengan mengisi formulir online di website ini dan mengunggah bukti telah menyelesaikan semua tanggungan peminjaman alat."
   },
   {
      question: "Berapa lama proses peminjaman alat untuk penelitian?",
      answer: "Proses verifikasi peminjaman alat memakan waktu 1-2 hari kerja. Pastikan Anda mengajukan surat permohonan minimal 3 hari sebelum alat digunakan."
   },
   {
      question: "Apakah tersedia Wi-Fi gratis di area Laboratorium?",
      answer: "Ya, tersedia akses Wi-Fi gratis bagi seluruh mahasiswa aktif. Gunakan akun SSO universitas Anda untuk login ke jaringan 'UNAND-Hotspot'."
   },
   {
      question: "Bagaimana jika saya lupa password akun e-learning?",
      answer: "Silakan gunakan fitur 'Lupa Password' pada halaman login e-learning, atau hubungi tim IT support melalui layanan aduan yang tersedia di website ini."
   }
];

export default function FAQSection() {
   // State untuk melacak item mana yang sedang terbuka
   // null = tidak ada yang terbuka
   const [openIndex, setOpenIndex] = useState<number | null>(null);

   const toggleFAQ = (index: number) => {
      // Jika diklik item yang sama -> tutup (set null)
      // Jika diklik item beda -> buka item tersebut
      setOpenIndex(openIndex === index ? null : index);
   };

   return (
      <section className="bg-white py-16 md:py-24">
         <div className="container mx-auto px-6 md:px-12 lg:px-24">

            {/* HEADER FAQ */}
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
                  FAQ
               </h2>
               {/* Garis hijau pemanis */}
               <div className="w-16 h-1 bg-[#749F74] mx-auto mt-3 rounded-full"></div>
            </div>

            {/* GRID LAYOUT (1 Kolom HP, 2 Kolom Laptop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

               {FAQS.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                     <div
                        key={index}
                        onClick={() => toggleFAQ(index)}
                        className={`
                           cursor-pointer bg-white rounded-xl border border-gray-200 p-5 shadow-sm 
                           transition-all duration-300 hover:shadow-md
                           ${isOpen ? 'ring-1 ring-[#749F74] border-[#749F74]' : ''}
                        `}
                     >
                        <div className="flex gap-4 items-start">

                           {/* ICON PANAH (KIRI) */}
                           {/* Rotasi 90 derajat jika terbuka */}
                           <div className={`mt-0.5 text-[#749F74] transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                              <ChevronRight size={24} strokeWidth={2.5} />
                           </div>

                           {/* KONTEN TEKS */}
                           <div className="flex-1">
                              {/* Pertanyaan */}
                              <h3 className={`text-sm md:text-base font-bold text-gray-800 leading-snug ${isOpen ? 'mb-2' : 'mb-0'}`}>
                                 {item.question}
                              </h3>

                              {/* Jawaban (Muncul saat Open) */}
                              <div
                                 className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                              >
                                 <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                                    {item.answer}
                                 </p>
                              </div>
                           </div>

                        </div>
                     </div>
                  );
               })}

            </div>

         </div>
      </section>
   );
}