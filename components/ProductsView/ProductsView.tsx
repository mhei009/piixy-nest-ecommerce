import { Category, Product } from "@/sanity.types";
import ProductGrid from "../ProductGrid/ProductGrid";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
    return <div className=" flex flex-col">
       


    <div>
        {/* products */}
        <div className="flex-1">
                <ProductGrid products={products} />
              
        </div>
    </div>
    </div>

};

export default ProductsView;