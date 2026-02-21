export default function sitemap() {
  const base = "https://p3-graphics-portfolio.vercel.app";
  const routes = [
    "",
    "/projects/branding",
    "/projects/brand-reach-expert",
    "/work/graphic-design",
    "/work/motion",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}