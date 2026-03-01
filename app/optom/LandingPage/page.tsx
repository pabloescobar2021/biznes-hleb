import { getSeoPages } from "@/lib/seo/seoCategories"
import Link from "next/link"


export default async function LandingPage() {

    const seoCategories = await getSeoPages();

    return (
        <div className="flex flex-col p-2 ">
            
            {seoCategories.map((cat,i) => {
                return(
                    <Link
                        key={i}
                        href={`/optom/${cat.slug}`}
                        className="hover:text-amber-700"
                    >
                        {cat.slug} - {cat.title}
                    </Link>
                )
            })}

        </div>
    )
}