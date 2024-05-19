import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MetamaskProvider } from "@/contexts/metamask-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberID",
  description: "CyberID is a decentralized identity platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.2.7-rc.0/web3.min.js"
        />
      </head>
      <body className={`${inter.className} dark:bg-gray-800`}>
        <MetamaskProvider>
          <Header />
          {children}
          <Footer />
        </MetamaskProvider>
      </body>
    </html>
  );
}
