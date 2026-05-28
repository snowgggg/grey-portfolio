import type { Metadata } from "next";
import localFont from "next/font/local";
import GlobalExperience from "@/components/GlobalExperience";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const aeonik = localFont({
  src: [
    {
      path: "../font/Aeonik-Air.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/Aeonik-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../font/Aeonik-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../font/Aeonik-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../font/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grey — Web3 Product Designer",
  description:
    "A cinematic portfolio for Grey, a Web3 product designer creating premium interfaces for wallets, DeFi, identity, and onchain systems.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aeonik.variable} ${clashDisplay.variable}`}>
        {children}
        <GlobalExperience />
        <PageTransition />
      </body>
    </html>
  );
}
