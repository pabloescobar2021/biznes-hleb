"use client"

import { Metadata } from "next";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso"
import React, { useState, forwardRef } from "react"


const items = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Товар ${i + 1}`,
        hslFirst: i % 352
})) 

// List: контейнер grid
const GridList = forwardRef<HTMLDivElement, any>(({style, children, ...props}, ref) => (
    <div
        ref={ref} {...props}
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem',    
            ...style
        }}
    >
        {children}
    </div>
))

// Item: каждая ячейка grid
const GridItem = ({children, ...props}: any) => (
    <div 
        {...props}
        style={{
            flex: '1 0 calc(33.333% - 1rem)', // 3 элемента в ряд с учетом gap
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        {children}
    </div>
)

const gridComponents = {
  List: GridList,
  Item: GridItem,
}   

export default function textList() {
    const init_visible = 30
    const [visibleCount, setVisibleCount] = useState(init_visible)
    const visibleProducts = items.slice(0, visibleCount)

    const loadMore = () => {
        setVisibleCount(visibleCount + 30)
    }

    return(

        <div className="grid grid-cols-[1fr_2fr]"
            style={{height: 'calc(100dvh - 80px)'}}
        >

            <div>
                

            </div>

            <div 
                className="h-full "
            >
                <VirtuosoGrid
                    data={visibleProducts}
                    itemContent={(index, item) => (
                        <div
                            key={item.id}
                            className={`flex-1 p-10 border rounded shadow `}
                            style={{ backgroundColor: `hsl(${item.hslFirst}, 50%, 50%)` }}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                    components={gridComponents}
                    endReached={loadMore}

                />
            </div>

        </div>

    )
}