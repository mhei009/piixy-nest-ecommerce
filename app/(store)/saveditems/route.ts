
import { getSavedItems } from "@/sanity/lib/getSavedItems";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json(); // Get userId from the request body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch saved items for the user from Sanity
    const savedItems = await getSavedItems(userId);

    return NextResponse.json(savedItems);
  } catch (error) {
    console.error("Error fetching saved items:", error);
    return NextResponse.json({ error: "Failed to fetch saved items" }, { status: 500 });
  }
}
