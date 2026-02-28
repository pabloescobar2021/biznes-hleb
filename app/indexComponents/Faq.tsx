"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export function FaqSection() {
  const faq: FAQItem[] = [
  {
    q: "Чем занимается ваша компания?",
    a: "Мы осуществляем оптовые поставки продукции для бизнеса в Самаре и Самарской области. Работаем напрямую с производителями, обеспечивая стабильное качество и прозрачные условия сотрудничества."
  },
  {
    q: "С кем вы сотрудничаете?",
    a: "Мы работаем с индивидуальными предпринимателями, юридическими лицами, розничными магазинами, кафе и торговыми компаниями Самары и области. Ориентированы на долгосрочное партнёрство."
  },
  {
    q: "Как оформить заказ?",
    a: "Для оформления заказа свяжитесь с нами удобным способом: по телефону, по электронной почте, в Telegram или WhatsApp. Менеджер уточнит детали, согласует объём и сроки поставки."
  },
  {
    q: "В какие районы осуществляется доставка?",
    a: "Поставки осуществляются по Самаре и всей территории Самарской области. Возможны регулярные отгрузки и разовые поставки по согласованному графику."
  },
  {
    q: "Предоставляете ли вы документы и сертификаты?",
    a: "Вся продукция сопровождается необходимыми сертификатами качества и комплектом закрывающих документов. Работаем официально с заключением договора поставки."
  }
]

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // SEO Schema.org FAQ
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <section className="py-24 ">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Заголовок */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h2>

          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            Ответы на основные вопросы о сотрудничестве, условиях работы и поставках.
          </p>
        </div>

        {/* FAQ блок */}
        <div className="mt-16 space-y-5">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl bg-(--color-bg) transition-all duration-300 hover:shadow-lg"
              >
                <button
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-lg font-semibold text-neutral-900">
                    {item.q}
                  </span>

                  <span
                    className={`text-2xl transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`px-8 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-neutral-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}