import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/getAllProduct";


export default function Home() {
  return (
    <div>
      <h1>Landing Page </h1>

      <div>
        <ProductsView products={products}/>
      </div>

      
    </div>
  );
}
