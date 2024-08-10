import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import Providers from "@/provider/Provider";
import { StoreProvider } from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChitChat",
  description: "ChitChat - Bring together thoughts and connect everyone.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
