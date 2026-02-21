export default function sitemap() {
  const base = "https://p3-graphics-portfolio.vercel.app";

  const routes = [
    "",
    "/projects/branding",
    "/projects/brand-reach-expert",
    // add these only if they exist on your site
    "/work/graphic-design",
    "/work/motion",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}