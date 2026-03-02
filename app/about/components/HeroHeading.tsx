"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "орехи",
  "масла",
  "сухофрукты",
  "цукаты",
  "семена",
  "упаковку",
  "пищевые добавки",
  "молочные ингредиенты",
  "кондитерские ингредиенты",
];

const CATEGORY_PILLS = [
  "Орехи",
  "Цукаты",
  "Изюм",
  "Сухофрукты",
  "Масла",
  "Семена",
  "Кондитерские ингредиенты",
  "Молочные ингредиенты",
  "Хлебопекарные ингредиенты",
  "Пищевые добавки",
  "Упаковка",
  "Плёнка",
];

export function HeroHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CATEGORIES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── Main animated headline ── */}
      <h1
        className="text-6xl md:text-7xl font-bold leading-[1.08]"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-secondary)" }}
      >
        Поставляем
        {/* cycling word block — fixed min-width so layout doesn't jump */}
        <span className="block relative" style={{ minHeight: "1.15em" }}>
          <AnimatePresence mode="wait">
            <motion.em
              key={index}
              className="not-italic "
              style={{ color: "var(--color-primary)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {CATEGORIES[index]}
            </motion.em>
          </AnimatePresence>
        </span>
        <span className="block">оптом по Самарской области</span>
      </h1>

      {/* ── Category pills ── */}
      <div className="mt-10 flex flex-wrap gap-2 ">
        {CATEGORY_PILLS.map((cat, i) => (
          <motion.span
            key={cat}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.04, duration: 0.35, ease: "easeOut" }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-default"
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-secondary)",
              border: "1px solid #fde68a",
            }}
          >
            {cat}
          </motion.span>
        ))}
      </div>
    </div>
  );
}