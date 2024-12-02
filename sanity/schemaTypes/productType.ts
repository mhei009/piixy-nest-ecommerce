// schemas/productType.js
import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
// Import the brandType schema
import { brandType } from './brandType';  // Adjust the path based on your folder structure

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'moreImages',
      title: 'More Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    // Add the brand field as a reference to the 'brand' document type
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      brandName: 'brand.name',  // Reference to the brand name
    },
    prepare(select) {
      return {
        title: select.brandName ? `${select.brandName} - ${select.title}` : select.title,
        subtitle: `${select.price} SEK`,
        media: select.media,
      };
    },
  },
});
