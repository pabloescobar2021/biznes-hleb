// components/CategorySidebar.tsx
"use client";

import { Icon } from "@/lib/Svgs/svg";
import Link from "next/link";
import { useState } from "react";

interface Props {
  categories: any[];
  activeSlug?: string;
  viewMode: 'grid'|'list';
  setViewMode: (viewMode: 'grid'|'list') => void;
}

export function CategorySidebar({ 
    activeSlug,
    categories,
    viewMode,
    setViewMode
}: Props) {
    const [open, setOpen] = useState(true);

  return (
    <>
        {/* Оверлей — закрывает при клике мимо */}
        {open && (
            <div 
                className="fixed inset-0 bg-black/40 z-30 md:hidden"
                onClick={() => setOpen(false)}
            />
        )}

        <aside
            style={{
                background: 'var(--color-secondary)',    // #92400e тёмно-коричневый
                boxShadow: 'var(--shadow-sidebar)',
                // height: 'calc(100dvh - var(--header-height))'
            }}
            className={`fixed  md:relative w-58 flex flex-col z-40  p-3 text-white rounded-r-2xl overflow-hidden transition-all duration-150
            ${open ? '' : '-translate-x-full'}    
            `}
            >
            
            <div className="absolute top-3 right-3 md:hidden" onClick={() => setOpen(prev => !prev)}>
                <Icon name="close" className=" w-5 h-5"  />
            </div>

            <div
                style={{ height: 'calc(100dvh - 100px)' }}
                className={`flex flex-col 
                `}
            >

                <h2
                    style={{ color: 'var(--color-primary-light)' }}
                    className="mb-4 text-lg font-semibold tracking-wide"
                >
                    Категории
                </h2>

                <div className=" flex flex-col overflow-y-auto ">
                    <Link
                        href="/catalog"
                        style={!activeSlug ? {
                        background: 'var(--color-primary)',   // #d97706 amber — активный
                        color: '#fff',
                        } : {
                        color: 'var(--color-primary-light)',  // #fef3c7 — неактивный
                        }}
                        className={`block px-3 py-2 rounded-xl transition text-sm font-medium ${
                        !activeSlug ? '' : 'hover:bg-white/10'
                        }`}
                    >
                        Все товары
                    </Link>

                    {categories?.map((cat) => {
                        const count = cat.products?.[0]?.count ?? 0;
                        const isActive = activeSlug === cat.slug;

                        return (
                        <Link
                            key={cat.id}
                            href={`/catalog/${cat.slug}`}
                            className={`flex justify-between px-3 py-2 rounded-xl transition text-sm font-medium ${
                            isActive 
                                ? 'bg-(--color-primary) text-[#fff]' 
                                : 'text-(--color-primary-light) hover:bg-white/10'
                            }`}
                        >
                            <span>{cat.name}</span>
                            <span style={{ opacity: 0.6 }}>{count}</span>
                        </Link>
                        );
                    })}
                </div>

                <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                    <p style={{ color: "var(--color-primary-light)", fontSize: "0.75rem" }} className="mb-2 opacity-70">
                        Вид
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            title="Сеткой"
                            style={viewMode === "grid"
                                ? { background: "var(--color-primary)", color: "#fff" }
                                : { color: "var(--color-primary-light)" }
                            }
                            className="flex-1 flex items-center justify-center py-2 rounded-xl transition hover:bg-white/10"
                        >
                            {/* иконка сетки */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="3" width="8" height="8" rx="1.5"/>
                                <rect x="13" y="3" width="8" height="8" rx="1.5"/>
                                <rect x="3" y="13" width="8" height="8" rx="1.5"/>
                                <rect x="13" y="13" width="8" height="8" rx="1.5"/>
                            </svg>
                        </button>

                        <button
                            onClick={() => setViewMode("list")}
                            title="Списком"
                            style={viewMode === "list"
                                ? { background: "var(--color-primary)", color: "#fff" }
                                : { color: "var(--color-primary-light)" }
                            }
                            className="flex-1 flex items-center justify-center py-2 rounded-xl transition hover:bg-white/10"
                        >
                            {/* иконка списка */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="4" width="18" height="3" rx="1.5"/>
                                <rect x="3" y="10.5" width="18" height="3" rx="1.5"/>
                                <rect x="3" y="17" width="18" height="3" rx="1.5"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </aside>

        {/* Кнопка открытия — внизу экрана, удобно для большого пальца */}
        {!open && (
            <button
                className="fixed bottom-6 left-4 z-50 md:hidden
                        bg-(--color-secondary) text-white 
                        px-4 py-3 rounded-full shadow-lg"
                onClick={() => setOpen(true)}
            >
                <Icon name="sideBarOpen" className="w-5 h-5" />
            </button>
        )}
    </>
  );
}