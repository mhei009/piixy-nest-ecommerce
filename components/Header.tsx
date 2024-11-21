"use client";

import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, PackageIcon, SearchIcon, TrolleyIcon, UserIcon } from "@sanity/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Header() {
  const { user } = useUser(); 
  const { signOut } = useClerk(); 

  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* Logo */}
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full1.webp"
            height={40}
            width={200}
            alt="PixyNest logo"
            className="mx-auto sm:mx-0 sm:h-10 sm:w-auto md:h-10 md:w-auto lg:h-10 lg:w-auto"
          />
        </Link>
      </div>

      {/* Center nav */}
      <div className="hidden md:flex flex-grow justify-center space-x-6">
        <Link href="/" className="font-bold">New & Featured</Link>
        <Link href="/newfeatured" className="font-bold text-gray-700">Series</Link>
        <Link href="/types" className="font-bold text-gray-700">Accessories</Link>
      </div>

      {/* User nav */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="relative w-6/12 sm:w-auto mt-2 sm:mt-0">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <form action="/search">
            <input
              type="text"
              name="query"
              placeholder="Search"
              className="bg-gray-100 text-gray-600 pl-10 pr-4 py-1 rounded focus:outline-none border w-1/2"
            />
          </form>
        </div>

        <Link href="/favorites" className="flex items-center space-x-2">
          <HeartIcon className="h-6 w-6 text-gray-600" />
        </Link>

        <Link href="/basket" className="flex items-center space-x-2">
          <TrolleyIcon className="h-6 w-6 text-gray-600" />
        </Link>

        <ClerkLoaded>
          {/* when signed in */}
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome back</p>
                    <p className="text-gray-600">{user?.fullName}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* When Signed Out */}
          <SignedOut>
            <SignInButton mode="modal">
              <div className="flex items-center space-x-2 cursor-pointer">
                <UserIcon className="h-6 w-6 text-gray-600" />
              </div>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;
