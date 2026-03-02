"use client"

import { useState } from "react";
import { Category, Product } from "../types/types";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
    categories: Category[]
}

export function Hero(p: Props) {

    return(
        <section 
            className="relative w-full md:w-[90%] mx-auto md:mt-5 flex flex-col md:flex-row gap-1 
            bg-[#fffbf5] p-2 md:p-5 rounded-2xl shadow-lg 
            overflow-hidden
            "
        >
            {/* Left Side */}
            <div className="flex flex-col items-start md:max-w-[70%]  z-10
                bg-[#fbf0e0]/90 backdrop-blur-2xl rounded-2xl p-5
            ">

                {/* B2B Badge */}
                <div className="mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 text-sm font-medium text-amber-700 shadow-sm">
                    Оптовые поставки для бизнеса
                </div>

                <h1 className="font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                    Поставки орехов и сухофруктов оптом в Самаре
                    <br></br>
                    <span className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                     с доставкой по Самарской области
                    </span>
                </h1>

                {/* seo */}
                <p className="sr-only">
                    Орехи оптом в Самаре, сухофрукты оптом, поставщик орехов Самара,
                    оптовая база сухофруктов, кешью оптом, миндаль оптом, финики оптом
                </p>

                <p className="text-lg md:text-xl text-gray-600 mb-2 leading-relaxed max-w-lg">
                    Работаем по всей Самарской области. 
                    Стабильные объёмы, свежая продукция и выгодные условия для магазинов и производств.
                </p>

                {/* ── Category pills ── */}
                <div className="py-5 flex flex-wrap gap-1 ">
                    {p.categories.map((cat, i) => (
                    <motion.span
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.04, duration: 0.35, ease: "easeOut" }}
                        className="px-1 py-1.5 rounded-full text-xs font-semibold cursor-default text-black/50 "
                    >
                        {cat.name}
                    </motion.span>
                    ))}
                </div>

                {/* Кнопки */}
                <div className="flex gap-4">
                    <Link href="/catalog" className="btn-primary">
                    Смотреть каталог
                    </Link>

                    <button className="px-6 py-3 rounded-md border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 transition">
                    Получить прайс
                    </button>
                </div>
            </div>

           
           <div className="absolute inset-0 bg-black-20 backdrop-blur-md z-2"></div>
            
            <video  
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-2xl z-1"
                style={{ 
                    filter: 'brightness(0.92) blur(5px)', 
                }}
            >
                <source src="/videos/nutsfall.mp4" type="video/mp4" />
            </video>


            {/* Лёгкий оверлей чтобы текст читался если понадобится */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />

                
            
            {/* visual effect */}
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      </section>
    )
}