import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { Navbar } from "@/components/Navbar";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Forest Revival - Tree Planting Initiative",
  description:
    "Help restore deforested areas by funding tree planting initiatives. Each donation plants real trees while you play our interactive tree planting game. Watch forests grow, wildlife return, and carbon offset calculations in real-time.",
  keywords: [
    "tree planting",
    "forest restoration",
    "environmental conservation",
    "carbon offset",
    "climate change",
    "wildlife conservation",
    "blockchain fundraising",
    "STX donations",
    "sBTC donations",
    "interactive game",
    "environmental impact",
    "sustainability",
    "reforestation",
    "biodiversity",
    "ecosystem restoration"
  ],
  authors: [{ name: "Forest Revival Initiative" }],
  openGraph: {
    title: "Forest Revival - Tree Planting Initiative",
    description: "Help restore deforested areas by funding tree planting initiatives. Each donation plants real trees while you play our interactive tree planting game.",
    type: "website",
    images: [
      {
        url: "/campaign/header.jpg",
        width: 1200,
        height: 630,
        alt: "Forest Revival Initiative - Tree Planting Campaign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest Revival - Tree Planting Initiative",
    description: "Help restore deforested areas by funding tree planting initiatives. Each donation plants real trees while you play our interactive tree planting game.",
    images: ["/campaign/header.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode="light" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <Providers>
          <>
            <Navbar />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
