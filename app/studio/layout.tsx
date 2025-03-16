import "../globals.css";

export const metadata = {
    title: "PixyNest",
    description: "Nest full of fun and exclusive Pop Mart figures and surprise boxes. ",
  };
  
  export default function RootLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {


    return (
      <html lang="elayout.tsn">
        <body>
          {children}
        </body>
      </html>
   
    );
  }
  