"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { YandexMap } from "../components/YandexMap";
import { useMemo } from "react";

export function Geography() {
  /* ─────────────────────────────────────────
     LOCAL BUSINESS STRUCTURED DATA
  ───────────────────────────────────────── */

  const phone = process.env.NEXT_PUBLIC_PHONE
  const url = process.env.NEXT_PUBLIC_URL

   // очищаем телефон от пробелов для tel:
  const phoneClean = phone!.replace(/\s+/g, "");

  
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}/#organization`,
      name: "Бизнес и хлеб",
      url: url,
      telephone: phone,
      
      address: {
        "@type": "PostalAddress",
        streetAddress: "проезд Мальцева, 3, офис 2",
        addressLocality: "Самара",
        postalCode: "443022",
        addressCountry: "RU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "53.2001", // можно заменить на точные координаты
        longitude: "50.1500",
      },
      
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: {
        "@type": "City",
        name: "Самара",
      },
    }),
    []
  );

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-(--color-bg) to-neutral-50 overflow-hidden"
      aria-labelledby="location-heading"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* JSON-LD */}
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-[90%] max-w-6xl mx-auto">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2
            id="location-heading"
            className="text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
          >
            Наш офис в Самаре
          </h2>

          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Мы находимся в Самаре по адресу: проезд Мальцева, 3, офис 2.
            Возможен самовывоз и консультация в офисе.
          </p>
        </motion.div>

        {/* Основной блок */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Карта */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
          >
            <YandexMap />
          </motion.div>

          {/* Контакты */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-xl border border-neutral-200 space-y-6"
          >
            {/* Адрес */}
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <h3 className="text-2xl font-bold">Адрес</h3>
              <p className="text-neutral-600 mt-2" itemProp="streetAddress">
                г. Самара, проезд Мальцева, 3, офис 2
              </p>
              <meta itemProp="postalCode" content="443022" />
              <meta itemProp="addressCountry" content="RU" />
            </div>

            {/* Телефон */}
            <div>
              <h3 className="text-2xl font-bold">Телефон</h3>
              <a
                href={`tel:${phone}`}
                className="text-neutral-600 mt-2 block hover:text-amber-600 transition"
                itemProp="telephone"
              >
                {phone}
              </a>
            </div>

            {/* Время работы */}
            <div itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
              <h3 className="text-2xl font-bold">Режим работы</h3>
              <p className="text-neutral-600 mt-2">
                Пн–Пт: 09:00 – 18:00
              </p>
              <meta itemProp="opens" content="09:00" />
              <meta itemProp="closes" content="18:00" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}