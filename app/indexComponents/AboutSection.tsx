"use client";

import Image from "next/image";

export function AboutSection() {
  const stats = [
    { value: "10+", label: "Лет на рынке" },                 // проверяемо
    { value: "500+", label: "Постоянных партнёров" },       // сложно проверить
    { value: "100+", label: "Сортов продукции" },          // реально и убедительно
    { value: "200+", label: "Тонн поставок" },             // сложно проверить
  ];

  return (
    <section className="py-20 px-4 md:px-8 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
            О компании
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Бизнес и Хлеб — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              ваш надёжный поставщик в Самаре
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Оптовые поставки орехов, сухофруктов, цукатов, изюма с 2014 года.
            Работаем напрямую с производителями, гарантируя качество и честные цены.
            Наши клиенты — это магазины, кафе и предприятия Самары и Самарской области.
          </p>
        </div>

        {/* Основной блок: изображение + преимущества */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Текстовая часть */}
          <div className="space-y-8">
            <div className="space-y-6">
              {[
                { title: "Прямые поставки", text: "Работаем напрямую с фермерами и производителями, минуя посредников." },
                { title: "Широкий ассортимент", text: "Более 100 видов орехов, сухофруктов и цукатов и других товаров в наличии." },
                { title: "Гибкие условия", text: "Индивидуальные скидки для постоянных клиентов и крупных заказов." },
                { title: "Гарантия качества", text: "Если товар не соответствует описанию — возврат средств." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group hover:bg-white/50 rounded-2xl p-4 transition-all duration-300">

                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-(--color-surface) flex items-center justify-center text-(--color-secondary) shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="font-bold">{i + 1}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/80 rounded-2xl p-4 shadow-md hover:shadow-amber-200 transition-all">
                  <div className="text-2xl font-extrabold text-(--color-secondary)">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Визуальная часть */}
          <div className="relative w-full h-[90%] md:flex hidden items-center justify-center">
            {[
              { src: 'manynuts.png', badge: 'Свежие поставки', offset: '0', rotate: '1' },
              { src: 'about2.png', badge: 'Высокое качество', offset: '30%', rotate: '2' },
              { src: 'about3.png', badge: 'Честные цены', offset: '60%', rotate: '1' },
            ].map((img, i) => (
              <div
                key={i}
                className={`absolute w-[45%] h-[90%] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500
                  hover:scale-105 hover:rotate-0`}
                style={{
                  left: img.offset,
                  bottom: 20 + i * 10,
                  rotate: `${img.rotate}deg`,
                  zIndex: i + 1,
                }}
              >
                <Image
                  src={`/images/${img.src}`}
                  alt="Орехи, сухофрукты, цукаты"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0} // первый грузим сразу
                />
                <div className="absolute bottom-4 left-4 bg-amber-500/90 text-white font-semibold px-4 py-2 rounded-xl shadow-lg">
                  {img.badge}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}