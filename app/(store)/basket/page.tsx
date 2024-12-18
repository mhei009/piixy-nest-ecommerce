"use client";

import { useRouter } from "next/navigation";
import useBasketStore from "../store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Loader from "@/components/Loader"; 

function BasketPage() {
  // stores state for grouped items
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // state where to manage whether client-side rendering is done
  const [isClient, setIsClient] = useState(false);

  // if on mount, set isClient to true to ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // if  not client-side yet   show the loader
  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-semibold">Your basket</h1>
        <p className="text-gray-500 mt-2">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-semibold">Your basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              {/* product name and image */}
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() => router.push(`/products/${item.product.slug?.current}`)}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="product__name">{item.product.name}</h2>
                  <p className="text-sm sm:text-base">
                    Price: {((item.product.price ?? 0) * item.quantity).toFixed(2)} SEK
                  </p>
                </div>
              </div>

              {/* quantity and button */}
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} disabled={false} />
              </div>
            </div>
          ))}
        </div>

        {/* sticky for Order Summary Div */}
        <div className="w-full lg:w-80 p-6 h-fit border rounded lg:sticky lg:top-4 lg:left-auto lg:ml-8 mt-4 lg:mt-0 order-last lg:order-last">
          <h3 className="text-lg">Order Summary</h3>
          {/* order summary details here */}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
