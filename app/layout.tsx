import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import { SanityLive } from "@/sanity/lib/live";



export const metadata: Metadata = {
  title: "PixyNest",
  description: "Nest full of fun and exclusive Pop Mart figures and surprise boxes. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
  
      <body>
        <main>
          <Header/>
          {children}
          </main>   
          <SanityLive/>
      </body>
     
    </html>
     </ClerkProvider>
  );
}
