import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resyntel — Resource Intelligence for Hospitality | An EM300.co Company",
  description: "Resyntel helps hotels measure resource consumption, detect inefficiencies and identify actionable savings across energy, water, carbon and assets.",
  keywords: [
    "Resyntel",
    "Resource Intelligence for Hospitality",
    "Hotel energy efficiency Morocco",
    "Zephyr Marrakech",
    "MAD utility savings",
    "ONEE RADEEMA benchmarking",
    "Hospitality carbon footprint",
    "EM300"
  ],
  authors: [{ name: "Resyntel · An EM300.co Company", url: "https://resyntel.com" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Resyntel — Resource Intelligence for Hospitality",
    description: "Resyntel helps hotels measure resource consumption, detect inefficiencies and identify actionable savings across energy, water, carbon and assets.",
    url: "https://resyntel.com",
    siteName: "Resyntel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resyntel — Resource Intelligence for Hospitality",
    description: "Measure resource consumption. Detect inefficiencies. Quantify savings. Act. An EM300.co Company.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F7F8FA] text-[#0B1F33]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
