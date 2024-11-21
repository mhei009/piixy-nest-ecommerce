"use client";

import { useState } from "react"; 
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, PackageIcon, SearchIcon, TrolleyIcon, UserIcon, MenuIcon } from "@sanity/icons";
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* left logo */}
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

      {/* center nav (hidden on small screens) */}
      <div className="hidden md:flex flex-grow justify-center space-x-6">
        <Link href="/" className="font-bold" aria-label="New & Featured products">New & Featured</Link>
        <Link href="/series" aria-label="Browse Product Series" className="font-bold text-gray-700">Series</Link>
        <Link href="/types" aria-label="Browse Accessories" className="font-bold text-gray-700">Accessories</Link>
      </div>

      <div className="flex items-center space-x-3">
 
        <div className="relative flex items-center justify-center">
          {showSearchBar && (
            <div className="absolute top-0 right-8">
              <form action="/search">
                <input
                  type="text"
                  name="query"
                  placeholder="Search"
                  className="bg-gray-100 text-gray-600 pl-3 pr-4 py-1 rounded focus:outline-none border w-24"
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

        {/* menu icon (visible only on small screens) */}
        <div className="md:hidden flex items-center space-x-4">
          <MenuIcon
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          />
        </div>

        {/* large screen user-profile */}
        <ClerkLoaded>
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer" aria-label="User account menu">
                  <UserButton />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
          
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" aria-label="My Orders">
                    My Orders
                  </Link>
                </DropdownMenuItem>

                
                <DropdownMenuItem asChild>
                  <Link href="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" aria-label="Profile Settings">
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

      {/* mobile menu (shown when showMobileMenu is true) */}
      {showMobileMenu && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50 md:hidden shadow-md">
          <div className="flex justify-between items-center px-4 py-2">
           
            <button
              onClick={() => setShowMobileMenu(false)}
              className="h-6 w-6 text-gray-600 ml-auto"
              aria-label="Close mobile menu"
            >
              X
            </button>
          </div>

         
          <div className="px-4 py-2 space-y-4">
            <ClerkLoaded>
              <SignedIn>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <UserButton />
                    <div className="text-xs text-gray-600">{user?.fullName}</div>
                  </div>

                  <Link href="/orders" className="block text-gray-700" aria-label="My Orders">My Orders</Link>
                  <Link href="/user-profile" className="block text-gray-700" aria-label="Profile Settings">Profile Settings</Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left text-gray-700"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <div className="block text-gray-700" aria-label="Sign In">Sign In</div>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>

          {/*  center nav links inside mobile menu */}
          <div className="px-4 py-2 space-y-4">
            <Link href="/" className="block text-gray-700" aria-label="New & Featured products">New & Featured</Link>
            <Link href="/series" className="block text-gray-700" aria-label="Browse Product Series">Series</Link>
            <Link href="/types" className="block text-gray-700" aria-label="Browse Accessories">Accessories</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
