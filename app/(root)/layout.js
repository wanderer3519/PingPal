import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import TopBar from "@components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Halo chat app",
  description: "A next js 14 chat app",
};

export default function RootLayout({ children }) {
  
  // console.log(123);
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-2`}>
        <Provider>
          <TopBar></TopBar>
          {children}
        </Provider>
      </body>
    </html>
  );
}
