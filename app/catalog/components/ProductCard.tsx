"use client";
import { Product } from "@/app/types/types";


export function ProductCard({ product }: { product: Product }) {
    return (
            <article
                className="relative h-[300px] bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group "
                itemScope
                itemType="https://schema.org/Product"
            >
                {/* Изображение с микроанимацией */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
                            itemProp="image"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            Изображение недоступно
                        </div>
                    )}

                    {/* Градиент overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Контент */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3
                        className="text-lg font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors"
                        itemProp="name"
                    >
                        {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 flex-1" itemProp="description">
                        {product.description}
                    </p>

                    {/* Кнопка CTA */}
                    <a
                        href={`/product/${product.id}`}
                        className="btn-primary"
                        itemProp="url"
                    >
                        Подробнее
                    </a>

                    {/* Декоративные элементы */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-200/20 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-orange-200/20 blur-3xl pointer-events-none" />
                </div>
            </article>
    );
}