"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export function FaqSection({ name }: { name: string }) {
  const product = name.toLowerCase();

  const faq: FAQItem[] = [
    {
      q: `Какой минимальный объём поставки ${product}?`,
      a: `Минимальный объём поставки составляет от 5 кг. Для постоянных партнёров доступны индивидуальные условия и специальные ценовые предложения при увеличении партии.`
    },
    {
      q: `Как оформить оптовый заказ ${product}?`,
      a: `Свяжитесь с нами по телефону или оставьте заявку на сайте. Персональный менеджер оперативно уточнит детали, подготовит коммерческое предложение и согласует удобные условия поставки.`
    },
    {
      q: `Предоставляются ли сертификаты качества на ${product}?`,
      a: `Вся продукция сопровождается необходимыми сертификатами качества и декларациями соответствия. Документы предоставляются с каждой партией товара.`
    },
    {
      q: `С какими формами бизнеса вы работаете?`,
      a: `Мы сотрудничаем с ИП и юридическими лицами любых организационных форм. Возможна работа с НДС и без НДС, с заключением официального договора поставки.`
    },
    {
      q: `Какие условия доставки доступны?`,
      a: `Организуем поставку в согласованные сроки с соблюдением требований к хранению и транспортировке продукции. Возможен самовывоз или доставка логистическими партнёрами.`
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // SEO Schema.org
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          Вопросы и ответы
        </h2>

        <p className="mt-6 text-lg text-neutral-600 text-center max-w-2xl mx-auto">
          Ответы на ключевые вопросы по оптовым поставкам {product}. 
          Если вам требуется дополнительная информация — свяжитесь с нашим менеджером.
        </p>

        {/* FAQ */}
        <div className="mt-14 space-y-4">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-neutral-200 rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-lg font-semibold text-neutral-900">
                    {item.q}
                  </span>
                  <span
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
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

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}