"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function YandexMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    // script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      window.ymaps.ready(() => {
        // @ts-ignore
        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.751574, 37.573856],
          zoom: 13,
          controls: ["zoomControl"],
        });


        // Кастомная метка
        // @ts-ignore
        const placemark = new window.ymaps.Placemark(
          [55.751574, 37.573856],
          {
            balloonContent: "<strong>Наш офис</strong><br/>Москва",
          },
          {
            preset: "islands#orangeIcon",
          }
        );

        map.geoObjects.add(placemark);
        setLoaded(true);
      });
    };

    document.body.appendChild(script);
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      )}

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/10  pointer-events-none z-10" />

      {/* Контейнер карты */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Кнопка */}
      <a
        href="https://yandex.ru/maps/?ll=37.573856%2C55.751574&z=13"
        target="_blank"
        className="absolute bottom-6 right-6 z-20 btn-primary"
      >
        Открыть в Яндекс Картах
      </a>
    </motion.div>
  );
}