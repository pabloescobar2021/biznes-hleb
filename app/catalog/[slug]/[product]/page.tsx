
import { supabase } from "@/utils/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product } from "@/app/types/types";
import { getCategories, getProducts } from "@/utils/catalog/getCatalog";


interface Props{
    params: Promise<{slug: string, product: string}>;
}

export async function generateStaticParams() {
    const {data} = await supabase
        .from("products")
        .select("slug, category(slug)");

    return data?.map((p: any) => ({
        slug: p.category?.slug ?? "other",
        product: String(p.slug),
    })) || [];
}

export async function generateMetadata({ params }: Props) {
    const {product} = await params

    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', product)
        .single();
    if(!data) return {};
    
    return{
        title: `${data.name} оптом - Бизнес и хлеб`,
        description: `Купить ${data.name.toLowerCase()} оптом с доставкой по Самарской области`
    }
}

export default async function ProductPage({params}: Props){
    const {slug, product} = await params

    const {data: dataProduct} = await supabase
        .from('products')
        .select('*, category(id, name, slug)')
        .eq('slug', product)
        .single();

        if(!dataProduct) return notFound();

    // ← Проверяем что категория совпадает с URL
    if(dataProduct.category.slug !== slug) return notFound();

    return(
        <div> {dataProduct.name} </div>
    )
}