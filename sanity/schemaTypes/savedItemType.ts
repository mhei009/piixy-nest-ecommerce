import { HeartIcon } from "@sanity/icons";

// schemas/savedItem.js
export default {
  name: 'savedItem',
  title: 'Saved Item',
  type: 'document',
  icon: HeartIcon,
  fields: [
    {
      name: 'productId',
      title: 'Product ID',
      type: 'string',
    },
    {
      name: 'productName',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'productPrice',
      title: 'Product Price',
      type: 'number',
    },
    {
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      initialValue: 1,
    },
  ],
};
