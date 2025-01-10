import ProductsView from "@/components/ProductsView/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function CategoryPage(
    { params }: {params: Promise<{slug: string}>}
) {
    const { slug } = await params;

    const products = await getProductsByCategory(slug)
    const categories = await getAllCategories()

    return <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">
            {slug.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(" ")} {" "}
            Collection
        </h1>
        <ProductsView products={products} categories={categories} />
    </div>
}

export default CategoryPage