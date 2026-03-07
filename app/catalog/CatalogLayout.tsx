"use client";
import { useState, useMemo, useRef, useEffect,memo } from "react";
import { CategorySidebar } from "./CategorySidebar";
import { Category, Product } from "../types/types";
import Link from "next/link";
import { columns_name_ru, CATEGORY_ACCENT, CATEGORY_ICON } from "@/app/catalog/catalogStuff/stuff";
import { useDebounce } from "@/lib/hooks/useDebounce";



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
  const debouncedSearch = useDebounce(query, 200);


  const [currentColor, setCurrentColor] = useState("#d97706");
  const currentColorRef = useRef(currentColor);

  const pTableRef = useRef<(HTMLDivElement | null)[]>([]);


  /* ───────────── фильтр ───────────── */
  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.manufacturer?.toLowerCase().includes(q)
    );
  }, [debouncedSearch, products]);


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
  const columns = products.length > 0 ? Object.keys(products[0]) : [];
  const displayedColumns = columns.filter((colKey) => colKey in columns_name_ru);

  return (
    /* Внешний контейнер со скроллом */
    <div className="w-full overflow-x-auto scrollbar-hide rounded-2xl"> 
      <div
        className="rounded-2xl inline-min-w-full" // Позволяет таблице растягиваться
        style={{  
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-card)",
          minWidth: displayedColumns.length > 3 ? "800px" : "100%", 
        }}
      >
        {/* Шапка таблицы */}
        <div
          className="grid gap-4 px-5 py-3 text-xs font-bold uppercase tracking-widest sticky top-0 z-10"
          style={{
            background: accentColor ?? "var(--color-primary)",
            color: "white",
            borderBottom: "1px solid var(--color-border)",
            gridTemplateColumns: `repeat(${displayedColumns.length}, 1fr)`,
          }}
        >
          {displayedColumns.map((colKey) => (
            <span key={colKey}>{columns_name_ru[colKey]}</span>
          ))}
        </div>

        {/* Строки */}
        {products.map((product, i) => (
          <ProductRow
            key={product.id}
            product={product}
            accentColor={accentColor}
            isLast={i === products.length - 1}
            displayedColumns={displayedColumns}
          />
        ))}
      </div>
      
      {/* Подсказка для пользователя (только на мобилках) */}
      <div className="md:hidden text-center mt-2 text-[10px] text-[var(--color-muted)] uppercase tracking-widest opacity-50">
        ← Листайте таблицу вправо →
      </div>
    </div>
  );
});



/* ─────────────────────────────────────────────
   ProductRow — одна строка товара
───────────────────────────────────────────── */

function ProductRow({
  product,
  accentColor,
  isLast,
  displayedColumns
}: {
  product: Product;
  accentColor: string;
  isLast: boolean;
  displayedColumns: string[]
}) {
  return (
    <Link
      href={`/catalog/${product.category?.slug}/${product.slug}`}
      className="group relative grid gap-4 px-5 py-5 items-center transition-all duration-200 hover:z-10 "
      style={{
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
        gridTemplateColumns: `repeat(${displayedColumns.length}, 1fr)`,
        textDecoration: 'none', // Убираем дефолтное подчеркивание ссылки
      }}
    >
      {/* 1. Эффект "Всплытия" строки при наведении */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ 
          background: "var(--color-surface-elevated, #f9f9f9)", // Чуть светлее или темнее основного фона
          boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
          margin: "0 4px", // Небольшой отступ, чтобы "всплывающая" карточка не слипалась
          borderRadius: "12px"
        }} 
      />

      {/* 2. Акцентная полоска (индикатор выбора) */}
      <span
        className="absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-200"
        style={{ background: accentColor }}
      />

      {/* Контент ячеек */}
      {displayedColumns.map((colKey) => {
        switch (colKey) {
          case 'name':
            return (
              <div key={colKey} className="flex items-center gap-3 min-w-0 z-10">
                {/* Точка-маркер, которая "подпрыгивает" при наведении */}
                <span 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125" 
                  style={{ background: accentColor }} 
                />
                <span className="font-bold text-[0.95rem] truncate" style={{ color: "var(--color-secondary)" }}>
                  {product.name}
                </span>
              </div>
            );

          case 'description':
            return (
              <div key={colKey} className="relative group/tip z-10">
                {/* Основной текст в таблице */}
                <p 
                  className="text-sm line-clamp-1 cursor-help" 
                  style={{ color: "var(--color-muted)" }}
                >
                  {product.description ?? "—"}
                </p>

                {/* Всплывающая подсказка (Tooltip) */}
                {product.description && (
                  <div className="absolute bottom-full left-0 mb-2 w-72 p-3 
                                  hidden group-hover/tip:block 
                                  bg-[var(--color-surface)] border border-[var(--color-border)] 
                                  rounded-xl shadow-xl z-100 pointer-events-none
                                  animate-in fade-in zoom-in-95 duration-200"
                      style={{ 
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" 
                      }}
                  >
                    <div className="relative">
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                        {product.description}
                      </p>
                      {/* Маленький хвостик тултипа */}
                      <div className="absolute -bottom-4 left-4 w-3 h-3 bg-[var(--color-surface)] 
                                      border-r border-b border-[var(--color-border)] rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            );

          case 'packaging_type':
            return (
              <div key={colKey} className="z-10">
                <span className="text-xs px-2.5 py-1 rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-transparent group-hover:bg-white transition-colors">
                  {product.packaging_type || "—"}
                </span>
              </div>
            );

          case 'weight_kg':
            return (
              <div key={colKey} className="z-10 font-medium text-sm" style={{ color: accentColor }}>
                {product.weight_kg ? `${product.weight_kg} кг` : "—"}
              </div>
            );

          default:
            return (
              <span key={colKey} className="text-sm z-10" style={{ color: "var(--color-text-main)" }}>
                {String(product[colKey as keyof Product] || "—")}
              </span>
            );
        }
      })}

      {/* 3. Иконка-подсказка "Стрелочка" (опционально) */}
      <div className="absolute right-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 z-10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 15L12.5 10L7.5 5" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}