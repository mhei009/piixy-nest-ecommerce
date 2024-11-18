"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";
import { HeartIcon, SearchIcon, TrolleyIcon, UserIcon } from "@sanity/icons";

function Header() {
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* left Logo */}
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full1.webp"
            height={30}
            width={180}
            alt="logo"
            className="mx-auto sm:mx-0"
          />
        </Link>
      </div>

      {/* navigation */}
      <div className="hidden md:flex flex-grow justify-center space-x-6">
        <Link href="/" className="font-bold">New & Featured</Link>
        <Link href="/newfeatured" className="font-bold text-gray-700">Series</Link>
        <Link href="/types" className="font-bold text-gray-700">Accessories</Link>
      </div>

      {/* right nav*/}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Form action="/search">
            <input
              type="text"
              name="query"
              placeholder="Search"
              className="bg-gray-100 text-gray-600 pl-10 pr-4 py-1 rounded focus:outline-none border"
            />
          </Form>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/profile" className="flex items-center space-x-2">
            <UserIcon className="h-6 w-6 text-gray-600" />
     
          </Link>

          <Link href="/favorites" className="flex items-center space-x-2">
            <HeartIcon className="h-6 w-6 text-gray-600" />
            
          </Link>

          <Link href="/basket" className="flex items-center space-x-2">
            <TrolleyIcon className="h-6 w-6 text-gray-600" />
        
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

