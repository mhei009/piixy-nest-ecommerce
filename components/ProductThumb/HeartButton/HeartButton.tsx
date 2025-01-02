// HeartButton.tsx
"use client"; // Explicitly mark this as a client component

import { HeartFilledIcon, HeartIcon } from "@sanity/icons";
import { useState } from "react";


interface HeartButtonProps {
  product: any; // Define your product type
}

const HeartButton: React.FC<HeartButtonProps> = ({ product }) => {
  // Track the saved state of the product
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProduct = () => {
    setIsSaved(!isSaved); // Toggle saved state

    // Example: Save to localStorage or backend if required
    // localStorage.setItem(`savedProduct_${product._id}`, JSON.stringify(!isSaved));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleSaveProduct}
        aria-label={isSaved ? "Remove from Saved" : "Save Product"}
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        {isSaved ? (
          <HeartFilledIcon className="w-6 h-6" />
        ) : (
          <HeartIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default HeartButton;
