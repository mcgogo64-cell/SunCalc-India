import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolarBharat Next | Future of Energy",
  description: "Calculate your solar potential instantly with SolarBharat Next. The most advanced solar discovery platform for India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="adsterra-native-banner-head"
          src="//pl28106760.effectivegatecpm.com/f90c4e368f493b06f5c3392c4b6097ed/invoke.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src="//pl28106756.effectivegatecpm.com/c7/0d/98/c70d98110b6d41f15979001faaa1ba38.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
