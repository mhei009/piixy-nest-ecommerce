import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

// Define the structure of the Sale object returned by the query
interface Sale {
  isActive: boolean;
  couponCode: string;
  validFrom: string;
  // Add any other necessary fields here based on your schema
}

export const getActiveSaleByCouponCode = async (couponCode: CouponCode): Promise<Sale | null> => {
    
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    * [
        _type == "sale" 
        && isActive == true
        && couponCode == $couponCode
    ] | order(validFrom desc) [0]
    `);

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode, 
            },
        });

        // Ensure the response is properly structured and return the correct data
        if (activeSale && activeSale.data) {
            return activeSale.data as Sale;
        } else {
            return null; // No active sale found
        }
        
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null; // Return null in case of an error
    }
};
