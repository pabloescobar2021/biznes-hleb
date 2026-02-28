"use client"
import { useState, useMemo } from "react";

import { CategorySidebar } from "./CategorySidebar";
import { ProductCard } from "./components/ProductCard";
import { Category, Product } from "../types/types";


export const revalidate = 300;

const productImgs: Record<string, string> = {
        "Изюм": "/images/product/izum1.png",
        "Масла": "/images/product/maslo1.png",
        "Кондитерские ингредиенты": "/images/product/kondit1.png",
        "Пищевые добавки": "/images/product/pish1.png",
        "Плёнка": "/images/product/plenka1.png",
        "Сухофрукты": "/images/product/suh1.png",
        "Орехи": "/images/product/nuts1.png",
        "Хлебопекарные ингредиенты": "/images/product/hleb1.png",
        "Семена и растительные ингредиенты": "/images/product/nuts1.png",
        "Молочные ингредиенты": "/images/product/molok1.png",
        "Цукаты": "/images/product/cukati1.png",
        "Упаковка": "/images/product/upakovka1.png",
    }
export function CatalogLayout({
    categories,
    products,
    activeSlug
}: {
    categories: Category[];
    products: Product[];
    activeSlug?: string;
}) {
    const [viewMode, setViewMode] = useState<'grid'|'list'>("grid");
    const [query, setQuery] = useState<string>("");

    
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if(!q) return products
        return products.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.description?.toLowerCase().includes(q)
        )
    }, [query, products])

    

    return (
        <main 
            className="flex w-full h-full bg-gray-50 py-2"
            // style={{ height: 'calc(100dvh - var(--header-height))' }}
        >

            {/* ===== Sidebar категорий ===== */}
            <CategorySidebar 
                categories={categories} 
                activeSlug={activeSlug}
                viewMode={viewMode}
                setViewMode={setViewMode}
                />


            {/* ===== Сетка товаров ===== */}
            <section className="flex-1 min-w-0  px-6">
                <div className="flexC w-full p-2">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Поиск..."
                        className="input-primary"
                    />
                </div>

                {filtered.length === 0 && (
                    <div className="flexC w-full p-2">
                        <p className="text-muted">Ничего не нашлось</p>
                    </div>
                )}

                {viewMode === "grid" ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "1.25rem",
                    }}>
                        {filtered.map((product) => (
                            <GridCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 ">
                        {filtered.map((product) => (
                            <ListCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

function GridCard({ product }: { product: Product }) {
    return (
        <article className="card flex flex-col">
            <div style={{
                background: "var(--color-primary-light)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2.5rem",
            }}
                className="h-[150px] md:h-[170px]"
            >
                {/* img товара */}
                <img src={product.category?.name ? productImgs[product.category.name] : product.image_url} alt={product.description} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="p-3 flex flex-col gap-1 flex-1">
                {/* Название товавра */}
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)", fontSize: "1rem", fontWeight: 700 }}>
                    {product.name}
                </h3>
                {/* Описание товара */}
                <p style={{ color: "var(--color-muted)", fontSize: "0.8rem", lineHeight: 1.5,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                }}>
                    {product.description}
                </p>
                <button className="btn-primary mt-auto" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                    Подробнее
                </button>
            </div>
        </article>
    );
}

function ListCard({ product }: { product: Product }) {
    return (
        <article
            className="relative card flex gap-4 p-4 items-center"
            style={{ borderRadius: "var(--radius-md)" }}
        >
            <div style={{
                flexShrink: 0,
                background: "var(--color-primary-light)",
                borderRadius: "var(--radius-md)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", overflow: "hidden",
            }}
                className="w-8 h-8" 
            >
                {product.image_url
                    ? <img src={product.image_url} 
                    alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : "🌰"
                }
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)", fontSize: "1.1rem", fontWeight: 700 }}>
                    {product.name}
                </h3>
                <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", lineHeight: 1.5 }}
                    className="line-clamp-2"
                >
                    {product.description}
                </p>
            </div>

            
        </article>
    );
}