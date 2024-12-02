import { defineField, defineType } from 'sanity';

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'string',  
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', 
      validation: (Rule) => Rule.max(400),  
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'creator',  
      description: 'description',  
    },
  },
});
