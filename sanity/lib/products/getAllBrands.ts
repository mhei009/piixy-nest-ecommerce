
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBrand = async () => {
  const ALL_BRAND_QUERY = defineQuery(`
    *[_type == "brand"] | order(name asc)
  `);

  try {
    const brands = await sanityFetch({
      query: ALL_BRAND_QUERY,
    });

    // retun  list of brands or an empty array if none found
    return brands.data || [];
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return [];
  }
};
