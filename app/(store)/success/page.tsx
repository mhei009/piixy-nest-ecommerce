"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import useBasketStore from "@/store/store";
import { Button } from "@/components/ui/button";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [clearBasket, orderNumber]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-xl w-full mx-4">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Thank you for your order!
          </h1>
          <p className="text-gray-600">
            Your order has been successfully placed and will be processed soon.
          </p>

          <div className="space-y-2 mt-10">
            {orderNumber && (
              <p className="text-gray-600 flex items-center justify-center space-x-5 mb-5">
                <span className="font-semibold">Order number:</span> 
                <span className="text-green-600">{orderNumber}</span>
              </p>
            )}
            {sessionId && (
              <p className="text-gray-600 flex items-center justify-center space-x-6">
                <span className="font-semibold flex">Transaction ID:</span>
                <span className="font-mono text-sm truncate flex" title={sessionId}>
                  {sessionId}
                </span>
              </p>
            )}
          </div>
          
           <div className="space-y-4 mt-10">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>

       
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
