"use client";

import { useRouter } from "next/navigation";
import useBasketStore from "../../../store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import Loader from "@/components/Loader"; 
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";



function BasketPage() {
  // stores state for grouped items
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // state where to manage whether client-side rendering is done
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
const metadata: Metadata = {
  orderNumber: crypto.randomUUID(),
  costumerName: user?.fullName ?? "Unknown",
  costumerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
  clerkUserId: user!.id,
}

const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

if (checkoutUrl) {
  window.location.href = checkoutUrl;
}

    } catch (error) {
      console.error("error creating checkout-session", error)
    } finally {
      setIsLoading(false);
    }
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
                      loading="lazy"
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

        {/* sticky for order summary Div */}
        <div className="w-full lg:w-80 p-6 h-fit border rounded lg:sticky lg:top-4 lg:left-auto lg:ml-8 mt-4 lg:mt-0 order-last lg:order-last">
          <h3 className="text-lg">Order Summary</h3>
         <div className="mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Items:</span>
            <span>
              {groupedItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className="flex justify-between text-1xl font-semibold border-t pt-2">
            <span>Total:</span>
            <span>{useBasketStore.getState().getTotalPrice().toFixed(2)} SEK</span>
          </p>
         </div>

         {isSignedIn ? (
          <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="mt-4 w-full bg-gray-800 text-white rounded p-2"
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
        
         ) : (
          <SignInButton mode="modal">
            <button className="w-full py-2 rounded bg-black text-white mt-2">Sign In to Checkout
            </button>
          </SignInButton>
         )}
        
        </div>  
        {/* order summary space */}
        <div className="h-64 lg:h-0">

        </div>
      </div>
    </div>
  );
}

export default BasketPage;
