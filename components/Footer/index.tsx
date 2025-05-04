
import Link from "next/link";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

   
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">PixyNest</h3>
            <p className="text-sm text-gray-400">
            Dive into a world of designer toys, blind boxes, and quirky collectibles. PixyNest is your playground for all things cute, cool, and collectible.
            </p>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-white">Series</Link></li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Shipping</Link></li>
              <li><Link href="#" className="hover:text-white">Returns</Link></li>
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Join Our Nest</h4>
            <p className="text-sm text-gray-400 mb-4">
              Get 10% off your first order + the latest drops straight to your inbox.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md text-black"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PixyNest. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#"><FaFacebookSquare  className="hover:text-white" /></Link>
            <Link href="#"><FaInstagramSquare  className="hover:text-white" /></Link>
         
          </div>
        </div>
      </div>
    </footer>
  );
}
