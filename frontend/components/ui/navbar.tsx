"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- TIPE DEFINISI ---
type MenuItemChild = {
  title: string;
  href: string;
  children?: MenuItemChild[];
};

type MenuItem = {
  title: string;
  href?: string;
  children?: MenuItemChild[];
};

// --- DATA MENU ---
const menuItems: MenuItem[] = [
  { title: "Beranda", href: "/" },
  {
    title: "Profil",
    children: [
      { title: "Sejarah", href: "/profil/sejarah" },
      { title: "Visi Misi", href: "/profil/visi-misi" },
    ],
  },
  {
    title: "Akademik",
    children: [
      { title: "Sarjana", href: "/akademik/s1" },
      { title: "Pascasarjana", href: "/akademik/s2" },
    ],
  },
  {
    title: "Riset & Publikasi",
    children: [
      { title: "Riset", href: "/riset" },
      { title: "Publikasi", href: "/publikasi" },
    ],
  },
  {
    title: "Penjaminan Mutu",
    children: [
      { title: "SOP", href: "/penjaminan-mutu/sop" },
      { title: "Dokumen", href: "/penjaminan-mutu/dokumen" },
    ],
  },
  {
    title: "Informasi",
    children: [
      { title: "Berita", href: "/informasi/berita" },
      { title: "Pengumuman", href: "/informasi/pengumuman" },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Helper render untuk Desktop Nested Menu
  const renderMenuItem = (item: MenuItemChild, index: number) => {
    // 1. Jika punya anak (Nested Group)
    if (item.children && item.children.length > 0) {
      return (
        <li key={index} className="rounded-md bg-slate-50 p-3">
          <div className="mb-2 text-sm font-bold text-green-800">
            {item.title}
          </div>
          <ul className="space-y-1 border-l-2 border-slate-200 pl-2">
            {item.children.map((grandChild, grandIdx) => (
              <li key={grandIdx}>
                <NavigationMenuLink asChild>
                  <Link
                    href={grandChild.href}
                    className="block text-sm text-slate-600 hover:text-green-700 hover:underline transition-colors"
                  >
                    {grandChild.title}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    // 2. Jika item biasa (Link)
    return (
      <li key={index}>
        <NavigationMenuLink asChild>
          <Link
            href={item.href}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
          >
            <div className="text-sm font-medium leading-none">{item.title}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  };

  return (
    <nav className="w-full bg-[#005320] text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* === LOGO & BRANDING === */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            {/* Logo dengan shield-like border */}
            <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
              <Image
                src="/LogoUNAND.png"
                alt="Logo Unand"
                width={40}
                height={40}
                className="relative z-10"
              />
            </div>
            {/* Vertical line separator */}
            <div className="h-10 w-px bg-white/30" aria-hidden="true" />
            {/* Text branding */}
            <div className="flex flex-col leading-tight">
              <span className="font-bold md:text-lg tracking-wide text-xs">
                Departemen Proteksi Tanaman
              </span>
              <span className="text-sm font-light text-gray-200">
                Fakultas Pertanian
              </span>
            </div>
          </Link>
        </div>

        {/* === DESKTOP MENU === */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.children ? (
                  // Kalo ada Dropdown
                  <>
                    <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/20 focus:text-white data-[state=open]:bg-white/20 font-bold flex items-center gap-1">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-2 p-4 bg-white text-black rounded-md shadow-lg">
                        {item.children.map((child, childIdx) =>
                          renderMenuItem(child, childIdx)
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  // Kalo Link Biasa (Beranda)
                  // PERBAIKAN UTAMA DI SINI:
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href || "#"}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/20 focus:text-white font-bold cursor-pointer"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* === RIGHT ICONS === */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
          {/* Language selector with Indonesian flag */}
          <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors">
            <div className="flex items-center">
              {/* Indonesian flag */}
              <div className="w-5 h-3 border border-white/30 flex flex-col">
                <div className="h-1/2 bg-red-600" />
                <div className="h-1/2 bg-white" />
              </div>
              <span className="ml-2 text-sm font-semibold">ID</span>
            </div>
          </button>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU (Sederhana tanpa Radix UI biar ringan) === */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
          <ul className="flex flex-col gap-2 pt-4 px-2">
            {menuItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                {item.children ? (
                  <>
                    <span className="px-4 py-2 font-bold text-lg text-yellow-400 border-b border-white/10 mb-2">
                      {item.title}
                    </span>
                    <ul className="pl-6 flex flex-col gap-2">
                      {item.children.map((child, cIdx) => (
                        <li key={cIdx}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 text-gray-200 hover:text-white"
                          >
                            • {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-lg font-bold hover:bg-white/10 rounded"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
