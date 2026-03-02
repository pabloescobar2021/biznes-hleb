"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Category } from "../types/types";
import Script from "next/script";

type Props = {
  categories: Category[];
};

type FeaturedConfig = {
  name: string;
  slug: string | undefined;
  icon: string;
  description: string;
};
// Показываем только 4 главные — остальное в каталоге
const FEATURED: FeaturedConfig[] = [
  {
    name: "Орехи",
    slug: "orehi",
    icon: "/images/nuts.png",
    description: "Кешью, фундук, миндаль, грецкий, фисташки и другие",
  },
  {
    name: "Сухофрукты",
    slug: "suhofrukty",
    icon: "/images/suhofruits.png",
    description: "Курага, чернослив, финики, инжир, клюква и другие",
  },
  {
    name: "Изюм",
    slug: "izum",
    icon: "/images/izum.png",
    description: "Кишмиш, сабза, коринка — весь выбор по происхождению",
  },
  {
    name: "Цукаты",
    slug: "cukaty",
    icon: "/images/cukati2.png",
    description: "Папайя, ананас, имбирь, дыня и другие",
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CategoryList({ categories }: Props) {
  const url = process.env.NEXT_PUBLIC_URL

  // Мёрджим данные из БД (count) с нашим конфигом
  const featured = FEATURED.map((f) => {
    const fromDb = categories.find((c) => c.name === f.name);
    return { 
      ...f, 
      count: fromDb?.products?.[0]?.count ?? null, slug: fromDb?.slug };
  });

  // Считаем сколько товаров всего (для CTA-плашки)
  const totalCount = categories.reduce(
    (acc, c) => acc + (c.products?.[0]?.count ?? 0),
    0
  );

  /* ── JSON-LD (SEO 2026) ── */
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Популярные категории орехов и сухофруктов, цукатов, изюма оптом",
      itemListElement: featured.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.name,
        url: `${url}/catalog/${cat.slug}`,
        offers: {
          "@type": "AggregateOffer",
          offerCount: cat.count,
        },
      })),
    }),
    [featured]
  );

  return (
    <section
      className="w-[92%] max-w-7xl mx-auto py-8 md:py-12"
      aria-labelledby="catalog-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >

      {/* Structured Data */}
      <Script
        id="categories-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ── */}
      <FadeUp className="flex items-end md:justify-between mb-7 justify-center">
        <div className="flex flex-col md:items-start justify-center text-center">
          
          <h2
            id="catalog-heading"
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-secondary)",
            }}
          >
            Популярные
            категории
          </h2>
          <p
            className=""
          >
            Каталог продукции
          </p>
        </div>

        <Link
          href="/catalog"
          className="hidden md:flex items-center gap-3 text-(--color-secondary) text-sm font-semibold transition-all group
          hover:text-(--color-primary)
          "
        >
          Весь каталог
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 
              group-hover:scale-110 group-hover:bg-(--color-primary) group-hover:text-white
              border border-(--color-primary)/20
            "
           
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </FadeUp>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-5">

        {/* ── Большая карточка (span 2×2) ── */}
        <FadeUp delay={0.05} className="col-span-2 row-span-2">
          <CategoryCard item={featured[0]} large />
        </FadeUp>

        {/* ── Три маленьких ── */}
        {featured.slice(1, 4).map((item, i) => (
          <FadeUp key={item.slug} delay={0.1 + i * 0.08}>
            <CategoryCard item={item} />
          </FadeUp>
        ))}

        {/* ── CTA карточка «Все товары» ── */}
        <FadeUp delay={0.3}>
          <Link
            href="/catalog"
            className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
            style={{
              minHeight: "172px",
              height: "100%",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Gradient вместо фото */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, var(--color-secondary) 0%, #3d1f08 100%)",
              }}
            />
            {/* Amber блик */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: "var(--color-primary)" }}
            />

            {/* Text — та же структура что в CategoryCard */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <div className="flex items-end justify-between">
                <div className="bg-black/10 backdrop-blur-2xl rounded-2xl p-2">
                  <h3
                    className="font-bold text-white leading-tight"
                    style={{ 
                      fontFamily: "var(--font-display)", 
                      fontSize: "1.15rem", 
                      color: "var(--color-primary)",
                      fontWeight: 1000, 
                    }}
                  >
                    Весь каталог
                  </h3>
                  {totalCount > 0 && (
                    <span className="text-xs mt-0.5 block" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {totalCount}+ позиций
                    </span>
                  )}
                </div>

                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  style={{ background: "var(--color-primary)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </FadeUp>
      </div>

      {/* ── Mobile CTA ── */}
      <FadeUp delay={0.35} className="mt-6 md:hidden">
        <Link
          href="/catalog"
          className="btn-primary w-full justify-center text-base py-4"
        >
          Смотреть все {totalCount > 0 ? `${totalCount}` : ""} товары →
        </Link>
      </FadeUp>
    </section>
  );
}

/* ─────────────────────────────────────────
   Sub-component: одна карточка категории
───────────────────────────────────────── */
function CategoryCard({
  item,
  large = false,
}: {
  item: (typeof FEATURED)[0] & { count: number | null };
  large?: boolean;
}) {
  return (
    <Link
      href={`/catalog/${item.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
      style={{
        height: large ? "100%" : undefined,
        minHeight: large ? "360px" : "172px",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-card)",
      }}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <meta itemProp="position" content="1" />
      <meta itemProp="name" content={item.name} />

      {/* Image */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={item.icon}
          alt={`${item.name} оптом - купить с доставкой по Самарской области`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(28,16,8,0.75) 0%, rgba(28,16,8,0.1) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Text overlay — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-end justify-between">
          <div className="bg-black/10 backdrop-blur-2xl rounded-2xl p-2">
            <h3
              className="font-bold text-white leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: large ? "1.75rem" : "1.15rem",
                color: "var(--color-primary)",
                fontWeight: 1000,
              }}
            >
              {item.name}
            </h3>
            {item.count !== null && (
              <span
                className="text-xs mt-0.5 block"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {item.count} товаров
              </span>
            )}
          </div>

          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ background: "var(--color-primary)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Description — reveals on hover */}
        {large && (
          <p
            className="text-sm mt-2 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}