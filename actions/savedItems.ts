// pages/api/savedItems.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for saved items
let savedItemsDb: any[] = [];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (req.method === 'GET') {
    // Get saved items for a specific user
    const userSavedItems = savedItemsDb.filter(item => item.userId === userId);
    return res.status(200).json(userSavedItems);
  }

  if (req.method === 'POST') {
    // Add an item to the saved list for a specific user
    const { productId } = req.body;
    const newItem = { userId, _id: productId, name: `Product ${productId}`, image: `image_url_${productId}`, price: 20 };
    savedItemsDb.push(newItem); // Add the item to the mock DB
    return res.status(200).json(savedItemsDb);
  }

  if (req.method === 'DELETE') {
    // Remove an item from the saved list
    const { productId } = req.body;
    savedItemsDb = savedItemsDb.filter(item => item._id !== productId); // Remove item by productId
    return res.status(200).json(savedItemsDb);
  }

  return res.status(405).end(); // Method Not Allowed
};

export default handler;
