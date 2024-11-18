"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Form from "next/form";



function Header() {
    const { user } = useUser();
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
        {/*top row */}
        <div>
            <Link href="/"><Image
              src="/assets/icons/logo-full1.webp"
              height={30}
              width={180}
              alt="logo"
              className="mx-auto
              sm:mx-0"/>
            </Link>

            <Form action="/search" className="w-full sm:w-auto mt-2 sm:mt-0">
  <input type="text" name="query" placeholder="search" className="bg-gray-100 text-gray-600 px-4 py-1 rounded focus:outline-none  border " />
</Form>

<div>
    <Link>
    </Link>
</div>

        </div>
     </header>
    
  )
}

export default Header