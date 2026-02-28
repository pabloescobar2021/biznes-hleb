"use client";
import Image from "next/image";
import Link from "next/link";
import { Category } from "../types/types";

type Props = {
  categories: Category[];
};

export function CategoryList({ categories }: Props) {
  // Конфиг для стилей и иконок категорий
  const CATEGORY_STYLES: Record<
    string,
    { color: string; bg: string; hoverBg: string; icon: any }
  > = {
    "Сухофрукты": {
      color: "text-amber-600",
      bg: "bg-amber-50",
      hoverBg: "group-hover:bg-amber-500",
      icon: "/images/suhofruits.png" 
    },
    "Изюм": {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      hoverBg: "group-hover:bg-emerald-500",
      icon: "/images/izum.png" 
    },
    "Орехи": {
      color: "text-orange-600",
      bg: "bg-orange-50",
      hoverBg: "group-hover:bg-orange-500",
      icon: "/images/nuts.png" 
    },
    "Цукаты": {
      color: "text-rose-600",
      bg: "bg-rose-50",
      hoverBg: "group-hover:bg-rose-500",
      icon: "/images/cukati2.png" 
    },
    "Прочее": {
      color: "text-slate-600",
      bg: "bg-slate-50",
      hoverBg: "group-hover:bg-slate-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      ),
    },
  };

  const categoryNames = Object.keys(CATEGORY_STYLES);

  // Собираем категории с данными и стилями
  const mappedCategories = categories
  .filter(cat => categoryNames.includes(cat.name))
  .map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: cat.products?.[0].count ?? 0,
    ...(CATEGORY_STYLES[cat.name] ),
  }));

  
  return (
    <section 
      className="w-[90%] mx-auto md:py-12 py-6 "
      aria-labelledby="catalog-heading"
      >
      <div className="relative flex flex-col md:flex-row md:items-end justify-between md:mb-12 gap-6">

       {/* Заголовок */}
        <div className="max-w-xl">
          <h2 
            id="catalog-heading" 
            className="text-amber-600 font-semibold  "
          >
            Каталог продукции
          </h2>
        </div>
        

        <Link 
          href="/catalog" 
          className="group items-center gap-2 text-sm font-bold text-(--color-secondary) hover:text-amber-600 transition-colors
            md:flex hidden
          "
        >
          Весь каталог
          <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Сетка категорий */}
     <nav aria-label="Категории продукции">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:pt-0 pt-5">
          {mappedCategories.map((item, i) => (
            <li key={item.slug} className="flex justify-center">
              <Link
                href={`/catalog/${item.slug}`}
                className={`
                  relative w-52 h-64 group rounded-3xl overflow-hidden
                  border border-gray-100 shadow-sm bg-white
                  hover:scale-105 hover:shadow-2xl transition-all duration-300
                `}
              >
                {/* Изображение или иконка */}
                <div className="relative w-full h-4/5 rounded-2xl overflow-hidden">
                  {item.name === "Прочее" ? (
                    <div className="flex items-center justify-center w-full h-full text-4xl text-slate-600">
                      {item.icon}
                    </div>
                  ) : (
                    <Image
                      src={item.icon}
                      alt={`${item.name} оптом купить в Самарской области`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover rounded-2xl transform transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Текст и бейдж с количеством */}
                <div className="absolute bottom-1 w-full flex flex-col justify-center items-center z-10 ">

                  <h3 
                    className="text-lg transition-colors"
                    style={{}}
                    >
                    {item.name}
                  </h3>

                  <span className="text-xs font-medium text-gray-500 group-hover:text-amber-700">
                    {item.count} товаров
                  </span>

                </div>

                {/* Декоративная нижняя линия при hover */}
                <span className={`absolute bottom-0 left-0 h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-500`} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full justify-center items-center pt-10 flex md:hidden">
        <Link 
          href="/catalog" 
          className="group flex items-center gap-2 text-md font-bold text-(--color-secondary) hover:text-amber-600 transition-colors"
        >
          Весь каталог
          <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}