import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live'; // Adjust the path as needed

export const getProductsBySeriesName = async (seriesName: string) => {
  const PRODUCTS_BY_SERIES_QUERY = defineQuery(`
    *[
      _type == "product" &&
      references(*[_type == "series" && name == $seriesName]._id)
    ] {
      _id,
      name,
      price,
      stock,
      description,
      image,
      series-> {
        name
      }
    }
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_SERIES_QUERY,
      params: { seriesName },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products for series:", error);
    return [];
  }
};
