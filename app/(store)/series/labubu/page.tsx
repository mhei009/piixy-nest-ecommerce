import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { getProductsBySeriesName } from "@/sanity/lib/series/getProductsBySeriesName";

type Product = {
  _id: string;
  name: string;
  slug: { current: string }; 
  price: number;
  stock: number;
  description: any;
  image: { asset: { url: string } };
};

async function LabubuSeriesPage() {

  const products = await getProductsBySeriesName("Labubu");

  if (products.length === 0) {
    return notFound();
  }

  console.log(products); 
  return (

    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Labubu Series</h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default LabubuSeriesPage;
