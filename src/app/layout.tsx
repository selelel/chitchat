import type { Metadata } from "next";
import "../styles/globals.css"
import Providers from "../providers";
import { inter } from "@/layouts/fonts";


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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
