"use client";

import { motion } from "framer-motion";
import { YandexMap } from "../components/YandexMap";

export function Geography() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-(--color-bg) to-neutral-50 overflow-hidden">
      <div className="w-[90%] max-w-6xl mx-auto">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Наше расположение
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Адрес офиса указан ниже. Добраться можно на автомобиле и общественном транспорте.
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
            <div>
              <h3 className="text-2xl font-bold">Адрес</h3>
              <p className="text-neutral-600 mt-2">
                Самара, ул. Примерная, 10
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Телефон</h3>
              <p className="text-neutral-600 mt-2">
                +7 (999) 123-45-67
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Режим работы</h3>
              <p className="text-neutral-600 mt-2">
                Пн–Пт: 09:00 – 18:00
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}