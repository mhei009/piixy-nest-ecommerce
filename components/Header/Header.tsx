"use client";

import { useState, useEffect } from "react";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image"; 
import { HeartIcon, SearchIcon, TrolleyIcon, UserIcon, MenuIcon } from "@sanity/icons";


import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useBasketStore from "../../store/store";

function Header() {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("ERROR: ", JSON.stringify(err, null, 2));
    }
  };

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <header className="flex justify-between items-center px-7 py-2">
      
      <div className="logo__container">
        <Link href="/">
    
          <Image
            src="/assets/icons/logo-full1.webp"
            alt="PixyNest logo"
            width={180}   
            height={60}   
          />
        </Link>
      </div>


      <nav className="hidden md:flex flex-grow justify-center space-x-6">
        {/* <Link href="/" className="font-bold" aria-label="New & Featured products">
          New & Featured
        </Link> */}
        {/* <Link href="/series" className="font-bold text-gray-700" aria-label="Browse Series">
          Series
        </Link> */}
        {/* <Link href="/types" className="font-bold text-gray-700" aria-label="Browse Accessories">
          Accessories
        </Link> */}
      </nav>

   
      <div className="flex items-center space-x-3">
       
        <div className="relative">
          {showSearchBar && (
            <form action="/search" className="absolute top-0 right-8">
              <input
                type="text"
                name="query"
                placeholder="Search"
                className="bg-gray-100 text-gray-600 pl-3 pr-4 py-1 rounded focus:outline-none border w-24"
                aria-label="Search Products"
              />
            </form>
          )}
          <SearchIcon
            className="h-8 w-8 text-gray-600 cursor-pointer"
            onClick={() => setShowSearchBar(!showSearchBar)}
            aria-label="Toggle search bar"
          />
        </div>

       
        <Link href="/favorites" aria-label="View Favorites">
          <HeartIcon className="h-8 w-8 text-gray-600" />
        </Link>

       
        <div className="relative">
          <Link href="/basket" aria-label="View Shopping Cart">
            <TrolleyIcon className="h-8 w-8 text-gray-600" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

       
        {!isMobile && (
          <ClerkLoaded>
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserButton />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user?.passkeys.length === 0 && (
                    <DropdownMenuItem onClick={createClerkPasskey} className="text-red-600">
                      Set up Passkey
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => openUserProfile()}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-gray-700 underline">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <UserIcon className="h-8 w-8 text-gray-600 cursor-pointer" aria-label="Sign In" />
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        )}

       
        <MenuIcon
          className="h-6 w-6 text-gray-600 md:hidden cursor-pointer"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        />
      </div>


      {showMobileMenu && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50 shadow-md">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close mobile menu"
              className="text-gray-600 text-lg"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" onClick={() => setShowMobileMenu(false)}>
              New & Featured
            </Link>
            <Link href="/series" onClick={() => setShowMobileMenu(false)}>
              Series
            </Link>
            <Link href="/types" onClick={() => setShowMobileMenu(false)}>
              Accessories
            </Link>
          </nav>
          <ClerkLoaded>
            <SignedIn>
              <div className="flex flex-col space-y-4 p-4">
                {user?.passkeys.length === 0 && (
                  <button onClick={createClerkPasskey} className="text-red-600">
                    Set up Passkey
                  </button>
                )}
                <button onClick={() => openUserProfile()}>Profile Settings</button>
                <Link href="/orders">My Orders</Link>
                <button onClick={() => signOut()} className="text-gray-700 underline">
                  Sign Out
                </button>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <div className="text-gray-600">Sign In</div>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      )}
    </header>
  );
}

export default Header;
