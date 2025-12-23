// File: components/ui/footer.tsx
import Image from "next/image";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#005700] text-white pt-12 font-sans border-t border-white/10 flex flex-col justify-between h-full">
            {/* Container utama */}
            <div className="container mx-auto px-8 md:px-12 lg:px-24 mb-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                    {/* =======================
             KOLOM KIRI: Temukan Kami & Logo Mitra
             ======================= */}
                    <div className="space-y-6">
                        <div>
                            {/* Header Putih */}
                            <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">TEMUKAN KAMI</h3>

                            {/* Alamat */}
                            <div className="space-y-1 text-sm text-gray-100 leading-relaxed font-medium">
                                <p>Departemen Proteksi Tanaman</p>
                                <p>Fakultas Pertanian</p>
                                <p>Universitas Andalas</p>
                                <p>Kampus Unand Limau Manis</p>
                                <p>Padang</p>
                                <p>25163</p>
                            </div>
                        </div>

                        {/* Logo Mitra: Warna Asli (Tanpa Filter) */}
                        <div className="flex items-center gap-4 pt-4">
                            {/* Logo Kedjayan Bangsa */}
                            <div className="h-12 w-auto">
                                <img
                                    src="/images/logo-kedjayan.png"
                                    alt="Logo Kedjayan Bangsa"
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            {/* Logo Diktisaintek */}
                            <div className="h-12 w-auto">
                                <img
                                    src="/images/logo-diktisaintek.png"
                                    alt="Logo Diktisaintek"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* =======================
             KOLOM TENGAH: Ikuti Kami & Kontak
             ======================= */}
                    <div className="flex flex-col space-y-8">

                        {/* Bagian Atas: Ikuti Kami (Centered) */}
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">IKUTI KAMI</h3>
                            <div className="flex justify-center gap-6">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                                    aria-label="Youtube"
                                >
                                    <Youtube className="w-6 h-6 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Bagian Bawah: Kontak Kami (Fix Alignment) */}
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">KONTAK KAMI</h3>

                            {/* WRAPPER FIX:
                  w-fit + mx-auto = Membuat blok list berada di tengah.
                  items-start = Membuat isi list rata kiri (ikon lurus vertikal).
              */}
                            <div className="w-fit mx-auto">
                                <ul className="space-y-3 text-sm flex flex-col items-start">

                                    {/* Email */}
                                    <li className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-300 shrink-0" />
                                        <a href="mailto:proteksitanaman@agr.unand.ac.id" className="hover:text-white underline decoration-dotted text-left">
                                            proteksitanaman@agr.unand.ac.id
                                        </a>
                                    </li>

                                    {/* No Telp 1 */}
                                    <li className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-300 shrink-0" />
                                        <span className="text-left">(+62) 751 72701-72702</span>
                                    </li>

                                    {/* No Telp 2 */}
                                    <li className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-300 shrink-0" />
                                        <span className="text-left">(+62) 751 72702</span>
                                    </li>

                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* =======================
             KOLOM KANAN: Lokasi (Peta Memanjang)
             ======================= */}
                    <div className="flex flex-col md:items-end items-center text-center md:text-right">
                        <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider w-full md:w-fit">LOKASI KAMI</h3>

                        {/* Wrapper Peta */}
                        <div className="w-full max-w-[280px] h-56 bg-gray-200 rounded-lg overflow-hidden shadow-lg border-2 border-white/20 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3100492018316!2d100.45862237496513!3d-0.9145678990765876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7a1c7c9135d%3A0x6d90060965d13410!2sUniversitas%20Andalas!5e0!3m2!1sid!2sid!4v1708500000000!5m2!1sid!2sid"
                                width="100%"
                                height="100%"
                                style={{border:0}}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Klik peta untuk melihat rute
                        </p>
                    </div>

                </div>
            </div>

            {/* =======================
         BAGIAN BAWAH: Copyright & Batik
         ======================= */}
            <div className="w-full">
                {/* Copyright */}
                <div className="bg-[#004200] py-3 text-center border-t border-white/5 relative z-10">
                    <p className="text-xs text-gray-300 px-4">
                        © {new Date().getFullYear()} Departemen Proteksi Tanaman, Universitas Andalas. Hak Cipta Dilindungi.
                    </p>
                </div>

                {/* Batik: Aksen bawah */}
                <div className="w-full h-8 md:h-12 relative bg-[#002900]">
                    <Image
                        src="/images/pattern-batik.png"
                        alt="Motif Batik"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#005700]/50"></div>
                </div>
            </div>
        </footer>
    );
}