import Link from "next/link";
import {
    UserPlus, Leaf, Monitor, Key, BookOpen
} from "lucide-react";

// Konfigurasi data menu akses cepat
const QUICK_LINKS = [
    {
        title: "PMB",
        href: "https://pmb.unand.ac.id",
        icon: UserPlus,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
    {
        title: "Faperta",
        href: "https://faperta.unand.ac.id",
        icon: Leaf,
        color: "text-green-600",
        bgColor: "bg-green-100",
    },
    {
        title: "Ilearn",
        href: "https://ilearn.unand.ac.id",
        icon: Monitor,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
    },
    {
        title: "SSO",
        href: "https://sso.unand.ac.id",
        icon: Key,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
    },
    {
        title: "Jurnal",
        href: "/jurnal",
        icon: BookOpen,
        color: "text-teal-600",
        bgColor: "bg-teal-100",
    },
];

export default function QuickAccess() {
    return (
        <section className="bg-[#749F74] py-24">
            <div className="container mx-auto px-4">

                {/* Container putih utama */}
                <div className="bg-white max-w-5xl mx-auto rounded-xl shadow-2xl p-8 md:p-10 relative z-10">

                    {/* Header Judul */}
                    <div className="text-center mb-8">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
                            Akses Cepat
                            {/* Elemen dekoratif garis bawah */}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#749F74] rounded-full"></span>
                        </h2>
                    </div>

                    {/* Grid Layout untuk item menu */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {QUICK_LINKS.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex flex-col items-center gap-3"
                            >
                                {/* Kotak Ikon Besar */}
                                <div className={`
                  flex items-center justify-center 
                  w-20 h-20 md:w-24 md:h-24 
                  rounded-2xl ${item.bgColor} 
                  shadow-sm transition-transform duration-300 group-hover:scale-110
                `}>
                                    <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color}`} />
                                </div>

                                {/* Teks Judul Menu */}
                                <span className="text-sm md:text-base font-bold text-gray-700 text-center group-hover:text-[#749F74] transition-colors leading-tight">
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