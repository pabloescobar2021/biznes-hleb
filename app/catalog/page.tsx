import { CatalogLayout } from "./CatalogLayout";
import { getCategories, getProducts } from "@/utils/catalog/getCatalog";

export const revalidate = 300;
export async function generateMetadata() {
    return{
        title: "Каталог товаров",
        description:
            "Орехи, сухофрукты, изюм, цукаты оптом с доставкой по Самарской области"
    }
}


export default async function CatalogPage() {
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ])
    
    return (
        <CatalogLayout
            categories={categories}
            products={products}
        />
    );
}