import { supabase } from "@/utils/supabase/supabase";
import { notFound } from "next/navigation";
import { Product } from "@/app/types/types";
import ProductLayout from "./ProductLayout";

const url = process.env.NEXT_PUBLIC_URL;

interface Props {
    params: Promise<{ slug: string; product: string }>;
}

export async function generateStaticParams() {
    const { data } = await supabase
        .from("products")
        .select("slug, category(slug)");

    return (
        data?.map((p: any) => ({
            slug: p.category?.slug ?? "other",
            product: String(p.slug),
        })) || []
    );
}

export async function generateMetadata({ params }: Props) {
    const { product, slug } = await params;

    const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", product)
        .single();

    if (!data) return {};
    const dataProduct: Product = data;

    const title = `${dataProduct.name} оптом | Бизнес и Хлеб`;
    const description = dataProduct.description
        ? `${data.description.slice(0, 150)}... Купить оптом с доставкой по Самарской области.`
        : `Купить ${data.name.toLowerCase()} оптом по выгодной цене с доставкой по Самарской области.`;

    const productUrl = `${url}/catalog/${slug}/${product}`;

    return {
        title,
        description,
        alternates: { canonical: productUrl },
        openGraph: {
            title,
            description,
            url: productUrl,
            siteName: "Бизнес и Хлеб",
            locale: "ru_RU",
            type: "website",
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug, product } = await params;

    const { data: rawDataProduct } = await supabase
        .from("products")
        .select("*, category(id, name, slug)")
        .eq("slug", product)
        .single();

    if (!rawDataProduct || rawDataProduct.category.slug !== slug) return notFound();

    const dataProduct: Product = rawDataProduct;
    const articleSku = dataProduct.id.split("-")[0].toUpperCase();
    const productUrl = `${url}/catalog/${slug}/${product}`;

    const { data: relatedProducts } = await supabase
        .from("products")
        .select("*, category(slug)")
        .eq("category_id", dataProduct.category!.id)
        .neq("id", dataProduct.id)
        .limit(5);

    const jsonLdProduct = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: dataProduct.name,
        image: dataProduct.image_url,
        description: dataProduct.description || `Оптовые поставки ${dataProduct.name}`,
        sku: articleSku,
        brand: { "@type": "Brand", name: dataProduct.manufacturer || "Бизнес и Хлеб" },
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            valueAddedTaxIncluded: "true",
        },
    };

    const jsonLdBreadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Каталог", item: `${url}/catalog` },
            { "@type": "ListItem", position: 2, name: dataProduct.category!.name, item: `${url}/catalog/${slug}` },
            { "@type": "ListItem", position: 3, name: dataProduct.name, item: productUrl },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
            />
            <ProductLayout
                dataProduct={dataProduct as Product & { category: { id: string; name: string; slug: string } }}
                relatedProducts={relatedProducts ?? []}
                slug={slug}
                articleSku={articleSku}
            />
        </>
    );
}