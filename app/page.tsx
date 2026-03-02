
import { CategoryList } from "./indexComponents/Category";
import { AboutSection } from "./indexComponents/AboutSection";
import { Geography } from "./indexComponents/Georgaphy";
import { Hero } from "./indexComponents/Hero";
import { getProducts, getCategories } from "@/utils/catalog/getCatalog";
import { FaqSection } from "./indexComponents/Faq";

export async function generateMetadata() {
  const url = process.env.NEXT_PUBLIC_URL!

    return{
        metadataBase: new URL(url),
        title: "Орехи и сухофрукты оптом в Самаре — поставщик с доставкой | Бизнес и хлеб",
        description:
            "Продажа орехов и сухофруктов оптом в Самаре. Поставки для магазинов и производств. Работаем с НДС. Доставка по Самарской области.",
        alternates: {
          canonical: "/",
        },

        openGraph: {
          title: "Орехи и сухофрукты оптом в Самаре | Бизнес и хлеб",
          description:
            "Оптовые поставки орехов и сухофруктов в Самаре. Работаем с НДС. Доставка по области.",
          url: url,
          siteName: "Бизнес и хлеб",
          images: [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Орехи и сухофрукты оптом в Самаре",
            },
          ],
          locale: "ru_RU",
          type: "website",
        },
        
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
    }
}

export default async function IndexPage() {

  const categories = await getCategories();

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-(--color-bg)">
        
      {/* Hero Section */}
      <Hero categories={categories}/>

      {/* Категории */}
      <CategoryList categories={categories}/>

      {/* О нас */}
      <AboutSection/>

      <FaqSection/>

      {/* Доставка и география */}
      <Geography/>


    </main>
  );
}