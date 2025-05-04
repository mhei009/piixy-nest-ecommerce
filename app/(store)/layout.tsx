import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Container from "../../components/ui/Container";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";


export const metadata: Metadata = {
  title: "PixyNest",
  description: "Nest full of fun and exclusive Pop Mart figures and surprise boxes.",
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
                <Container>   
                  <Header />
       
              {children}
             
            </Container>  
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
