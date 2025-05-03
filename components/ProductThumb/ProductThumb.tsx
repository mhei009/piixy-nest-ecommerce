

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import { Product } from "../../sanity.types";




function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;


    return (

        <Link href={`/products/${product.slug?.current}`}
        className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200 overflow-hidden ${ isOutOfStock ? "opacity-50 " : "" }`}
  
        >

            <div className="relative aspect-square w-full h-full overflow-hidden ">
                {product.image && (
                <Image 
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                src={urlFor(product.image).url()}
                alt={product.name || "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />
                )}

                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <span className="text-white text-lg font-bold">Out of Stock</span>
                    </div>
                )}
                </div>

                <div className="p-4">


                    <h3 className=" font-semibold">{product.name}</h3>
                  
                    <p>{product.price} SEK</p>

                </div>
            </Link>
    )
}

export default ProductThumb;