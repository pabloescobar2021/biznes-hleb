"use client";

export default function Category() {
  const categories = [
    {
      name: "Сухофрукты",
      count: "120+",
      color: "text-amber-600",
      bg: "bg-amber-50",
      hoverBg: "group-hover:bg-amber-500",
      // SVG иконка яблока/фрукта
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
      ),
    },
    {
      name: "Изюм",
      count: "85",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      hoverBg: "group-hover:bg-emerald-500",
      // SVG иконка зерна/листа
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M2 22h20" />
          <path d="M12 2v20" />
          <path d="M12 2a5 5 0 0 1 5 5c0 2.5-2.5 4.5-5 9-2.5-4.5-5-6.5-5-9a5 5 0 0 1 5-5Z" />
        </svg>
      ),
    },
    {
      name: "Орехи",
      count: "200+",
      color: "text-orange-600",
      bg: "bg-orange-50",
      hoverBg: "group-hover:bg-orange-500",
      // SVG иконка ореха/круга
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      name: "Цукаты",
      count: "64",
      color: "text-rose-600",
      bg: "bg-rose-50",
      hoverBg: "group-hover:bg-rose-500",
      // SVG иконка подарка/куба
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
          <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
        </svg>
      ),
    },
    {
      name: "Прочее",
      count: "40",
      color: "text-slate-600",
      bg: "bg-slate-50",
      hoverBg: "group-hover:bg-slate-500",
      // SVG иконка точек
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-[90%] mx-auto py-5">
      {/* Заголовок */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-xl">
          <span className="text-amber-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Каталог продукции
          </span>
        </div>
        
        <button className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors">
          Весь каталог
          <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Сетка */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((item, i) => (
          <button
            key={i}
            className={`
              group relative flex flex-col items-center justify-center
              p-6 rounded-3xl
              bg-white border border-gray-100
              shadow-sm hover:shadow-xl
              hover:shadow-amber-900/5
              transition-all duration-300 ease-out
              overflow-hidden
            `}
          >
            {/* Фоновый градиент при наведении */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              bg-gradient-to-br from-white to-gray-50
            `} />
            
            {/* Цветное пятно (Glow effect) */}
            <div className={`
              absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20
              ${item.hoverBg} transition-opacity duration-500
            `} />

            {/* Контейнер иконки */}
            <div className={`
              relative z-10 mb-5 p-4 rounded-2xl 
              ${item.bg} ${item.color}
              transform group-hover:scale-110 group-hover:-translate-y-1
              transition-all duration-300 shadow-sm
            `}>
              {item.icon}
            </div>

            {/* Текст */}
            <div className="relative z-10 text-center w-full">
              <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                {item.name}
              </h3>
              
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-50 border border-gray-100 group-hover:border-transparent group-hover:bg-white/50 transition-all">
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                  {item.count} товаров
                </span>
              </div>
            </div>

            {/* Нижняя линия */}
            <div className={`
              absolute bottom-0 left-0 h-1 w-0 
              ${item.hoverBg}
              group-hover:w-full transition-all duration-500 ease-out
            `} />
          </button>
        ))}
      </div>
    </section>
  );
}