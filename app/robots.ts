import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_URL || 'https://biznes-hleb.ru'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private'], // Закрой технические разделы, если они есть
    },
    sitemap: `${url}/sitemap.xml`,
  }
}