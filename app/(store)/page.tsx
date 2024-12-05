

import ChristmasBanner from "@/components/ChristmasBanner";
import ProductsView from "@/components/ProductsView/ProductsView";

import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();


  return (
    <div>
      <h1>Landing Page Hero
        
      </h1>

      <ChristmasBanner />


      <div>
        
      
      </div>
<div className="flex flex-col items-center justify-top min-h-screen p-4">
  <ProductsView products={products} categories={categories} />

  
</div>
      
    </div>
  );
}
