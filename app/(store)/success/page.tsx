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
      <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg max-w-3xl w-full mx-4">
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

          <div className="mt-10 space-y-4">
            {orderNumber && (
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-gray-700 font-semibold">Order Number:</span>
                <span className="text-green-600 text-left break-all ">
                  {orderNumber}
                </span>
              </div>
            )}
            {sessionId && (
              <div className="grid grid-cols-2 gap-4 items-center">
                <span className="text-gray-700 font-semibold">
                  Transaction ID:
                </span>
                <span className="text-gray-800 font-mono text-left break-all text-sm">
                  {sessionId}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6 mt-10">
            <p className="text-gray-600">
              A confirmation email has been sent to your email address.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
