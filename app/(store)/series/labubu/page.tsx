
import { imageUrl } from "@/lib/imageUrl"; 

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductsBySeriesName } from "@/sanity/lib/series/getProductsBySeriesName";


type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: any; 
  image: { asset: { url: string } };
};

async function LabubuSeriesPage() {
  // fetch all products related to labubu
  const products = await getProductsBySeriesName("Labubu");

  
  if (products.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Labubu Series</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Products in Labubu Series:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => {
            const isOutOfStock = product.stock != null && product.stock <= 0;

            return (
              <div
                key={product._id}
                className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
                  isOutOfStock ? "opacity-50" : ""
                }`}
              >
                {product.image && (
                  <Image
                    src={imageUrl(product.image).url()}
                    alt={product.name ?? "Product Image"}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                  />
                )}

                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <span className="text-white text-lg font-bold">Out of Stock</span>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <div className="text-lg font-semibold mb-4">
                    {product.price != null ? product.price.toFixed(2) : "N/A"} SEK
                  </div>

            
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LabubuSeriesPage;
