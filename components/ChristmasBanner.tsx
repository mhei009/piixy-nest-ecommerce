import { COUPON_CODES } from "@/sanity/lib/sale/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sale/getActiveSaleByCouponCode";

async function ChristmasBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.XMAS24);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">Christmas Sale Banner
    <div className=""></div>
    </div>
  )

}

export default ChristmasBanner;



