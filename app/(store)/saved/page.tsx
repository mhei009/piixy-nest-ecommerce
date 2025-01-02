"use client";

import { useState, useEffect } from "react";
import { HeartIcon } from '@sanity/icons'; // Heart icon for saving
import { formatCurrency } from "@/lib/formatCurrency"; // Assuming you have this function
import { imageUrl } from "@/lib/imageUrl"; // Assuming you have this function

async function SavedPage() {
  const [savedItems, setSavedItems] = useState<any[]>([]);  // Make sure it's an array
  const [isLoading, setIsLoading] = useState<boolean>(false); // To handle loading states
  const [error, setError] = useState<string | null>(null); // To handle error states

  // Assume userId is passed as a prop or fetched from authentication
  const userId = "user-id"; // Replace with actual userId

  // Fetch saved items
  useEffect(() => {
    const fetchSavedItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/savedItems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved items");
        }

        const items = await response.json();

        // Ensure that the returned result is an array
        if (Array.isArray(items)) {
          setSavedItems(items); // Set the fetched saved items
        } else {
          throw new Error("The returned items are not an array.");
        }
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching saved items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedItems();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="saved-items">
      <h1>My Saved Items</h1>
      {savedItems.length === 0 ? (
        <p>No saved items</p>
      ) : (
        <ul>
          {savedItems.map((item) => (
            <li key={item._id}>
              <div>
                <img src={imageUrl(item.productImage).url()} alt={item.productName} />
                <h2>{item.productName}</h2>
                <p>{formatCurrency(item.productPrice)}</p>
               
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedPage;
