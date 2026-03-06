"use client";
import { useState, useMemo, useRef, useEffect,memo } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { Category, Product } from "../types/types";
import Link from "next/link";


// Цвет-акцент на полоску слева по категории
const CATEGORY_ACCENT: Record<string, string> = {
  "Орехи":                              "#d97706",
  "Изюм":                               "#059669",
  "Сухофрукты":                         "#ea580c",
  "Цукаты":                             "#db2777",
  "Масла":                              "#ca8a04",
  "Семена и растительные ингредиенты":  "#65a30d",
  "Кондитерские ингредиенты":           "#7c3aed",
  "Молочные ингредиенты":               "#0284c7",
  "Хлебопекарные ингредиенты":          "#c2410c",
  "Пищевые добавки":                    "#0891b2",
  "Упаковка":                           "#475569",
  "Плёнка":                             "#64748b",
};

const CATEGORY_ICON: Record<string, string> = {
  "Орехи":                              "🥜",
  "Изюм":                               "🍇",
  "Сухофрукты":                         "🍑",
  "Цукаты":                             "🍬",
  "Масла":                              "🫒",
  "Семена и растительные ингредиенты":  "🌿",
  "Кондитерские ингредиенты":           "🍫",
  "Молочные ингредиенты":               "🥛",
  "Хлебопекарные ингредиенты":          "🌾",
  "Пищевые добавки":                    "🧪",
  "Упаковка":                           "📦",
  "Плёнка":                             "🎁",
};

export function CatalogLayout({
  categories,
  products,
  activeSlug,
}: {
  categories: Category[];
  products: Product[];
  activeSlug?: string;
}) {
  const [query, setQuery] = useState("");


  const [currentColor, setCurrentColor] = useState("#d97706");
  const currentColorRef = useRef(currentColor);

  const pTableRef = useRef<(HTMLDivElement | null)[]>([]);


  /* ───────────── фильтр ───────────── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.manufacturer?.toLowerCase().includes(q)
    );
  }, [query, products]);


  /* ───────────── группировка ───────────── */
  const grouped = useMemo(() => {
    const map = new Map<string, { category: Category | undefined; items: Product[] }>();
    filtered.forEach((p) => {
      const key = p.category?.name ?? "Прочее";
      if (!map.has(key)) map.set(key, { category: p.category, items: [] });
      map.get(key)!.items.push(p);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const activeCategoryName = categories.find((c) => c.slug === activeSlug)?.name;
  const accentColor = activeCategoryName
    ? CATEGORY_ACCENT[activeCategoryName] ?? "var(--color-primary)"
    : "var(--color-primary)";


// смена фона sidibara
  useEffect(() => {
    const elements = Object.values(pTableRef.current)
    if(!elements.length) return

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting);

            if(!visibleEntry) return

            const catName = (visibleEntry.target as HTMLDivElement).dataset.category
            if(!catName) return

            const color = CATEGORY_ACCENT[catName] ?? "#d97706";
            if(color !== currentColorRef.current){
                currentColorRef.current = color
                setCurrentColor(color)
            }
        },
        {
            rootMargin: "-20% 0px -75% 0px", 
            threshold: 0
        }
    )

    elements.forEach((e) => e && observer.observe(e))
    return () => observer.disconnect()
  },[grouped])


  return (
    <main className="flex w-full min-h-screen py-2 pb-20" style={{ background: "var(--color-bg)" }}>

      {/* ── Sidebar ── */}
      <CategorySidebar
        categories={categories}
        activeSlug={activeSlug}
        activeColor={activeSlug
          ? CATEGORY_ACCENT[activeCategoryName ?? ""] ?? "#d97706"
          : currentColor
        }
      />

      {/* ── Content ── */}
      <section className="flex-1 min-w-0 px-4 md:px-8 py-6 flex flex-col gap-6">

        {/* ── Header строка ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {activeCategoryName ? (
              <div className="flex items-center gap-3">
                <span
                  className="w-1.5 h-8 rounded-full shrink-0"
                  style={{ background: accentColor }}
                />
                <h1
                  className={`text-2xl font-bold text-[${CATEGORY_ACCENT[activeCategoryName]}]`}
                  style={{
                    fontFamily: "var(--font-display)",
                    color: CATEGORY_ACCENT[activeCategoryName],
                    fontSize: 24,
                  }}
                >
                  {activeCategoryName}
                </h1>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  {filtered.length} позиций
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h1
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-secondary)",
                  }}
                >
                  Все товары
                </h1>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  {filtered.length} позиций
                </span>
              </div>
            )}
          </div>

          {/* Поиск */}
          <div className="relative sm:w-72">
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "var(--color-muted)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по каталогу..."
              className="input-primary p-5"
            />
          </div>
        </div>

        {/* ── Пусто ── */}
        {filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
            style={{ border: "1px dashed var(--color-border)" }}
          >
            <span className="text-4xl mb-4">🔍</span>
            <p className="font-semibold" style={{ color: "var(--color-secondary)" }}>
              Ничего не нашлось
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              Попробуйте изменить запрос
            </p>
          </div>
        )}

        {/* ── Список товаров ── */}
        <div className="flex flex-col gap-8">
          {/* Если открыта конкретная категория — плоский список */}
          {activeSlug ? (
            <ProductTable products={filtered} accentColor={accentColor} />
          ) : (
            // Если "все товары" — группируем по категориям
            grouped.map(([catName, { category, items }]) => {
              const color = CATEGORY_ACCENT[catName] ?? "var(--color-primary)";
              return (
                <div 
                    key={catName}
                    data-category={catName}
                    ref={(el) => {pTableRef.current[catName as any] = el} }
                >
                  {/* Заголовок группы */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{CATEGORY_ICON[catName] ?? "📦"}</span>
                    <h2
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: CATEGORY_ACCENT[catName] ?? "var(--color-primary)",
                      }}
                    >
                      {catName}
                    </h2>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color }}
                    >
                      {items.length}
                    </span>
                    {category && (
                      <Link
                        href={`/catalog/${category.slug}`}
                        className="ml-auto text-xs font-semibold transition-colors hover:underline"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Все в категории →
                      </Link>
                    )}
                  </div>
                  <ProductTable products={items} accentColor={color} />
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────
   ProductTable — основной компонент строк
───────────────────────────────────────────── */
const ProductTable = memo(function ProductTable({
  products,
  accentColor,
}: {
  products: Product[];
  accentColor: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Шапка таблицы — только на desktop */}
      <div
        className="hidden md:grid grid-cols-[1fr_2fr_auto_auto] gap-4 px-5 py-3 text-xs font-bold uppercase tracking-widest"
        style={{
          background: accentColor ?? "var(--color-primary)",
          color: "white",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <span>Наименование</span>
        <span>Описание</span>
        <span className="text-right">Фасовка</span>
        <span />
      </div>

      {products.map((product, i) => (
        <ProductRow
          key={product.id}
          product={product}
          accentColor={accentColor}
          isLast={i === products.length - 1}
        />
      ))}
    </div>
  );
})


/* ─────────────────────────────────────────────
   ProductRow — одна строка товара
───────────────────────────────────────────── */
function ProductRow({
  product,
  accentColor,
  isLast,
}: {
  product: Product;
  accentColor: string;
  isLast: boolean;
}) {
  return (
    <div
      className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr_auto_auto] gap-2 md:gap-4 px-5 py-4 items-center transition-colors duration-150"
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background =
          "var(--color-primary-light)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {/* Цветная полоска слева */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ background: accentColor }}
      />

      {/* Название */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Цветной dot вместо фото */}
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: accentColor }}
        />
        <span
          className="font-semibold text-sm leading-snug truncate"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-secondary)",
            fontSize: "0.95rem",
          }}
        >
          {product.name}
        </span>
      </div>

      {/* Описание */}
      <p
        className="text-sm leading-relaxed line-clamp-2 md:line-clamp-1"
        style={{ color: "var(--color-muted)" }}
      >
        {product.description ?? "—"}
      </p>

      {/* Фасовка */}
      <div className="flex items-center gap-2 flex-wrap md:justify-end">
        {product.weight && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{
              background: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {product.weight}
          </span>
        )}
        {product.package_type && (
          <span
            className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-muted)",
            }}
          >
            {product.package_type}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex md:justify-end">
        <Link
          href={`/catalog/${product.category?.slug}/${product.slug}`}
          className="text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
          style={{
            background: accentColor,
            color: "#fff",
          }}
        >
          Подробнее →
        </Link>
      </div>
    </div>
  );
}