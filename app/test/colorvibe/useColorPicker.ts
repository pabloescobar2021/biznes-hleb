// useColorPicker.ts
type Props = {
    bgColor?: string        // Цвет фона
    primaryColor?: string   // Кнопки, акценты, интерактив
    textColor?: string      // БАЗОВЫЙ цвет текста (от него строим остальное)
}

export function useColorPicker({ 
    bgColor = '#ffffff', 
    primaryColor = '#3b82f6',
    textColor = '#000000'  // Новый параметр!
}: Props) {
    
    const bg = parseToHSL(bgColor)
    const primary = parseToHSL(primaryColor)
    const text = parseToHSL(textColor)  // Парсим базовый цвет текста

    const isDark = bg.l < 50

    return {
        // ===== БАЗОВЫЕ ЦВЕТА =====
        background: `hsl(${bg.h}, ${bg.s}%, ${bg.l}%)`,
        
        surface: isDark
            ? `hsl(${bg.h}, ${bg.s}%, ${Math.min(bg.l + 5, 100)}%)`
            : `hsl(${bg.h}, ${bg.s}%, ${Math.max(bg.l - 3, 0)}%)`,
        
        surfaceHover: isDark
            ? `hsl(${bg.h}, ${bg.s}%, ${Math.min(bg.l + 8, 100)}%)`
            : `hsl(${bg.h}, ${bg.s}%, ${Math.max(bg.l - 6, 0)}%)`,

        // ===== ТЕКСТ (теперь от textColor!) =====
        // Самый яркий текст
        foreground: `hsl(${text.h}, ${text.s}%, ${text.l}%)`,
        
        // H1 - чуть светлее/темнее базового
        h1: `hsl(${text.h}, ${Math.max(text.s - 5, 0)}%, ${adjustLightness(text.l, 5, isDark)}%)`,
        
        // H2 
        h2: `hsl(${text.h}, ${Math.max(text.s - 30, 0)}%, ${adjustLightness(text.l, 10, isDark)}%)`,
        
        // H3
        h3: `hsl(${text.h}, ${Math.max(text.s - 15, 0)}%, ${adjustLightness(text.l, 15, isDark)}%)`,
        
        // Paragraph - основной текст (чуть менее насыщенный)
        paragraph: `hsl(${text.h}, ${Math.max(text.s - 20, 0)}%, ${adjustLightness(text.l, 20, isDark)}%)`,
        
        // Span - еще мягче
        span: `hsl(${text.h}, ${Math.max(text.s - 25, 0)}%, ${adjustLightness(text.l, 25, isDark)}%)`,
        
        // Muted - приглушенный
        muted: `hsl(${text.h}, ${Math.max(text.s - 35, 0)}%, ${adjustLightness(text.l, 35, isDark)}%)`,

        // ===== PRIMARY (основной цвет бренда) =====
        primary: `hsl(${primary.h}, ${primary.s}%, ${primary.l}%)`,
        
        primaryHover: `hsl(${primary.h}, ${primary.s}%, ${Math.max(primary.l - 8, 10)}%)`,
        
        primaryLight: `hsl(${primary.h}, ${Math.max(primary.s - 10, 0)}%, ${Math.min(primary.l + 15, 90)}%)`,
        
        primaryLighter: `hsl(${primary.h}, ${Math.max(primary.s - 20, 0)}%, ${Math.min(primary.l + 30, 95)}%)`,
        
        primaryDark: `hsl(${primary.h}, ${primary.s}%, ${Math.max(primary.l - 15, 10)}%)`,

        primaryForeground: primary.l > 50 ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 98%)',

        // ===== BORDERS (от текста, но очень приглушенные) =====
        border: `hsl(${text.h}, ${Math.max(text.s - 40, 0)}%, ${adjustLightness(text.l, 50, isDark)})`,
        
        borderHover: `hsl(${text.h}, ${Math.max(text.s - 35, 0)}%, ${adjustLightness(text.l, 45, isDark)})`,

        // ===== SEMANTIC COLORS =====
        error: 'hsl(0, 72%, 51%)',
        errorLight: 'hsl(0, 72%, 95%)',
        
        success: 'hsl(142, 71%, 45%)',
        successLight: 'hsl(142, 71%, 95%)',
        
        warning: 'hsl(38, 92%, 50%)',
        warningLight: 'hsl(38, 92%, 95%)',
        
        info: 'hsl(199, 89%, 48%)',
        infoLight: 'hsl(199, 89%, 95%)',

        disabled: `hsl(${text.h}, ${Math.max(text.s - 50, 0)}%, ${adjustLightness(text.l, 60, isDark)})`,

        shadow: isDark ? 'hsla(0, 0%, 0%, 0.5)' : 'hsla(0, 0%, 0%, 0.1)',
    }
}

// Вспомогательная функция для корректировки яркости
function adjustLightness(baseLightness: number, adjustment: number, isDark: boolean): number {
    if (isDark) {
        // Для темного фона: уменьшаем яркость текста (делаем темнее)
        return Math.max(baseLightness - adjustment, 10)
    } else {
        // Для светлого фона: увеличиваем яркость текста (делаем светлее)
        return Math.min(baseLightness + adjustment, 90)
    }
}

function parseToHSL(color: string) {
    if (color.startsWith('#')) {
        return hexToHSL(color)
    } 
    else if (color.startsWith('rgb')) {
        return rgbToHSL(color)
    }
    else if (color.startsWith('hsl')) {
        const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
        if (!match) throw new Error('Invalid HSL format')
        return { h: +match[1], s: +match[2], l: +match[3] }
    }
    throw new Error('Unsupported color format')
}

function hexToHSL(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    
    let h = 0
    let s = 0
    let l = (max + min) / 2
    
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        
        switch (max) {
            case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / delta + 2) / 6; break
            case b: h = ((r - g) / delta + 4) / 6; break
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

function rgbToHSL(rgb: string) {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (!match) throw new Error('Invalid RGB format')
    
    const r = +match[1] / 255
    const g = +match[2] / 255
    const b = +match[3] / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    
    let h = 0
    let s = 0
    let l = (max + min) / 2
    
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        
        switch (max) {
            case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / delta + 2) / 6; break
            case b: h = ((r - g) / delta + 4) / 6; break
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}