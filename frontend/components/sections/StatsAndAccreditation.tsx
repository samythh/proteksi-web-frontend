import Image from "next/image";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

// --- DATA DUMMY FAKTA & DATA ---
const STATS = [
    {
        id: 1,
        label: "Staff",
        value: "411",
        icon: Users,
    },
    {
        id: 2,
        label: "Mahasiswa S1",
        value: "1524",
        icon: GraduationCap,
    },
    {
        id: 3,
        label: "Mahasiswa S2",
        value: "1524",
        icon: GraduationCap,
    },
    {
        id: 4,
        label: "Alumni",
        value: "41",
        icon: BookOpen,
    },
];

export default function StatsAndAccreditation() {
    return (
        <section className="bg-[#749F74] pb-20 md:pb-32">

            {/* --- BAGIAN 1: FAKTA & DATA (FLOATING BOX) --- */}
            <div className="container mx-auto px-6 md:px-12 lg:px-32">
                <div className="bg-gray-50 rounded-4xl shadow-xl p-8 md:p-12 -mt-28 relative z-20">

                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Fakta & Data</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                        {STATS.map((stat) => (
                            <div key={stat.id} className="flex flex-col items-center gap-2 pt-4 md:pt-0">
                                {/* Icon */}
                                <div className="text-[#749F74] mb-2">
                                    <stat.icon size={48} strokeWidth={1.5} />
                                </div>

                                {/* Angka Bold */}
                                <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                    {stat.value}
                                </span>

                                {/* Label Kecil */}
                                <span className="text-sm md:text-base text-gray-500 font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>


            {/* --- BAGIAN 2: AKREDITASI --- */}
            <div className="container mx-auto px-6 md:px-12 lg:px-32 mt-20 md:mt-24 text-center">

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-12">
                    Akreditasi
                </h2>

                {/* Grid Sertifikat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center justify-center max-w-5xl mx-auto">

                    {/* Sertifikat S1 */}
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="relative w-full aspect-4/3 bg-white p-2 rounded-lg shadow-lg rotate-0 transition-transform duration-500 group-hover:rotate-1">
                            <Image
                                src="https://images.unsplash.com/photo-1589330694653-4d5c95281743?q=80&w=1000&auto=format&fit=crop"
                                alt="Sertifikat Akreditasi S1"
                                fill
                                className="object-contain border border-gray-100 rounded"
                            />
                        </div>
                        <p className="text-white font-semibold text-lg tracking-wide mt-2">
                            Sertifikat Akreditasi S1
                        </p>
                    </div>

                    {/* Sertifikat S2 */}
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="relative w-full aspect-4/3 bg-white p-2 rounded-lg shadow-lg rotate-0 transition-transform duration-500 group-hover:-rotate-1">
                            <Image
                                src="https://images.unsplash.com/photo-1635350644146-5912891b9428?q=80&w=1000&auto=format&fit=crop"
                                alt="Sertifikat Akreditasi S2"
                                fill
                                className="object-contain border border-gray-100 rounded"
                            />
                        </div>
                        <p className="text-white font-semibold text-lg tracking-wide mt-2">
                            Sertifikat Akreditasi S2
                        </p>
                    </div>

                </div>
            </div>

        </section>
    );
}