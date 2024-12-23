"use client"

import useBasketStore from "@/store/store";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface AddtoBasketButtonProps {
    product: Product;
    disabled: boolean;
}

function AddToBasketButton( { product, disabled }: AddtoBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);

    const [isClient, setIsClient] = useState(false);


    //ensure it is onky mounted on the clientside
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
  return (
    <div className="flex items-center justify-center space-x-1">
        <button onClick={() => removeItem(product._id)}
            className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${itemCount === 0 
                ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={itemCount === 0 || disabled}>
            -</button> 
        <span className="w-auto text-center font-semibold">{itemCount}</span>

        <button onClick={() => addItem(product)}
            className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${disabled
                ? "bg-gray-100 cursor-not-allowed"
            : "bg-green-200 hover:bg-green-300"}
            `}
            disabled={disabled}>
            +</button> 

        </div>
  )
}

export default AddToBasketButton