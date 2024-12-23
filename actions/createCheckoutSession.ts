"use server"

import { BasketItem } from "@/store/store";



export type Metadata = {
    orderNumber: string;
    costumerName: string;
    costumerEmail: string;
    clerkUserId: string;
  };

  export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number
  }

  export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: Metadata
  ) {
    try {
        const itemsWithoutPrice = items.filter((item) => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items are missing a price");
        }
        
    } catch (error) {
        console.error  ("error creating checkout-session", error);
        throw error
    }
  }
    