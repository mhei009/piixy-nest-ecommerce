export default {
    name: "carousel",
    title: "Carousel",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
      },
    ],
  };
  