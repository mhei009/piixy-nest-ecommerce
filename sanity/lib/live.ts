// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import "server-only"
import { defineLive } from "next-sanity";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error('SANITY_API_READ_TOKEN is missing')
}



// functionality for fetching data and handling updates.
// enables real-time synchronization between the Sanity backend and the frontend.
export const { sanityFetch, SanityLive } = defineLive({ 
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,              // ensures the data is not cacched, system fecthes frsh data every request
  },
});
