
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/Header/Header";


export const metadata: Metadata = {
    title: "PixyNest",
    description: "Nest full of fun and exclusive Pop Mart figures and surprise boxes. ",
  };
  
  export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ClerkProvider dynamic>
      <html lang="en">
    
        <body>
 <main>
     <Header />
            {children}
       
</main>
        </body>
       
      </html>
      </ClerkProvider>
     
   
    );
  }
  