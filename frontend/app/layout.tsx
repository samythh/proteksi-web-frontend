// File: app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/ui/navbar"; //
import Footer from "@/components/ui/footer"; // Import Footer yang baru dibuat
import "./globals.css";

export const metadata: Metadata = {
    title: "Proteksi Tanaman - UNAND",
    description: "Website Departemen Proteksi Tanaman Universitas Andalas",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
        <body className="flex flex-col min-h-screen">
        {/* Navbar tetap di atas */}
        <Navbar />

        {/* Main content akan mengisi ruang kosong (flex-grow) */}
        <main className="flex-grow">
            {children}
        </main>

        {/* Footer di bagian paling bawah */}
        <Footer />
        </body>
        </html>
    );
}