"use client"

import { useEffect, useRef, useState } from "react"

const CATEGORY_ACCENT: Record<string, string> = {
  "Орехи":                              "#d97706",
  "Изюм":                               "#059669",
  "Сухофрукты":                         "#ea580c",
  "Цукаты":                             "#db2777",
  "Масла":                              "#ca8a04",
  "Семена и растительные ингредиенты":  "#65a30d",
  "Кондитерские ингредиенты":           "#7c3aed",
  "Молочные ингредиенты":               "#0284c7",
  "Хлебопекарные ингредиенты":          "#c2410c",
  "Пищевые добавки":                    "#0891b2",
  "Упаковка":                           "#475569",
  "Плёнка":                             "#64748b",
};

export default function ScrollColor() {

    const divs = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Товар ${i + 1}`,
        hslFirst: i * 20 % 352
    }))

    const divRef = useRef<(HTMLDivElement | null)[]>([]);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const [color, setColor] = useState('');

    useEffect(() => {
        if(!sidebarRef.current) return
        if(!divRef.current) return

        const bgColor = divRef.current[0]?.style.background || '#d97706'
        setColor(bgColor)
        sidebarRef.current.style.backgroundColor = bgColor

        

    },[])
    
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting) {
                        const el = entry.target as HTMLDivElement
                        const bgColor = el.style.background

                        setColor(bgColor)
                        if(sidebarRef.current) sidebarRef.current.style.backgroundColor = bgColor
                    }
                })
            },
            {
                threshold: 0.5
            }
        )

        divRef.current.forEach((div) => {
            if(div) {obs.observe(div) }
        })

        return () => obs.disconnect();
        
    },[])

    return(
        
        <div
            className="flex overflow-hidden "
        >
            <div 
                ref={sidebarRef}
                className="w-50 border border-black transition-all duration-300"
                style={{
                    backgroundColor: color
                }}
            >
            </div>


            <div className="flex-1">
                {divs.map((div, index) => (
                    <div 
                        ref={(el) => {divRef.current[index] = el}}
                        key={div.id} 
                        className="h-screen"
                        style={{
                            background: `hsl(${div.hslFirst}, 20%, 50%)`,
                        }}
                        >
                            {div.name}
                    </div>
                ))}
            </div>
        </div>
    )
}