
import { CategoryList } from "./indexComponents/Category";
import { AboutSection } from "./indexComponents/AboutSection";
import { Geography } from "./indexComponents/Georgaphy";
import { Hero } from "./indexComponents/Hero";
import { getProducts, getCategories } from "@/utils/catalog/getCatalog";
import { FaqSection } from "./indexComponents/Faq";

export async function generateMetadata() {
    return{
        title: "Орехи и сухофрукты оптом в Самаре — поставщик с доставкой | Бизнес и хлеб",
        description:
            "Продажа орехов и сухофруктов оптом в Самаре. Поставки для магазинов и производств. Работаем с НДС. Доставка по Самарской области."
    }
}

export default async function IndexPage() {

  const categories = await getCategories();

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-(--color-bg)">
        
      {/* Hero Section */}
      <Hero />

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