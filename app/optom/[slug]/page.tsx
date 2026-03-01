import { getSeoPages } from "@/lib/seo/seoCategories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategories } from "@/utils/catalog/getCatalog";
import { Category } from "@/app/types/types";

type Props = {
    params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = await getSeoPages().then(pages => pages.find(page => page.slug === slug));
    if (!page) return {};
    return {
        title: `${page.title} — купить с доставкой | Бизнес и Хлеб`,
        description: page.description,
        keywords: `${page.name} оптом, ${page.name} Самара, купить ${page.name.toLowerCase()} оптом, ${page.name.toLowerCase()} с доставкой Самара`,
        openGraph: {
            title: `${page.title} | Бизнес и Хлеб`,
            description: page.description,
            locale: "ru_RU",
            type: "website",
        },
    };
}   

export async function generateStaticParams({params}: Props) {
    const { slug } = await params;
    const page = await getSeoPages().then(pages => pages.find(page => page.slug === slug));
    return page ? [{ slug: page.slug }] : [];
}

const advantages = [
    { icon: "🚚", title: "Доставка по региону", text: "Доставляем по Самаре и всей Самарской области. Собственный транспорт, точно в срок." },
    { icon: "📋", title: "Работаем с НДС", text: "Полный пакет документов, договор поставки, счета-фактуры для юридических лиц." },
    { icon: "⚖️", title: "От 5 кг", text: "Минимальный заказ всего от 5 кг — удобно как для малого бизнеса, так и для крупных сетей." },
    { icon: "🔄", title: "Свежие партии", text: "Завозим новые партии каждую неделю. Гарантируем свежесть и качество продукции." },
    { icon: "💼", title: "Опыт 10+ лет", text: "Работаем с магазинами, кафе, ресторанами и производствами по всей области." },
    { icon: "✅", title: "Сертификаты", text: "Вся продукция сертифицирована, соответствует ГОСТ и требованиям Роспотребнадзора." },
];

const faqs = (name: string) => [
    {
        q: `Какой минимальный объём заказа ${name.toLowerCase()} оптом?`,
        a: `Минимальный заказ ${name.toLowerCase()} — от 5 кг. Для постоянных клиентов действуют скидки при объёме от 50 кг.`
    },
    {
        q: `Как оформить оптовый заказ ${name.toLowerCase()} в Самаре?`,
        a: `Позвоните нам или оставьте заявку на сайте. Менеджер свяжется с вами в течение 30 минут, уточнит объём и согласует условия доставки.`
    },
    {
        q: `Есть ли сертификаты на ${name.toLowerCase()}?`,
        a: `Да, вся продукция имеет необходимые сертификаты качества и декларации соответствия. Документы предоставляем с каждой поставкой.`
    },
    {
        q: `Работаете ли вы с ИП и юридическими лицами?`,
        a: `Работаем с любыми организационными формами: ИП, ООО, АО. Оформляем договор поставки, работаем с НДС и без.`
    },
];

export default async function OptomCategoryPage({ params }: Props) {
    const { slug } = await params;
    const page = await getSeoPages().then(pages => pages.find(page => page.slug === slug));
    if (!page) return notFound();

    const phone = process.env.NEXT_PUBLIC_PHONE

    const category: Category[] = await getCategories()

    return (
        <main style={{ background: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}>

            {/* ── HERO ── */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-secondary) 0%, #6b2d0e 100%)',
                padding: '5rem 1.5rem 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Декоративные круги */}
                <div style={{
                    position: 'absolute', top: '-80px', right: '-80px',
                    width: '400px', height: '400px', borderRadius: '50%',
                    background: 'rgba(217,119,6,0.15)', pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-60px', left: '-60px',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
                }} />

                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Хлебные крошки — важно для SEO */}
                    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
                        <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
                            <li>
                                <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none' }}>
                                    Главная
                                </Link>
                            </li>
                            <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>/</li>
                            <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
                                {page.title}
                            </li>
                        </ol>
                    </nav>

                    {/* Бейдж */}
                    <span style={{
                        display: 'inline-block',
                        padding: '0.35rem 1rem',
                        background: 'rgba(217,119,6,0.3)',
                        border: '1px solid rgba(217,119,6,0.5)',
                        borderRadius: '99px',
                        color: '#fde68a',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '1.25rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    }}>
                        Оптовые поставки · Самара
                    </span>

                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.15,
                        marginBottom: '1.25rem',
                    }}>
                        {page.title}
                    </h1>

                    <p style={{
                        fontSize: '1.15rem',
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: 1.7,
                        maxWidth: '640px',
                        marginBottom: '2.5rem',
                    }}>
                        {page.description}. Работаем с НДС, доставка по Самаре и Самарской области. Договор поставки, сертификаты качества.
                    </p>

                    {/* CTA кнопки */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link
                            href={`/catalog/${page.cleanSlug}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.85rem 2rem',
                                background: 'var(--color-primary)',
                                color: '#fff',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(217,119,6,0.4)',
                                transition: 'all var(--transition)',
                            }}
                        >
                            Смотреть каталог →
                        </Link>
                        <a
                            href={`tel:${phone}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.85rem 2rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: '#fff',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                            }}
                        >
                            📞 Получить прайс
                        </a>
                    </div>
                </div>
            </section>

            {/* ── СТАТЫ ── */}
            <section style={{
                background: 'var(--color-primary)',
                padding: '1.5rem',
            }}>
                <div style={{
                    maxWidth: '900px', margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center',
                }}>
                    {[
                        { num: '10+', label: 'лет на рынке' },
                        { num: '500+', label: 'клиентов' },
                        { num: 'от 5 кг', label: 'минимальный заказ' },
                        { num: '1 день', label: 'срок доставки' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                                {stat.num}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.15rem' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── ПОЧЕМУ МЫ ── */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: 'var(--color-secondary)',
                    marginBottom: '0.75rem',
                    fontWeight: 700,
                }}>
                    Почему выгодно покупать {page.name.toLowerCase()} оптом у нас
                </h2>
                <p style={{ color: 'var(--color-muted)', marginBottom: '3rem', fontSize: '1rem', lineHeight: 1.6 }}>
                    Мы работаем напрямую с поставщиками — без посредников. Это значит лучшая цена и гарантированное качество.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {advantages.map((adv) => (
                        <div
                            key={adv.title}
                            className="card"
                            style={{ padding: '1.5rem' }}
                        >
                            <div style={{
                                width: '48px', height: '48px',
                                background: 'var(--color-primary-light)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                            }}>
                                {adv.icon}
                            </div>
                            <h3 style={{
                                fontWeight: 700,
                                color: 'var(--color-secondary)',
                                marginBottom: '0.4rem',
                                fontSize: '0.95rem',
                            }}>
                                {adv.title}
                            </h3>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                                {adv.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── КАК ЗАКАЗАТЬ ── */}
            <section style={{
                padding: '5rem 1.5rem',
                background: 'var(--color-primary-light)',
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                        color: 'var(--color-secondary)',
                        marginBottom: '3rem',
                        fontWeight: 700,
                        textAlign: 'center',
                    }}>
                        Как заказать {page.name.toLowerCase()} оптом
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        position: 'relative',
                    }}>
                        {[
                            { step: '01', title: 'Оставьте заявку', text: 'Позвоните или напишите нам — менеджер ответит в течение 30 минут' },
                            { step: '02', title: 'Согласуем условия', text: 'Обсудим объём, цену и удобное время доставки' },
                            { step: '03', title: 'Подпишем договор', text: 'Оформим все документы: договор, счёт, сертификаты' },
                            { step: '04', title: 'Доставим заказ', text: 'Привезём свежую продукцию точно в оговорённый срок' },
                        ].map((s) => (
                            <div key={s.step} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '56px', height: '56px',
                                    background: 'var(--color-primary)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: '#fff',
                                }}>
                                    {s.step}
                                </div>
                                <h3 style={{ fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                                    {s.title}
                                </h3>
                                <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ — важно для SEO ── */}
            <section style={{ padding: '5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: 'var(--color-secondary)',
                    marginBottom: '2.5rem',
                    fontWeight: 700,
                }}>
                    Частые вопросы
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs(page.name).map((faq, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.5rem',
                            }}
                        >
                            <h3 style={{
                                fontWeight: 700,
                                color: 'var(--color-secondary)',
                                fontSize: '0.95rem',
                                marginBottom: '0.6rem',
                            }}>
                                {faq.q}
                            </h3>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Другие наши товары и категории */}
            <section className="py-8">
                <h2 style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-secondary)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "1.25rem",
                }}>
                    Другие категории
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "0.85rem",
                }}>
                    {category
                    .filter(cat => cat.slug !== page.cleanSlug)
                    .map((cat, i) => (
                        <Link
                            key={i}
                            href={`/optom/${cat.slug}`}
                            style={{
                                background: "linear-gradient(135deg, #FDF4E6 0%, #fde9b8 50%, #ffc260 100%)",
                                borderRadius: "1rem",
                                padding: "1.1rem 1.25rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                color: "var(--color-secondary)",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                boxShadow: "0 2px 8px rgba(146,64,14,0.08)",
                                border: "1px solid rgba(217,119,6,0.15)",
                                transition: "transform 0.15s, box-shadow 0.15s",
                                textDecoration: "none",
                            }}
                            
                        >
                            <span>{cat.name}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6"/>
                            </svg>
                        </Link>
                    ))}
                </div>
            </section>



            {/* ── CTA ФИНАЛЬНЫЙ ── */}
            <section style={{
                padding: '5rem 1.5rem',
                background: 'linear-gradient(135deg, var(--color-secondary), #6b2d0e)',
                textAlign: 'center',
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        color: '#fff',
                        marginBottom: '1rem',
                        fontWeight: 700,
                    }}>
                        Готовы сделать заказ?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                        Свяжитесь с нами — рассчитаем стоимость {page.name.toLowerCase()} оптом и согласуем удобные условия доставки по Самаре.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            href={`tel:${phone}`}
                            style={{
                                padding: '0.9rem 2.5rem',
                                background: 'var(--color-primary)',
                                color: '#fff',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(217,119,6,0.4)',
                            }}
                        >
                            📞 Позвонить
                        </a>
                        <Link
                            href="/catalog"
                            style={{
                                padding: '0.9rem 2.5rem',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: '#fff',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textDecoration: 'none',
                            }}
                        >
                            Смотреть каталог
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SCHEMA.ORG ── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": page.title,
                "description": page.description,
                "brand": { "@type": "Brand", "name": "Бизнес и Хлеб" },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "RUB",
                    "availability": "https://schema.org/InStock",
                    "seller": { "@type": "Organization", "name": "Бизнес и Хлеб" }
                }
            })}} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs(page.name).map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
            })}} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://biznes-hleb.ru" },
                    { "@type": "ListItem", "position": 2, "name": page.title, "item": `https://biznes-hleb.ru/optom/${slug}` }
                ]
            })}} />
        </main>
    );
}