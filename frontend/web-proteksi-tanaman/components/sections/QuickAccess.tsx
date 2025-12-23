import Link from "next/link";
import {
    UserPlus,   // Untuk PMB
    Leaf,       // Untuk Faperta
    Monitor,    // Untuk Ilearn
    Key,        // Untuk SSO
    BookOpen    // Untuk Jurnal
} from "lucide-react";

const QUICK_LINKS = [
    {
        title: "PMB",
        href: "https://pmb.unand.ac.id",
        icon: UserPlus,
        color: "text-blue-600",
        bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
        title: "Faperta",
        href: "https://faperta.unand.ac.id",
        icon: Leaf,
        color: "text-green-600",
        bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
        title: "Ilearn",
        href: "https://ilearn.unand.ac.id",
        icon: Monitor,
        color: "text-orange-600",
        bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
        title: "SSO",
        href: "https://sso.unand.ac.id",
        icon: Key,
        color: "text-purple-600",
        bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
        title: "Jurnal",
        href: "/jurnal",
        icon: BookOpen,
        color: "text-teal-600",
        bgColor: "bg-teal-50 hover:bg-teal-100",
    },
];

export default function QuickAccess() {
    return (
        // BAGIAN LUAR: Hijau #749F74
        <section className="bg-[#749F74] py-12">
            <div className="container mx-auto px-4">

                {/* BAGIAN DALAM*/}
                <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-xl p-6 md:p-8">

                    {/* Judul Section */}
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
                            Akses Cepat
                            {/* Garis hiasan */}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#749F74] rounded-full"></span>
                        </h2>
                    </div>

                    {/* GRID ICON*/}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {QUICK_LINKS.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex flex-col items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
                            >
                                {/* Kotak Icon: Diperkecil */}
                                <div className={`p-3 md:p-4 rounded-xl ${item.bgColor} transition-transform duration-300 group-hover:scale-105 group-hover:shadow-sm`}>
                                    <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
                                </div>

                                {/* Teks Judul */}
                                <span className="text-xs md:text-sm font-bold text-gray-700 text-center group-hover:text-[#749F74] transition-colors leading-tight">
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