"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/types";

// ── Types ────────────────────────────────────────────────────────────────────

interface RelatedProduct extends Omit<Product, 'category'> {
    category: { slug: string } | null;
}

interface Props {
    dataProduct: Product & { category: { id: string; name: string; slug: string } };
    relatedProducts: RelatedProduct[];
    slug: string;
    articleSku: string;
}

// ── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
);

const GrainIcon = () => (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 0-4 4-4 9s4 9 4 9m0-18c0 0 4 4 4 9s-4 9-4 9m0-18v18M3 12h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.5C7.5 6.5 5 9 5 12s2.5 5.5 2.5 5.5M16.5 6.5C16.5 6.5 19 9 19 12s-2.5 5.5-2.5 5.5" />
    </svg>
);

const DocumentIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const TruckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const BoxIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="text-xs uppercase tracking-[0.2em] font-bold mb-4"
            style={{ color: "var(--color-muted)" }}
        >
            {children}
        </p>
    );
}

function SpecRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
    return (
        <div className={`grid grid-cols-5 gap-4 px-6 py-4 ${accent ? "bg-amber-50/40" : "bg-white"}`}>
            <dt className="col-span-2 text-sm font-medium leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {label}
            </dt>
            <dd className="col-span-3 text-sm font-semibold text-zinc-900 leading-relaxed">{value}</dd>
        </div>
    );
}

function QuickPill({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border"
            style={{
                background: "var(--color-primary-light)",
                borderColor: "#fde68a",
                color: "var(--color-secondary)",
            }}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function ProductLayout({ dataProduct, relatedProducts, slug, articleSku }: Props) {
    const deliveryConditions = [
        {
            icon: <BoxIcon />,
            title: "Опт и крупный опт",
            desc: "Минимальная партия отгрузки — 1 паллет",
        },
        {
            icon: <ShieldIcon />,
            title: "Только юридические лица",
            desc: "Безналичный расчёт, работаем с НДС",
        },
        {
            icon: <TruckIcon />,
            title: "Доставка по всей Самарской области",
            desc: "Самовывоз или доставка",
        },
        {
            icon: <DocumentIcon />,
            title: "Полный комплект документов",
            desc: "ГОСТ, ТУ, декларации, удостоверения качества",
        },
    ];

    return (
        <article className="min-h-screen pb-24" style={{ backgroundColor: "var(--color-bg)" }}>

            {/* ── Breadcrumbs ── */}
            <div className="bg-white border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 text-xs font-medium flex-wrap">
                            <li>
                                <Link href="/catalog" className="text-amber-700/70 hover:text-amber-800 transition-colors">
                                    Каталог
                                </Link>
                            </li>
                            <li className="text-amber-300">/</li>
                            <li>
                                <Link href={`/catalog/${slug}`} className="text-amber-700/70 hover:text-amber-800 transition-colors">
                                    {dataProduct.category.name}
                                </Link>
                            </li>
                            <li className="text-amber-300">/</li>
                            <li
                                className="text-amber-900 font-semibold truncate max-w-[200px]"
                                aria-current="page"
                            >
                                {dataProduct.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* ── Hero ── */}
                <div className="pt-10 pb-8 border-b border-amber-100">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

                        {/* Image */}
                        <div className="lg:w-[420px] flex-shrink-0">
                            <div
                                className="relative w-full aspect-square rounded-2xl overflow-hidden border border-amber-100"
                                style={{
                                    background: "linear-gradient(135deg, #fef9f0 0%, #fef3c7 50%, #fde68a20 100%)",
                                    boxShadow: "var(--shadow-card)",
                                }}
                            >
                                {dataProduct.image_url ? (
                                    <Image
                                        src={dataProduct.image_url}
                                        alt={dataProduct.name}
                                        fill
                                        className="object-contain p-10"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30">
                                        <GrainIcon />
                                        <span
                                            className="text-xs uppercase tracking-[0.2em] font-semibold"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            Фото отсутствует
                                        </span>
                                    </div>
                                )}
                                <div
                                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{
                                        background: "var(--color-primary-light)",
                                        color: "var(--color-secondary)",
                                    }}
                                >
                                    {dataProduct.category.name}
                                </div>
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                <span
                                    className="text-[11px] font-bold uppercase tracking-[0.18em] border px-3 py-1 rounded-full"
                                    style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
                                >
                                    Арт. {articleSku}
                                </span>
                                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                    <CheckIcon /> В наличии
                                </span>
                            </div>

                            <h1
                                className="mb-5 leading-tight"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--color-secondary)",
                                    fontSize: "clamp(2rem, 4vw, 3rem)",
                                    fontWeight: 700,
                                }}
                            >
                                {dataProduct.name}
                            </h1>

                            {dataProduct.description && (
                                <p
                                    className="text-base leading-relaxed mb-6 max-w-xl"
                                    style={{ color: "var(--color-text-soft)" }}
                                >
                                    {dataProduct.description}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 mb-8">
                                {dataProduct.weight_kg && (
                                    <QuickPill icon={<BoxIcon />} label={String(dataProduct.weight_kg)} />
                                )}
                                {dataProduct.packaging_type && (
                                    <QuickPill icon={<BoxIcon />} label={dataProduct.packaging_type} />
                                )}
                                {dataProduct.manufacturer && (
                                    <QuickPill icon={<ShieldIcon />} label={dataProduct.manufacturer} />
                                )}
                                <QuickPill icon={<TruckIcon />} label="Доставка по Самаре" />
                            </div>

                            {/* CTA */}
                            <div
                                className="rounded-2xl p-6 mt-auto"
                                style={{
                                    background: "linear-gradient(135deg, #92400e 0%, #b45309 100%)",
                                    boxShadow: "0 12px 32px rgba(180, 100, 0, 0.25)",
                                }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                                    <div>
                                        <div className="text-amber-200/80 text-xs uppercase tracking-[0.15em] font-semibold mb-1">
                                            Оптовые поставки
                                        </div>
                                        <div className="text-white text-xl font-bold mb-1">
                                            Цены — по запросу
                                        </div>
                                        <div className="text-amber-200/70 text-xs">
                                            Зависят от объёма партии и условий доставки
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2.5 sm:items-end">
                                        <button
                                            className="btn-primary flex items-center gap-2 whitespace-nowrap"
                                            style={{ background: "white", color: "var(--color-secondary)" }}
                                        >
                                            <PhoneIcon />
                                            Запросить цену
                                        </button>
                                        <span className="text-amber-300/80 text-[11px] text-center">
                                            Ответим за 15 минут
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Details ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">

                    {/* LEFT — Specs + Docs */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        <section>
                            <SectionLabel>Технические характеристики</SectionLabel>
                            <dl
                                className="rounded-2xl overflow-hidden border divide-y"
                                style={{
                                    borderColor: "var(--color-border)",
                                    boxShadow: "var(--shadow-card)",
                                }}
                            >
                                <SpecRow label="Группа товаров" value={dataProduct.category.name} accent />
                                {dataProduct.weight_kg && (
                                    <SpecRow label="Фасовка / вес нетто" value={String(dataProduct.weight_kg)} />
                                )}
                                {dataProduct.packaging_type && (
                                    <SpecRow label="Тип упаковки" value={dataProduct.packaging_type} accent />
                                )}
                                {dataProduct.manufacturer && (
                                    <SpecRow label="Завод-производитель" value={dataProduct.manufacturer} />
                                )}
                                <SpecRow label="Срок годности" value="12 месяцев (уточняется при отгрузке)" accent />
                                <SpecRow label="Условия хранения" value="В сухом прохладном месте, t° до +20°C" />
                                <SpecRow label="Стандарт качества" value="ГОСТ / ТУ (документы предоставляются)" accent />
                            </dl>
                        </section>

                        <section>
                            <SectionLabel>Документация</SectionLabel>
                            <div
                                className="rounded-2xl p-5 border flex items-start gap-4"
                                style={{
                                    background: "var(--color-primary-light)",
                                    borderColor: "#fde68a",
                                    boxShadow: "var(--shadow-card)",
                                }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: "#fef3c7", color: "var(--color-primary)" }}
                                >
                                    <DocumentIcon />
                                </div>
                                <div>
                                    <div className="font-bold text-sm mb-1.5" style={{ color: "var(--color-secondary)" }}>
                                        Полный пакет документов по каждой позиции
                                    </div>
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
                                        Декларации о соответствии, качественные удостоверения, протоколы испытаний —
                                        предоставляются по запросу вместе с коммерческим предложением.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT — Conditions */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-6">
                            <SectionLabel>Условия поставки</SectionLabel>
                            <div
                                className="rounded-2xl border overflow-hidden"
                                style={{
                                    borderColor: "var(--color-border)",
                                    boxShadow: "var(--shadow-card)",
                                    background: "var(--color-surface)",
                                }}
                            >
                                <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                                    {deliveryConditions.map(({ icon, title, desc }) => (
                                        <li key={title} className="flex items-start gap-4 px-5 py-4">
                                            <div
                                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{
                                                    background: "var(--color-primary-light)",
                                                    color: "var(--color-primary)",
                                                }}
                                            >
                                                {icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold mb-0.5" style={{ color: "var(--color-text)" }}>
                                                    {title}
                                                </div>
                                                <div className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                                                    {desc}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className="px-5 py-5 border-t"
                                    style={{ borderColor: "var(--color-border)", background: "#fffbf5" }}
                                >
                                    <button
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                        style={{ borderRadius: "var(--radius-md)" }}
                                    >
                                        <PhoneIcon />
                                        Получить коммерческое предложение
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related Products ── */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <div className="flex items-end justify-between mb-5">
                            <div>
                                <SectionLabel>Похожие товары</SectionLabel>
                                <p
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--color-secondary)",
                                        fontSize: "1.6rem",
                                        fontWeight: 600,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Другие позиции в категории
                                </p>
                            </div>
                            <Link
                                href={`/catalog/${slug}`}
                                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                                style={{ color: "var(--color-primary)" }}
                            >
                                Все товары категории <ArrowRightIcon />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            {relatedProducts.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/catalog/${slug}/${item.slug}`}
                                    className="h-15 group rounded-2xl border overflow-hidden flex items-center justify-start transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                    style={{
                                        borderColor: "var(--color-border)",
                                        background: "var(--color-surface)",
                                        boxShadow: "var(--shadow-card)",
                                    }}
                                >
                                    <div
                                        className="h-full w-29 flexC relative"
                                        style={{
                                            background: "linear-gradient(135deg, #fef9f0 0%, #fef3c7 100%)",
                                        }}
                                    >
                                        {item.image_url ? (
                                            <Image
                                                src={item.image_url}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-4"
                                            />
                                        ) : (
                                            <div className="opacity-25" style={{ color: "var(--color-primary)" }}>
                                                <GrainIcon />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center p-4 gap-2">
                                        <div
                                            className="text-sm font-semibold leading-snug  flex group-hover:text-amber-700 transition-colors"
                                            style={{ color: "var(--color-text)" }}
                                        >
                                            {item.name}
                                        </div>

                                        {item.description && (
                                            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
                                                {item.description}
                                            </div>
                                        )}

                                        {item.weight_kg && (
                                            <div className="text-xs " style={{ color: "var(--color-muted)" }}>
                                                {item.weight_kg}
                                            </div>
                                        )}
                                        
                                        <div
                                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            Подробнее <ArrowRightIcon />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-5 sm:hidden">
                            <Link
                                href={`/catalog/${slug}`}
                                className="flex items-center justify-center gap-1.5 text-sm font-semibold w-full py-3 rounded-xl border transition-colors hover:opacity-80"
                                style={{
                                    color: "var(--color-primary)",
                                    borderColor: "var(--color-border)",
                                    background: "var(--color-surface)",
                                }}
                            >
                                Все товары категории <ArrowRightIcon />
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}