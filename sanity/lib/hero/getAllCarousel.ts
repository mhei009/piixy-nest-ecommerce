import { Carousel } from "@/sanity.types";
import { sanityFetch } from "../live";


export const getAllCarouselSlides = async (): Promise<Carousel[]> => {
  const CAROUSEL_QUERY = `
    *[_type == "carousel"] | order(_createdAt asc) {
      title,
      description,
      "imageUrl": image.asset->url
    }
  `;

  try {
    const slides = await sanityFetch({ query: CAROUSEL_QUERY });
    return slides.data || [];
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
};
