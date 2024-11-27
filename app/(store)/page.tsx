import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/getAllProduct";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      <h1>Landing Page


 
      
      
      </h1>

      
    </div>
  );
}
