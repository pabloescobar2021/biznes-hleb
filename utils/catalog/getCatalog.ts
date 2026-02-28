import { supabase } from "@/utils/supabase/supabase";

export async function getCategories() {
    const {data} = await supabase
        .from('category')
        .select('*, products(count)');
    return data ?? []
}

export async function getProducts({ limit, categoryId }: { limit?: number; categoryId?: string } = {}) {
    const query = supabase
        .from("products")
        .select(`
            *,
            category(name, slug)
            `);
    if(categoryId) query.eq("category_id", categoryId)
    if(limit) query.limit(limit)

    const {data} = await query;
    return data ?? []
}