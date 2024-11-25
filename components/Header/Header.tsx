"use client";

import { useState, useEffect } from "react"; 
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, SearchIcon, TrolleyIcon, UserIcon, MenuIcon } from "@sanity/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { user } = useUser();
const createClerkPasskey = async () => {
  try {
    const response = await user?.createPasskey();  
    console.log(response);
    
  } catch (err) {
    console.error("ERROR: ", JSON.stringify(err, null, 2));
    
  }
} 

const { openUserProfile } = useClerk();

  const { signOut } = useClerk();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);


  return (
    <header className="flex justify-between items-center px-4 py-2">
      {/* left side logo */}
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full1.webp"
            height={40}
            width={120}
            alt="PixyNest logo"
            className="mx-auto sm:mx-0 sm:h-auto sm:w-3 md:h-10 md:w-auto lg:h-10 lg:w-auto"
          />
        </Link>
      </div>

      {/* center nav */}
      <div className="hidden md:flex flex-grow justify-center space-x-6">
        <Link href="/" className="font-bold" aria-label="New & Featured products">New & Featured</Link>
        <Link href="/series" aria-label="Browse Product Series" className="font-bold text-gray-700">Series</Link>
        <Link href="/types" aria-label="Browse Accessories" className="font-bold text-gray-700">Accessories</Link>
      </div>

      {/* right nav */}
      <div className="flex items-center space-x-3">
        {/* search bar toggle */}
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

        {/* faves */}
        <Link href="/favorites" className="flex items-center space-x-2" aria-label="View Favorites">
          <HeartIcon className="h-6 w-6 text-gray-600" />
        </Link>

        {/* basket */}
        <Link href="/basket" className="flex items-center space-x-2" aria-label="View Shopping basket">
          <TrolleyIcon className="h-6 w-6 text-gray-600" />
        </Link>

        {!isMobile && (
        <ClerkLoaded>
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserButton />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              {user?.passkeys.length === 0 && (
                  <DropdownMenuItem onClick={createClerkPasskey} 
                  className="text-red-600">
                    Set up Passkey
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <button onClick={(event) => openUserProfile()}>Profile Settings</button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem> 
        
                <DropdownMenuItem
                  onClick={() => signOut()}
                 className="underline text-gray-700">
                  Sign Out
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
      )}

        {/* menu icon for small screen */}
        <div className="md:hidden flex items-center space-x-4">
          <MenuIcon
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          />
        </div>
      </div>

      {/* mobile menu  in small screen*/}
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

         
          {/* mobile menu clerk*/}
          <ClerkLoaded>
            <SignedIn>
              <div className="space-y-4 px-4 py-2  border-gray-200 mt-2">
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="text-xs text-gray-600">{user?.firstName}</div>
                </div>
                <div>
                {user?.passkeys.length === 0  && (
                  <button
                    onClick={createClerkPasskey}
                    className="block w-full text-left text-red-600  mt-2"
                    aria-label="Set up Passkey"
                  >
                    Set up Passkey
                  </button>
                )}
                   <button onClick={(event) => openUserProfile()}>Profile Settings</button>
                <Link href="/orders" className="block text-gray-700" aria-label="My Orders">My Orders</Link>
                <button
                    onClick={() => signOut()}
                    className="block w-full text-left text-gray-700 underline "
                    aria-label="Sign Out"
                  >
                    Sign Out
                  </button>
                </div>
                
                
              </div>

              
            </SignedIn>

             {/* mobile menu center nav */}
          <div className="px-4 py-2 space-y-4 mt-5">
            <Link href="/" className="block text-gray-700" aria-label="New & Featured products">New & Featured</Link>
            <Link href="/series" className="block text-gray-700" aria-label="Browse Product Series">Series</Link>
            <Link href="/types" className="block text-gray-700" aria-label="Browse Accessories">Accessories</Link>
          </div>


            <SignedOut>
              <SignInButton mode="modal">
                <div className="block text-gray-700" aria-label="Sign In">Sign In</div>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      )}

      
     
    </header>
  );
}

export default Header;
