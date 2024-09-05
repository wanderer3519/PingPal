import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@components/ToasterContext";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth Ping Pal",
  description: "Build a next 14 app",
};

export default function RootLayout({ children }) {
  
  // console.log(123);
  // console.log(Provider);
  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-1`}>
        <Provider>
          <ToasterContext/>
            {children}
        </Provider>
      </body>
        
    </html>
  );
}
