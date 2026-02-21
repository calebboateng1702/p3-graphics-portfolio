export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://p3-graphics-portfolio.vercel.app/sitemap.xml",
  };
}