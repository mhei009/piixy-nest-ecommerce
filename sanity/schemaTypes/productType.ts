import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { seriesType } from './seriesType';  // Make sure to import the seriesType

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
    defineField({
      name: 'series',  // This is the new field to reference a Series
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],  // Reference the 'series' document
      validation: (Rule) => Rule.required(),  // You can make it optional by removing .required() if needed
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      series: 'series.name',  // This selects the series name to display in the preview
    },
    prepare(select) {
      const { title, price, media, series } = select;
      return {
        title,
        subtitle: series ? `${title} - Series: ${series}` : `${price} SEK`,
        media,
      };
    },
  },
});
