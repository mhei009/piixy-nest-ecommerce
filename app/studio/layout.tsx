export const metadata = {
    title: "PixyNest",
    description: "Nest full of fun and exclusive Pop Mart figures and surprise boxes. ",
  };
  
  export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
   
    );
  }
  