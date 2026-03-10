"use client"

import { useState } from "react"
import { useColorPicker } from "./useColorPicker"

// Пресеты с тремя цветами
const PRESETS = [
    { name: 'Ocean', bg: '#0f172a', primary: '#06b6d4', text: '#e0f2fe' },
    { name: 'Amber Light', bg: '#ffffff', primary: '#f59e0b', text: '#d97706' },
    { name: 'Forest', bg: '#f0fdf4', primary: '#16a34a', text: '#15803d' },
    { name: 'Sunset', bg: '#1c1917', primary: '#f97316', text: '#fed7aa' },
    { name: 'Purple', bg: '#faf5ff', primary: '#a855f7', text: '#7c3aed' },
    { name: 'Dark', bg: '#09090b', primary: '#22d3ee', text: '#67e8f9' },
    { name: 'Rose', bg: '#fff1f2', primary: '#e11d48', text: '#be123c' },
    { name: 'Cyber', bg: '#0a0a0a', primary: '#00ff88', text: '#00ffcc' },
]

export default function ColorVibe() {
    const [bgColor, setBgColor] = useState('#ffffff')
    const [primaryColor, setPrimaryColor] = useState('#3b82f6')
    const [textColor, setTextColor] = useState('#0f172a')

    const theme = useColorPicker({
        bgColor,
        primaryColor,
        textColor,
    })

    return (
        <div
            className="min-h-[calc(100dvh-60px)] pb-20 transition-colors duration-300"
            style={{
                backgroundColor: theme.background,
            }}
        >
            <ColorPicker 
                bgColor={bgColor}
                setBgColor={setBgColor}
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                textColor={textColor}
                setTextColor={setTextColor}
                presets={PRESETS}
                theme={theme}
            />

            {/* Hero Section */}
            <section className="flexC flex-col gap-6 py-20 px-6 text-center">
                <h1 
                    className="text-6xl font-bold mb-4 transition-colors"
                    style={{ color: theme.h1 }}
                >
                    Color Vibe Generator
                </h1>
                <p 
                    className="text-xl max-w-2xl transition-colors"
                    style={{ color: theme.paragraph }}
                >
                    Полный контроль над палитрой: фон + основной цвет + цвет текста
                </p>
                <div className="flex gap-4 mt-6">
                    <button
                        className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                        style={{
                            backgroundColor: theme.primary,
                            color: theme.primaryForeground,
                        }}
                    >
                        Попробовать
                    </button>
                    <button
                        className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                        style={{
                            backgroundColor: theme.primaryLight,
                            color: theme.primary,
                        }}
                    >
                        Узнать больше
                    </button>
                </div>
            </section>

            {/* Typography Showcase */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 
                    className="text-4xl font-bold mb-8 transition-colors"
                    style={{ color: theme.h2 }}
                >
                    Типографика
                </h2>
                
                <div className="space-y-6">
                    <TypographyExample 
                        tag="FOREGROUND"
                        color={theme.foreground}
                        text="Базовый цвет текста - напрямую из textColor"
                        className="text-5xl font-bold"
                        details="Берется из вашего выбора без изменений"
                        muted={theme.muted}
                    />

                    <TypographyExample 
                        tag="H1"
                        color={theme.h1}
                        text="Заголовок H1 - Главный заголовок"
                        className="text-5xl font-bold"
                        details="textColor с -5% saturation, ±5% lightness"
                        muted={theme.muted}
                    />
                    
                    <TypographyExample 
                        tag="H2"
                        color={theme.h2}
                        text="Заголовок H2 - Подзаголовок секции"
                        className="text-4xl font-bold"
                        details="textColor с -10% saturation, ±10% lightness"
                        muted={theme.muted}
                    />
                    
                    <TypographyExample 
                        tag="H3"
                        color={theme.h3}
                        text="Заголовок H3 - Подзаголовок блока"
                        className="text-3xl font-semibold"
                        details="textColor с -15% saturation, ±15% lightness"
                        muted={theme.muted}
                    />
                    
                    <TypographyExample 
                        tag="PARAGRAPH"
                        color={theme.paragraph}
                        text="Обычный параграф текста. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        className="text-lg leading-relaxed"
                        details="textColor с -20% saturation, ±20% lightness"
                        muted={theme.muted}
                    />
                    
                    <TypographyExample 
                        tag="SPAN"
                        color={theme.span}
                        text="Вспомогательный текст - используется для меток, подписей и второстепенной информации"
                        className="text-base"
                        details="textColor с -25% saturation, ±25% lightness"
                        muted={theme.muted}
                    />

                    <TypographyExample 
                        tag="MUTED"
                        color={theme.muted}
                        text="Приглушенный текст - для неактивных или второстепенных элементов"
                        className="text-sm"
                        details="textColor с -35% saturation, ±35% lightness"
                        muted={theme.muted}
                    />
                </div>
            </section>

            {/* Cards Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 
                    className="text-4xl font-bold mb-12 transition-colors"
                    style={{ color: theme.h2 }}
                >
                    Компоненты
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                            style={{
                                backgroundColor: theme.surface,
                                borderWidth: '1px',
                                borderColor: theme.border,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme.surfaceHover
                                e.currentTarget.style.borderColor = theme.borderHover
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = theme.surface
                                e.currentTarget.style.borderColor = theme.border
                            }}
                        >
                            <h3 
                                className="text-2xl font-bold mb-3 transition-colors"
                                style={{ color: theme.h3 }}
                            >
                                Карточка {i}
                            </h3>
                            <p 
                                className="mb-4 transition-colors"
                                style={{ color: theme.paragraph }}
                            >
                                Описание карточки с примером текста для демонстрации цветовой палитры.
                            </p>
                            <button
                                className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 active:scale-95"
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.primaryForeground,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = theme.primaryHover
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = theme.primary
                                }}
                            >
                                Действие
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Color Palette Display */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 
                    className="text-4xl font-bold mb-12 transition-colors"
                    style={{ color: theme.h2 }}
                >
                    Полная палитра
                </h2>

                <div className="space-y-8">
                    <ColorGroup 
                        title="Базовые цвета"
                        colors={[
                            { name: 'Background', value: theme.background },
                            { name: 'Surface', value: theme.surface },
                            { name: 'Surface Hover', value: theme.surfaceHover },
                        ]}
                        border={theme.border}
                        textColor={theme.muted}
                    />

                    <ColorGroup 
                        title="Текст (от textColor)"
                        colors={[
                            { name: 'Foreground', value: theme.foreground },
                            { name: 'H1', value: theme.h1 },
                            { name: 'H2', value: theme.h2 },
                            { name: 'H3', value: theme.h3 },
                            { name: 'Paragraph', value: theme.paragraph },
                            { name: 'Span', value: theme.span },
                            { name: 'Muted', value: theme.muted },
                        ]}
                        border={theme.border}
                        textColor={theme.muted}
                    />

                    <ColorGroup 
                        title="Primary цвета"
                        colors={[
                            { name: 'Primary', value: theme.primary },
                            { name: 'Primary Hover', value: theme.primaryHover },
                            { name: 'Primary Light', value: theme.primaryLight },
                            { name: 'Primary Lighter', value: theme.primaryLighter },
                            { name: 'Primary Dark', value: theme.primaryDark },
                            { name: 'Primary Foreground', value: theme.primaryForeground },
                        ]}
                        border={theme.border}
                        textColor={theme.muted}
                    />

                    <ColorGroup 
                        title="Borders (от textColor)"
                        colors={[
                            { name: 'Border', value: theme.border },
                            { name: 'Border Hover', value: theme.borderHover },
                        ]}
                        border={theme.border}
                        textColor={theme.muted}
                    />

                    <ColorGroup 
                        title="Семантические цвета"
                        colors={[
                            { name: 'Error', value: theme.error },
                            { name: 'Success', value: theme.success },
                            { name: 'Warning', value: theme.warning },
                            { name: 'Info', value: theme.info },
                        ]}
                        border={theme.border}
                        textColor={theme.muted}
                    />
                </div>
            </section>

            {/* Alerts/Messages */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 
                    className="text-4xl font-bold mb-12 transition-colors"
                    style={{ color: theme.h2 }}
                >
                    Уведомления
                </h2>

                <div className="space-y-4">
                    <Alert
                        type="success"
                        title="Успех!"
                        message="Операция выполнена успешно"
                        color={theme.success}
                        bgColor={theme.successLight}
                        textColor={theme.paragraph}
                    />

                    <Alert
                        type="error"
                        title="Ошибка!"
                        message="Что-то пошло не так"
                        color={theme.error}
                        bgColor={theme.errorLight}
                        textColor={theme.paragraph}
                    />

                    <Alert
                        type="warning"
                        title="Внимание!"
                        message="Требуется ваше внимание"
                        color={theme.warning}
                        bgColor={theme.warningLight}
                        textColor={theme.paragraph}
                    />

                    <Alert
                        type="info"
                        title="Информация"
                        message="Полезная информация для вас"
                        color={theme.info}
                        bgColor={theme.infoLight}
                        textColor={theme.paragraph}
                    />
                </div>
            </section>
        </div>
    )
}

// Вспомогательные компоненты
function TypographyExample({ 
    tag, 
    color, 
    text, 
    className, 
    details, 
    muted 
}: { 
    tag: string
    color: string
    text: string
    className: string
    details: string
    muted: string
}) {
    return (
        <div>
            <div style={{ color }} className={`${className} mb-2 transition-colors`}>
                {text}
            </div>
            <div className="flex gap-4">
                <span style={{ color: muted }} className="text-sm transition-colors">
                    {tag}
                </span>
                <span style={{ color: muted }} className="text-sm transition-colors">
                    {details}
                </span>
            </div>
        </div>
    )
}

function ColorGroup({ 
    title, 
    colors, 
    border, 
    textColor 
}: { 
    title: string
    colors: { name: string; value: string }[]
    border: string
    textColor: string
}) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const copyColor = (value: string, index: number) => {
        navigator.clipboard.writeText(value)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 1500)
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 transition-colors" style={{ color: textColor }}>
                {title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {colors.map((item, index) => (
                    <button
                        key={item.name}
                        onClick={() => copyColor(item.value, index)}
                        className="flex flex-col gap-2 text-left hover:scale-105 transition-all active:scale-95"
                    >
                        <div
                            className="h-20 rounded-lg border-2 relative"
                            style={{
                                backgroundColor: item.value,
                                borderColor: border,
                            }}
                        >
                            {copiedIndex === index && (
                                <div className="absolute inset-0 flexC text-white bg-black/50 rounded-lg text-xs font-bold">
                                    Скопировано!
                                </div>
                            )}
                        </div>
                        <span 
                            className="text-xs font-medium transition-colors"
                            style={{ color: textColor }}
                        >
                            {item.name}
                        </span>
                        <span 
                            className="text-xs font-mono transition-colors"
                            style={{ color: textColor }}
                        >
                            {item.value}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

function Alert({ 
    type, 
    title, 
    message, 
    color, 
    bgColor, 
    textColor 
}: { 
    type: string
    title: string
    message: string
    color: string
    bgColor: string
    textColor: string
}) {
    return (
        <div
            className="p-4 rounded-lg border-l-4 transition-all"
            style={{
                backgroundColor: bgColor,
                borderColor: color,
            }}
        >
            <h3 
                className="font-bold mb-1 transition-colors"
                style={{ color }}
            >
                {title}
            </h3>
            <p className="transition-colors" style={{ color: textColor }}>
                {message}
            </p>
        </div>
    )
}

// Улучшенный ColorPicker с третьим параметром
function ColorPicker({
    bgColor,
    primaryColor,
    textColor,
    setBgColor,
    setPrimaryColor,
    setTextColor,
    presets,
    theme
}: {
    bgColor: string
    primaryColor: string
    textColor: string
    setBgColor: (color: string) => void
    setPrimaryColor: (color: string) => void
    setTextColor: (color: string) => void
    presets: { name: string; bg: string; primary: string; text: string }[]
    theme: any
}) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div 
            className="fixed top-4 right-4 z-50 rounded-2xl shadow-2xl overflow-hidden transition-all max-w-sm"
            style={{
                backgroundColor: theme.surface,
                borderWidth: '1px',
                borderColor: theme.border,
            }}
        >
            {/* Header */}
            <div 
                className="flexB px-4 py-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                style={{ borderBottom: `1px solid ${theme.border}` }}
            >
                <span className="font-semibold transition-colors" style={{ color: theme.foreground }}>
                    🎨 Color Picker
                </span>
                <span className="text-xl transition-transform" style={{ 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: theme.muted
                }}>
                    ▼
                </span>
            </div>

            {/* Content */}
            {isOpen && (
                <div className="p-4 space-y-4">
                    {/* Color Inputs */}
                    <div className="space-y-3">
                        <ColorInput 
                            label="Цвет фона"
                            value={bgColor}
                            onChange={setBgColor}
                            theme={theme}
                        />

                        <ColorInput 
                            label="Основной цвет (кнопки)"
                            value={primaryColor}
                            onChange={setPrimaryColor}
                            theme={theme}
                        />

                        <ColorInput 
                            label="Цвет текста"
                            value={textColor}
                            onChange={setTextColor}
                            theme={theme}
                        />
                    </div>

                    {/* Presets */}
                    <div>
                        <label className="text-sm font-medium mb-2 block transition-colors" style={{ color: theme.muted }}>
                            Пресеты
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => {
                                        setBgColor(preset.bg)
                                        setPrimaryColor(preset.primary)
                                        setTextColor(preset.text)
                                    }}
                                    className="px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        backgroundColor: preset.primary,
                                        color: '#fff',
                                    }}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function ColorInput({ 
    label, 
    value, 
    onChange, 
    theme 
}: { 
    label: string
    value: string
    onChange: (color: string) => void
    theme: any
}) {
    return (
        <div className="flex items-center gap-3">
            <input 
                type="color" 
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-2"
                style={{ borderColor: theme.border }}
            />
            <div className="flex-1">
                <label className="text-sm font-medium block mb-1 transition-colors" style={{ color: theme.muted }}>
                    {label}
                </label>
                <input 
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className="w-full px-3 py-2 rounded-lg font-mono text-sm transition-colors"
                    style={{
                        backgroundColor: theme.background,
                        color: theme.foreground,
                        borderWidth: '1px',
                        borderColor: theme.border,
                    }}
                />
            </div>
        </div>
    )
}