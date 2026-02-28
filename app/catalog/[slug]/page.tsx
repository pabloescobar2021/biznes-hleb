import { CatalogLayout } from "../CatalogLayout";
import { getCategories, getProducts } from "@/utils/catalog/getCatalog";
import { supabase } from "@/utils/supabase/supabase";
import { notFound } from "next/navigation";

interface Props{
    params: Promise<{slug: string}>;
}

export async function generateStaticParams() {
    const {data} = await supabase.from("category").select("slug");

    return data?.map((cat) => ({
        slug: cat.slug,
    })) || [];
}

export async function generateMetadata({ params }: Props) {
    const {slug} = await params

    const { data } = await supabase
        .from('category')
        .select('*')
        .eq('slug', slug)
        .single();
    if(!data) return notFound();
    
    return{
        title: `${data.name} оптом в Самарской области`,
        description: `Купить ${data.name.toLowerCase()} оптом с доставкой по Самарской области`
    }
}

export default async function CatalogCategory({params}: Props){
    const {slug} = await params
    const {data: category} = await supabase
        .from('category')
        .select('*')
        .eq('slug', slug)
        .single()
    if(!category) return notFound();

    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts({categoryId: category.id}),
    ])


    return(
        <CatalogLayout
            categories={categories}
            products={products}
            activeSlug={slug}
        />
    )
}