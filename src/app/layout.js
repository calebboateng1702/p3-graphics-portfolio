import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://p3-graphics-portfolio.vercel.app"),
  title: {
    default: "P3 Graphics | Luxury Creative Studio",
    template: "%s | P3 Graphics",
  },
  description:
    "P3 Graphics is a luxury-minimal creative studio crafting premium brand identities, motion systems, and digital experiences for ambitious brands.",
  applicationName: "P3 Graphics",
  keywords: [
    "P3 Graphics",
    "Caleb Boateng",
    "Graphic Designer Ghana",
    "Brand Identity Designer",
    "Motion Designer",
    "Web Designer",
    "Creative Studio",
    "Communication Design",
    "KNUST Designer",
  ],
  authors: [{ name: "Caleb Boateng" }],
  creator: "Caleb Boateng",
  publisher: "P3 Graphics",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "P3 Graphics | Luxury Creative Studio",
    description:
      "Premium brand identities, motion systems, and digital experiences crafted by Caleb Boateng through P3 Graphics.",
    url: "/",
    siteName: "P3 Graphics",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "P3 Graphics — Luxury Creative Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P3 Graphics | Luxury Creative Studio",
    description:
      "Premium brand identities, motion systems, and digital design built with clarity, structure, and visual quality.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}