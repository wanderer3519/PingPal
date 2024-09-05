/**
 * The base layout for all pages after login
 */

import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import TopBar from "@components/TopBar";
import "@fortawesome/fontawesome-free/css/all.min.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ping Pal app",
  description: "A next js 14 chat app",
};

export default function RootLayout({ children }) {
  // Skeleton layout for all pages
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
