import { MetadataRoute } from 'next'
import { supabase } from '@/utils/supabase/supabase'

import { Product } from './types/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_URL || 'https://biznes-hleb.ru'

  // 1. Статические страницы
  const staticRoutes = [
    '',
    '/catalog',
    '/about',
  ].map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  // 2. Получаем все категории из базы
  const { data: categories } = await supabase.from('category').select('slug')
  const categoryRoutes = (categories || []).map((cat) => ({
    url: `${url}/catalog/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. Получаем все товары из базы
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('slug, category(slug)')

  const productRoutes = (products || []).map((prod: any) => ({
    url: `${url}/catalog/${prod.category?.slug || 'other'}/${prod.slug}`,
    lastModified: new Date(prod.updated_at || new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}