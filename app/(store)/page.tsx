import ChristmasBanner from "@/components/ChristmasBanner";
import HeroCarousel from "@/components/HeroCarousel";
import ProductsView from "@/components/ProductsView/ProductsView";
import { getAllCarouselSlides } from "@/sanity/lib/hero/getAllCarousel";

import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export const dynamic = "force-dynamic";
export const revalidate = 60; 

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const slides = await getAllCarouselSlides(); 

  return (
    <div>
     
      <HeroCarousel slides={slides} />
      <ChristmasBanner />
      <div className="flex flex-col items-center justify-top min-h-screen p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
