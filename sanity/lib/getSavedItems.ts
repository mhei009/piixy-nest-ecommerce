
import { backendClient } from "@/sanity/lib/backendClient";

export async function getSavedItems(userId: string, productId: string, productName: string, productPrice: number, productImage: string) {
  const mutation = {
    _type: "savedItem",
    clerkUserId: userId,
    productId,
    productName,
    productPrice,
    productImage,
  };

  try {
    const savedItem = await backendClient.create(mutation); // save to Sanity or other database
    return savedItem;
  } catch (error) {
    throw new Error("Failed to save item");
  }
}
