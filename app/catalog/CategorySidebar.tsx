"use client";

import { Icon } from "@/lib/Svgs/svg";
import Link from "next/link";
import { useState, memo } from "react";

interface Props {
  categories: any[];
  activeSlug?: string;
  activeColor?: string;
}

// Утилиты цвета оставляем (они быстрые), но SidebarLink упрощаем
const SidebarLink = memo(({ href, isActive, accentColor, count, children }: any) => {
  // Вычисляем цвета один раз для ссылки
  const [h, s, l] = hexToHsl(accentColor);
  const textInactive = `hsla(${h}, ${s}%, 88%, 1)`;
  const bgHover = `hsla(${h}, ${s}%, 35%, 0.5)`;

  return (
    <Link
      href={href}
      className={`
        group flex justify-between items-center px-3 py-2.5 rounded-xl 
        transition-all duration-150 text-sm font-medium
      `}
      style={{ 
        // Используем inline-style только для динамических цветов, 
        // которые зависят от категории, но ховер сделаем через класс ниже
        backgroundColor: isActive ? accentColor : undefined,
        color: isActive ? "#ffffff" : textInactive,
      }}
      // Используем CSS переменные для передачи цвета в Tailwind
      onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = bgHover)}
      onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <span className="truncate">{children}</span>
      {count !== undefined && (
        <span className="ml-2 text-xs flex-shrink-0 tabular-nums opacity-60">
          {count}
        </span>
      )}
    </Link>
  );
});

// Основной сайдбар
export function CategorySidebar({ categories, activeSlug, activeColor = "#92400e" }: Props) {
  const [open, setOpen] = useState(true);

  const [h, s, l] = hexToHsl(activeColor);
  const sidebarBg = `hsl(${h}, ${Math.min(s + 10, 100)}%, ${Math.max(l - 18, 8)}%)`;
  const headerColor = `hsla(${h}, ${s}%, 88%, 1)`;
  const dividerColor = `hsla(${h}, ${s}%, 40%, 0.4)`;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed md:relative w-58 flex flex-col z-40 overflow-hidden transition-all duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          backgroundColor: sidebarBg,
          backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)`,
          transitionProperty: "background-color, transform",
          boxShadow: "var(--shadow-sidebar)",
          borderRadius: "0 1rem 1rem 0",
        }}
      >
        <div className="flex flex-col p-3 gap-1 h-[calc(100dvh-80px)]">
          <h2 
            className="px-3 pb-3 pt-1 text-xs font-bold tracking-[0.2em]" 
            style={{ color: headerColor, fontSize: 30 }}>
            КАТАЛОГ
          </h2>
          <div className="mx-3 mb-2 h-px" style={{ background: dividerColor }} />
          
          <div className="flex flex-col gap-0.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <SidebarLink href="/catalog" isActive={!activeSlug} accentColor={activeColor}>
              Все товары
            </SidebarLink>
            {categories?.map((cat) => (
              <SidebarLink 
                key={cat.id} 
                href={`/catalog/${cat.slug}`} 
                isActive={activeSlug === cat.slug} 
                accentColor={activeColor}
                count={cat.products?.[0]?.count}
              >
                {cat.name}
              </SidebarLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Кнопка открытия мобильная */}
        {!open && (
        <button
            className="fixed bottom-6 left-4 z-50 md:hidden px-4 py-3 rounded-full shadow-lg text-white"
            style={{ background: activeColor }}
            onClick={() => setOpen(true)}
        >
            <Icon name="sideBarOpen" className="w-5 h-5" />
        </button>
        )}
    </>
  );
}

// Вспомогательная функция (вынеси её в utils.ts если можно)
function hexToHsl(hex: string): [number, number, number] {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
