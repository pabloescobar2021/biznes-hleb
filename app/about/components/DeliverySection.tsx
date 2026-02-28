"use client";

import { YandexMap } from "@/app/components/YandexMap";
import Link from "next/link";

export function AboutSection() {
  const phone = process.env.NEXT_PUBLIC_PHONE 
  return (

    <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-white">

      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.08),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto space-y-40">

        {/* ================= ГЛАВНЫЙ БЛОК ================= */}
        <div className="max-w-4xl">

          <span className="uppercase tracking-[0.3em] text-xs text-amber-600 font-semibold">
            О компании
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Поставляем орехи и сухофрукты
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              оптом по Самарской области
            </span>
          </h2>

          <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl">
            Мы работаем с магазинами, пекарнями и производствами,
            обеспечивая стабильные поставки качественной продукции.
            Прямые контракты, прозрачные документы и контроль
            каждой партии.
          </p>
        </div>

        {/* ================= ЦИФРЫ ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-gray-100 py-16">

          {[
            { value: "10+", label: "лет на рынке" },
            { value: "300+", label: "партнёров" },
            { value: "1000+", label: "тонн ежегодно" },
            { value: "100%", label: "сертификация" },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold text-gray-900">
                {item.value}
              </div>
              <div className="mt-3 text-sm uppercase tracking-wider text-gray-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* ================= ПРЕИМУЩЕСТВА ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <div className="space-y-10">
            {[
              {
                title: "Прямые поставки",
                text: "Работаем напрямую с производителями без посредников.",
              },
              {
                title: "Стабильность партий",
                text: "Контроль качества и одинаковые стандарты поставки.",
              },
              {
                title: "Работа с НДС",
                text: "Полный пакет документов для юридических лиц.",
              },
              {
                title: "Гибкие условия",
                text: "Персональные цены и условия для крупных клиентов.",
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-amber-600 transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 max-w-lg leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Акцентный блок */}
          <div className="relative p-16 rounded-[40px] bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-[40px]" />

            <h3 className="text-3xl font-bold relative z-10">
              Надёжность в деталях
            </h3>

            <p className="mt-6 text-gray-300 leading-relaxed relative z-10">
              Мы выстраиваем долгосрочные отношения с партнёрами,
              обеспечивая прозрачность сделок, стабильность цен
              и своевременные поставки.
            </p>
          </div>
        </div>

        {/* ================= КАРТА ================= */}
        <div>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-12">
            Наш склад и офис
          </h3>

          <div className="rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
            <YandexMap />
          </div>
        </div>



        {/* ================= РЕКВИЗИТЫ ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Реквизиты */}
          <div className="p-10 rounded-3xl bg-white shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Реквизиты компании
            </h3>

            <div className="space-y-4">
              {[
                { label: "ООО", value: "«Бизнес и Хлеб»" },
                { label: "ИНН", value: "7700000000" },
                { label: "КПП", value: "770101001" },
                { label: "ОГРН", value: "1157700000000" },
                { label: "Р/с", value: "40702810000000000000" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Документы */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Документы и сертификаты
            </h3>

            <div className="space-y-4">
              {[
                "Договор поставки",
                "Счет-фактура",
                "ТОРГ-12",
                "Сертификаты качества",
                "Декларации соответствия",
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-md hover:scale-105 transition">
              Скачать реквизиты PDF
            </button>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center pt-20 border-t border-gray-100">

          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Готовы к сотрудничеству?
          </h3>

          <p className="mt-6 text-gray-600 max-w-xl mx-auto text-lg">
            Оставьте заявку — мы подготовим коммерческое предложение
            и свяжемся с вами в течение рабочего дня.
          </p>

          <Link
            href={`tel:${phone}`}
            className="btn-primary mt-5 "
          >
            Позвонить нам
          </Link>
        </div>

      </div>
    </section>
  );
}


