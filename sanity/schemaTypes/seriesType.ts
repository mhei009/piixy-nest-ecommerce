import {defineField, defineType} from 'sanity'

export const seriesType = defineType({
  name: 'series',  
  title: 'Series',  
  type: 'document',
  fields: [
    defineField({
      name: 'name',  
      type: 'string',
      title: 'Series Name',  
    }),
    defineField({
      name: 'slug',  
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name', 
      },
    }),
    defineField({
      name: 'description',  
      type: 'text',
      title: 'Description',  
    }),
    defineField({
      name: 'creatorName',  
      type: 'string',
      title: 'Creator Name', 
    }),
  ],
  preview: {
    select: {
      title: 'name',  
      subtitle: 'description',  
      creator: 'creatorName',  
    },
    prepare(selection) {
      const {title, subtitle, creator} = selection;
      return {
        title,
        subtitle: creator ? `${subtitle} - by ${creator}` : subtitle,  
      };
    },
  },
});
