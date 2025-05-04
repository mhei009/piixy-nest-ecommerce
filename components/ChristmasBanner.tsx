import { COUPON_CODES } from "../sanity/lib/sale/couponCodes";
import { getActiveSaleByCouponCode } from "../sanity/lib/sale/getActiveSaleByCouponCode";


async function ChristmasBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.XMAS24);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white  px-6 py-10 mx-4 mt-3 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{sale.title}</h2>
          
          <p className="text-lg">{sale.description} <span className="font-bold">{COUPON_CODES.XMAS24}</span></p>

          <div className="flex">
            <div className="bg-white text-black py-2 px-6 mt-4 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold text-base sm:text-lg">Use Code:{" "}
              <span className="font-bold text-base sm:text-lg">{sale.couponCode}</span></span>
              <span className="ml-2 text-base sm:text-lg">for {sale.discount}% OFF</span>
              

            </div>
          </div>
        </div>
        </div>

        </div>

)}
export default ChristmasBanner;



