
export interface Category {
    id: number;
    name: string;
    slug: string;
    products?: [{ count: number }];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    image_url?: string;
    category_id: number;
    category?: Category;
}