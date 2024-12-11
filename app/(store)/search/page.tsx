import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({searchParams,
    

}:  {
    searchParams: {
        query: string
    }; 
  }) {
        const { query } = await searchParams;
        const products = await searchProductsByName(query);

        if (!products.length) {

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          No Products Found for: {query}
        </h1>
        <p className="text-grey-600 text-center">
          Try seach with different keywords
        </p>
      </div>
    </div>
  );
}

return (
  <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-2">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Search Results for: {query} 
        </h1>
        <ProductGrid products={products} />
      </div>
      </div>
)

    }
export default SearchPage;