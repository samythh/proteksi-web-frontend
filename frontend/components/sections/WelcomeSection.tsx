import Image from "next/image";

// --- TIPE DATA ---
interface ProfileData {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
}

// --- DATA DUMMY ---
const PROFILES: ProfileData[] = [
    {
        name: "Dr. Ir. Bahlil Lahadalia, M.P.",
        role: "Kepala Departemen",
        description:
            "Selamat datang di Departemen Proteksi Tanaman. Kami berkomitmen untuk mengembangkan ilmu pengetahuan dan teknologi pengelolaan hama dan penyakit tumbuhan yang berwawasan lingkungan dan berkelanjutan demi ketahanan pangan nasional.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Prof. Dr. Ir. Siti Nurbaya, M.Sc.",
        role: "Kaprodi Sarjana (S1)",
        description:
            "Program Studi Sarjana Proteksi Tanaman dirancang untuk mencetak lulusan yang tangguh, inovatif, dan mampu memberikan solusi nyata terhadap permasalahan hama penyakit di lapangan dengan pendekatan terpadu.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Dr. Eng. Rudi Hartono, S.P., M.Si.",
        role: "Kaprodi Magister (S2)",
        description:
            "Pada tingkat Magister, kami menekankan pada riset mendalam mengenai bioteknologi proteksi tanaman dan epidemiologi molekuler untuk menjawab tantangan pertanian modern di era globalisasi.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    },
];

export default function WelcomeSection() {
    return (
        <section className="bg-white pt-16 md:pt-24 pb-48 md:pb-80 overflow-hidden relative z-10">
            <div className="container mx-auto px-8 md:px-24 lg:px-48 space-y-20 md:space-y-32">

                {PROFILES.map((profile, index) => {
                    const isImageLeft = index % 2 !== 0;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                                isImageLeft ? "md:flex-row-reverse" : "md:flex-row"
                            }`}
                        >

                            {/* --- BAGIAN TEKS --- */}
                            <div className="flex-1 space-y-5 text-left">
                                <div>
                   <span className="text-[#749F74] font-bold tracking-wider text-sm uppercase mb-2 block">
                      Sambutan
                   </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                                        {profile.role}
                                    </h2>
                                    {/* Garis Hijau */}
                                    <div className="w-16 h-1 bg-[#749F74] mt-3 rounded-full"></div>
                                </div>

                                <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
                                    {profile.description}
                                </p>
                            </div>

                            {/* --- BAGIAN GAMBAR --- */}
                            <div className="w-full md:w-5/12 relative group">

                                <div className="relative w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">

                                    <Image
                                        src={profile.imageUrl}
                                        alt={profile.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay Gradien Hitam */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                                    {/* Nama & Jabatan */}
                                    <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full">
                                        <h3 className="text-white text-lg md:text-xl font-bold leading-tight">
                                            {profile.name}
                                        </h3>
                                        <p className="text-gray-300 text-xs md:text-sm mt-1 font-medium">
                                            {profile.role}
                                        </p>
                                    </div>

                                </div>

                                {/* Dekorasi Belakang*/}
                                <div className={`absolute -z-10 w-full h-full border-2 border-[#749F74]/30 rounded-2xl top-3 
                  ${isImageLeft ? "left-3" : "-left-3"}
                `}></div>
                            </div>

                        </div>
                    );
                })}

            </div>
        </section>
    );
}