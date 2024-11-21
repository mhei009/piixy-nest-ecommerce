"use client";

import { useState } from "react"; 
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, PackageIcon, SearchIcon, TrolleyIcon, UserIcon } from "@sanity/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* logo left side */}
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

      {/* center nav */}
      <div className="hidden md:flex flex-grow justify-center space-x-6">
        <Link href="/" className="font-bold" aria-label="New & Featured products">New & Featured</Link>
        <Link href="/series" aria-label="Browse Product Series" className="font-bold text-gray-700">Series</Link>
        <Link href="/types" aria-label="Browse Accessories" className="font-bold text-gray-700">Accessories</Link>
      </div>

      {/* right side nav */}
      <div className="flex items-center space-x-3">
        {/* search Bar */}
        <div className="relative">
          {showSearchBar && (
            <div className="absolute top-0 right-8 bg-gray-200 border rounded-lg shadow p-2">
              <form action="/search">
                <input
                  type="text"
                  name="query"
                  placeholder="Search"
                  className="bg-gray-100 text-gray-600 pl-10 pr-4 py-1 rounded focus:outline-none border w-64"
                  aria-label="Search Products"
                />
              </form>
            </div>
          )}

          <SearchIcon
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setShowSearchBar(!showSearchBar)} 
            aria-label="Toggle search bar"
          />
        </div>

        
        <Link href="/favorites" className="flex items-center space-x-2" aria-label="View Favorites">
          <HeartIcon className="h-6 w-6 text-gray-600" />
        </Link>

        <Link href="/basket" className="flex items-center space-x-2" aria-label="View Shopping basket">
          <TrolleyIcon className="h-6 w-6 text-gray-600" />
        </Link>

        <ClerkLoaded>
          {/* when Signed In */}
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer" aria-label="User account menu">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome back</p>
                    <p className="text-gray-600">{user?.fullName}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" aria-label="View my orders">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" aria-label="Edit or View profile settings">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" aria-label="Logout"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

    
          <SignedOut>
            <SignInButton mode="modal">
              <div className="flex items-center space-x-2 cursor-pointer" aria-label="Sign in to your account">
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
