"use client";

import { YandexMap } from "@/app/components/YandexMap";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/Svgs/svg";
import { HeroHeading } from "./HeroHeading";

/* ─── Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { damping: 40, stiffness: 120 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Fade-up wrapper ─── */
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: 10, suffix: "+", label: "лет на рынке" },
  { value: 500, suffix: "+", label: "партнёров" },
  { value: 200, suffix: "+", label: "тонн ежегодно" },
  { value: 100, suffix: "%", label: "сертификация" },
];

const advantages = [
  {
    icon: "truck",
    title: "Прямые поставки",
    text: "Работаем напрямую с производителями из Средней Азии, Ирана и Турции — без посредников и наценок.",
  },
  {
    icon: "checkBox",
    title: "Стабильность партий",
    text: "Единые стандарты качества и регулярные поставки без перебоев — планируйте производство уверенно.",
  },
  {
    icon: "balance",
    title: "Работа с НДС",
    text: "Полный пакет закрывающих документов для ИП и юридических лиц. Без сюрпризов на бухгалтерии.",
  },
  {
    icon: "handShake",
    title: "Гибкие условия",
    text: "Персональные цены, отсрочка платежа и индивидуальный менеджер для каждого партнёра.",
  },
];

const docs = [
  { name: "Договор поставки", desc: "Типовой или по вашей форме" },
  { name: "Счёт-фактура", desc: "Для возмещения НДС" },
  { name: "УПД", desc: "Универсальный передаточный документ" },
  { name: "Сертификаты качества", desc: "На каждую партию товара" },
  { name: "Декларации соответствия", desc: "ТР ТС, ЕАЭС" },
  { name: "Ветеринарные свидетельства", desc: "Для подконтрольной продукции" },
];

export function AboutSection() {
  const phone = process.env.NEXT_PUBLIC_PHONE;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ── Grain texture overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-1 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ════════════════════════════════════════════
          HERO INTRO — full-width editorial opener
      ════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-center md:items-start items-center 
          bg-(--color-primary-light)/50 md:p-10 p-4 rounded-2xl md:w-[90%] mx-auto md:mt-10
      ">

        <FadeUp delay={0}>
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.35em] px-3 py-1 rounded-full mb-8"
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
            }}
          >
            О компании
          </span>
        </FadeUp>

        <div className="flex flex-col gap-16 items-end ">

          <FadeUp delay={0.1}>
            <HeroHeading></HeroHeading>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="space-y-6 ">
              <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
                Мы поставляем качественную продукцию магазинам, пекарням,
                кондитерским и производствам. Прозрачная документация, контроль каждой партии.
              </p>
              <p className="text-base" style={{ color: "var(--color-muted)" }}>
                ООО «Бизнес и Хлеб» — надёжный оптовый партнёр с 2014 года.
              </p>
            </div>
          </FadeUp>
        </div>
        
      </div>

      {/* ════════════════════════════════════════════
          STATS — horizontal marquee-style row
      ════════════════════════════════════════════ */}
      <div
        className="relative z-10 py-14 px-6 md:px-10 flex " 
        style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="w-full grid md:grid-cols-4 grid-cols-2 justify-center items-center gap-10 ">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="justify-self-center">
                <div
                  className="text-6xl font-extrabold tabular-nums"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div
                  className="mt-2 text-xs uppercase tracking-widest font-semibold"
                  style={{ color: "var(--color-muted)" }}
                >
                  {s.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          ADVANTAGES — asymmetric grid
      ════════════════════════════════════════════ */}
      <div className="relative z-10 py-28 px-6 md:px-16 max-w-7xl mx-auto">

        <FadeUp className="mb-8">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
          >
            Почему выбирают нас
          </h2>
        </FadeUp>

        <div className={`flex flex-col w-full gap-1

          `}>
          {advantages.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group md:w-1/2 p-3 rounded-3xl h-full flex flex-col gap-2 cursor-default
                    shadow 
                    ${i % 2 ? "md:justify-self-end" : "md:justify-self-start"}
                  `}
                style={{
                  background: i === 0 || i === 3
                    ? "var(--color-surface)"
                    : "var(--color-primary-light)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h3
                  className="text-2xl font-semibold flex justify-start items-center gap-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-secondary)",
                    transition: "color 0.2s",
                  }}
                >
                  {item.title}
                  <Icon name={(item.icon) as keyof typeof Icon} className="w-6 h-6" style={{ color: "var(--color-secondary)" }} />
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
                  {item.text}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          DARK ACCENT — "Надёжность" callout
      ════════════════════════════════════════════ */}
      <FadeUp className="relative z-10 mx-6 md:mx-16 max-w-7xl xl:mx-auto mb-28">
  <div
    className="relative overflow-hidden rounded-[40px] p-14 md:p-20"
    style={{
      background: "linear-gradient(135deg, #fffbf0 0%, #fef3c7 60%, #fde68a 100%)",
      border: "1px solid #fcd34d",
    }}
  >
    {/* decorative blobs */}
    <div
      className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full opacity-30 blur-3xl"
      style={{ background: "var(--color-primary)" }}
    />
    <div
      className="absolute top-0 left-1/3 w-48 h-48 rounded-full opacity-10 blur-2xl"
      style={{ background: "var(--color-secondary)" }}
    />

    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-6"
          style={{ background: "var(--color-primary)", color: "#fff" }}
        >
          Долгосрочное партнёрство
        </span>
        <h3
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
        >
          Строим отношения,{" "}
          <em className="not-italic" style={{ color: "var(--color-primary)" }}>
            а не разовые сделки
          </em>
        </h3>
        <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--color-text-soft)" }}>
          Стабильные цены, приоритет в сезонный дефицит и прозрачные условия.
          Мы растём вместе с нашими партнёрами уже более 10 лет.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: "📜", label: "Полный пакет документов" },
          { icon: "🔒", label: "Гарантия качества" },
          { icon: "🚚", label: "Срочная доставка" },
          { icon: "🤝", label: "Отсрочка платежа" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl">{item.icon}</span>
            <span
              className="text-sm font-semibold leading-snug"
              style={{ color: "var(--color-secondary)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</FadeUp>

      {/* ════════════════════════════════════════════
          MAP
      ════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto mb-28">
        <FadeUp className="mb-10">
          <h2
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
          >
            Наш офис
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--color-muted)" }}>
            Самовывоз и доставка по Самарской области
          </p>
        </FadeUp>

        <FadeUp>
          <div
            className="rounded-[32px] overflow-hidden"
            style={{ boxShadow: "var(--shadow-hover)", border: "1px solid var(--color-border)" }}
          >
            <YandexMap />
          </div>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════
          DOCS + REQUISITES
      ════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Реквизиты */}
          <FadeUp>
            <div
              className="p-10 rounded-3xl h-full"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
              >
                Реквизиты компании
              </h3>

              <div className="space-y-0">
                {[
                  { label: "Полное название", value: "ООО «Бизнес и Хлеб»" },
                  { label: "ИНН", value: "—" },
                  { label: "КПП", value: "—" },
                  { label: "ОГРН", value: "—" },
                  { label: "Р/сч", value: "—" },
                  { label: "Банк", value: "—" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-4"
                    style={{ borderBottom: "1px solid var(--color-border)" }}
                  >
                    <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                      {item.label}
                    </span>
                    <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary mt-8 w-full gap-2"
                style={{ fontSize: "0.9rem" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Скачать реквизиты PDF
              </button>
            </div>
          </FadeUp>

          {/* Документы */}
          <FadeUp delay={0.1}>
            <div
              className="p-10 rounded-3xl h-full"
              style={{
                background: "linear-gradient(135deg, #fffbf0 0%, #fef3c7 100%)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
              >
                Документы и сертификаты
              </h3>
              <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
                Предоставляем полный пакет для бухгалтерии и контролирующих органов
              </p>

              <div className="space-y-3">
                {docs.map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.9)",
                    }}
                  >
                    <div
                      className="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: "var(--color-primary)" }}
                    >
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                        {doc.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                        {doc.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          CTA — final
      ════════════════════════════════════════════ */}
      <FadeUp className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto pb-32">
        <div
          className="relative overflow-hidden rounded-[40px] p-16 text-center"
          style={{
            background: "var(--color-primary-light)",
            border: "1px solid #fde68a",
          }}
        >
          {/* decorative rings */}
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-30"
            style={{ background: "var(--color-primary)", filter: "blur(60px)" }}
          />
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
            style={{ background: "var(--color-secondary)", filter: "blur(50px)" }}
          />

          <div className="relative z-10">
            <span
              className="text-xs font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full inline-block mb-6"
              style={{ background: "var(--color-primary)", color: "#fff" }}
            >
              Начнём работу
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
            >
              Готовы к долгосрочному
              <br />
              сотрудничеству?
            </h2>

            <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--color-text-soft)" }}>
              Позвоните или напишите — подготовим коммерческое предложение
              с актуальными ценами и свяжемся в течение рабочего дня.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`tel:${phone}`} className="btn-primary text-base px-8 py-3 gap-1">
                <Icon name="phone"/> Позвонить
              </Link>
              {/* <Link
                href={`https://wa.me/${phone?.replace(/\D/g, "")}`}
                className="btn-outline text-base px-8 py-3"
              >
                💬 Написать в WhatsApp
              </Link> */}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}