"use client";

import Link from "next/link";
import Image from "next/image";
import { PhoneFooter, Icon } from "@/lib/Svgs/svg";
const navLinks = [
  { name: "Главная", href: "/" },
  { name: "Каталог", href: "/catalog" },
  { name: "О нас", href: "/about" },
];

const catalogLinks = [
  { name: "Сухофрукты", href: "/catalog/suhofructi" },
  { name: "Орехи", href: "/catalog/nuts" },
  { name: "Изюм", href: "/catalog/izum" },
  { name: "Цукаты", href: "/catalog/cukati" },
  { name: "Все товары", href: "/catalog" },
];

const phone = process.env.NEXT_PUBLIC_PHONE || "+7 (999) 000-00-00";
const email = process.env.NEXT_PUBLIC_EMAIL || "info@biznesihleb.ru";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-br from-[#2a0e02] via-[#3d1505] to-[#1a0801]">

      {/* фон */}
      <Image
        src="/images/footer2.png"
        alt="background"
        fill
        className="object-cover opacity-10 mix-blend-luminosity"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        {/* Сетка */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Бренд */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo1.png"
                alt="Бизнес и Хлеб Самара"
                width={50}
                height={50}
              />
              <div>
                <div className="font-bold text-lg">Бизнес и Хлеб</div>
                <div className="text-xs uppercase tracking-widest text-white/40">
                  Качество в каждой сделке
                </div>
              </div>
            </Link>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Оптовые поставки орехов, сухофруктов и цукатов по Самаре и Самарской области.
              Работаем с 2014 года.
            </p>

            <div className="flex gap-3">
              {["VK", "TG", "WA"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/50 hover:bg-amber-600/30 hover:border-amber-500/50 hover:text-amber-300 transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-5 border-b border-amber-600/30 pb-2">
              Навигация
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-amber-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-5 border-b border-amber-600/30 pb-2">
              Каталог
            </h3>
            <ul className="space-y-2">
              {catalogLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-amber-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-5 border-b border-amber-600/30 pb-2">
              Контакты
            </h3>

            <div className="space-y-4 text-sm">

              <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                <Icon name="phone" /> {phone}
              </a>

              <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                <Icon name="email" /> {email}
              </a>

              <div className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition">
                <Icon name="location" /> г. Самара, Самарская область
              </div>

              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-white/60">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Пн–Пт, 9:00–18:00
              </div>

            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 border-t border-white/10 pt-6">
          <div>© {year} Бизнес и Хлеб. Все права защищены.</div>

          <Link href="/privacy" className="hover:text-white transition">
            Политика конфиденциальности
          </Link>
        </div>

      </div>
    </footer>
  );
}