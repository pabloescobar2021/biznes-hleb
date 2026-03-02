"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const phone = process.env.NEXT_PUBLIC_PHONE 
  const email = process.env.NEXT_PUBLIC_EMAIL 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Главная", href: "/" },
    { name: "Каталог", href: "/catalog" },
    { name: "О нас", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full ">
      {/* Основная навигация */}
      <div
        style={{height: 'var(--header-height)'}}
        className={`w-full rounded-b-2xl bg-[rgba(255,251,245,0.7)] backdrop-blur-2xl transition-all duration-300 shadow-xs shadow-black/20
          ${isScrolled 
            ? " bg-[rgba(255,251,245,0.7)] backdrop-blur-2xl  "
            : "bg-(--color-bg) shadow-none "
          }
        `}
      >
        <div className="md:max-w-7xl mx-auto px-1 md:px-6">
          <div 
            className="md:grid md:grid-cols-[1fr_1fr_1fr] md:justify-center
                      flex justify-between items-center  
                      h-16 md:h-15"
          >
            
            {/* Логотип */}
            <Link href="/" className="flex items-center justify-start gap-1 select-none group">
              <Image
                src="/images/logo1.png"
                alt="Бизнес и Хлеб"
                loading="eager"
                width={70}
                height={80}
                className="translate-x-2 translate-y-1 w-18"
              />
              <div className="flex flex-col leading-tight">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-secondary)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    transition: 'color var(--transition)',
                  }}
                  className="group-hover:text-(--color-primary)"
                >
                  Бизнес и Хлеб
                </span>
                <span style={{ color: 'var(--color-muted)', fontSize: '0.72rem' }}>
                  Качество в каждой сделке
                </span>
              </div>
            </Link>


            {/* Навигация кнопки */}
            <nav className="hidden md:flex justify-center items-center gap-5 ">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    color: 'var(--color-text-soft)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all var(--transition)',
                    position: 'relative',
                  }}
                  className="group hover:text-(--color-primary)"
                >
                  {item.name}
                  <span
                    style={{ background: 'var(--color-primary)' }}
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              ))}
            </nav>



            {/* Правая часть */}
            <div className="flex items-center justify-end gap-4">

              {/* Контакты */}
              <div className="hidden md:flex flex-col items-start gap-0.5">
                <Link
                  href={`tel:${phone}`}
                  style={{
                    color: 'var(--color-muted)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    transition: 'color var(--transition)',
                  }}
                  className="hover:text-(--color-primary)"
                >
                  {phone}
                </Link>
                
                <Link
                  href={`mailto:${email}`}
                  style={{
                    color: 'var(--color-muted)',
                    fontSize: '0.88rem',
                    transition: 'color var(--transition)',
                  }}
                  className="hover:text-(--color-primary)"
                >
                  {email}
                </Link>
              </div>



              {/* Мобильное меню кнопка */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 hover:bg-white shadow-sm transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-900">
                  {isMobileMenuOpen ? (
                    <path d="M18 6 6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 12h16M4 6h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* Мобильное меню */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 rounded-b-2xl ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-2">
            {[
              { name: "Главная", href: "/" },
              { name: "Каталог", href: "/catalog" },
              { name: "О нас", href: "/about" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                {item.name}
              </a>
            ))}
            
            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {email}
              </a>
            </div>

            
          </nav>
        </div>
      </div>
    </header>
  );
}