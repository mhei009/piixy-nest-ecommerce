import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

interface Sale {
  isActive: boolean;
  couponCode: string;
  validFrom: string;
  title: string;
  description: string;
  discount: number;
 
  
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

        // make sure the response is properly structured and return the correct data
        if (activeSale && activeSale.data) {
            return activeSale.data as Sale;
        } else {
            return null; 
        }
        
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null; 
    }
};
