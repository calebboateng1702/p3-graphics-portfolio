import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://p3-graphics-portfolio.vercel.app/"),
  title: "P3 Graphics | Luxury Creative Studio",
  description:
    "Caleb Boateng is a branding and motion designer and founder of P3 Graphics, crafting premium brand identities and digital systems.",

  openGraph: {
    title: "P3 Graphics | Luxury Creative Studio",
    description:
      "Caleb Boateng is a branding and motion designer and founder of P3 Graphics, crafting premium brand identities and digital systems.",
    url: "/",
    siteName: "P3 Graphics",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "P3 Graphics",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "P3 Graphics | Luxury Creative Studio",
    description:
      "Premium brand identities, motion systems, and digital design—built to perform.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}