import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CANDIDATE_DIRS = [
  path.join(process.cwd(), "src", "content", "projects"),
  path.join(process.cwd(), "content", "projects"),
];

function getProjectsDir() {
  for (const dir of CANDIDATE_DIRS) {
    if (fs.existsSync(dir)) return dir;
  }
  return CANDIDATE_DIRS[0];
}

function publicFileExists(relativePath) {
  if (!relativePath) return false;
  const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const fullPath = path.join(process.cwd(), "public", cleanPath);
  return fs.existsSync(fullPath);
}

export function getAllProjectSlugs() {
  const dir = getProjectsDir();
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectRawBySlug(slug) {
  const dir = getProjectsDir();
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    frontmatter: data || {},
    content,
  };
}

function mapProjectSummary(raw) {
  if (!raw) return null;

  const slug = raw.slug;
  const fm = raw.frontmatter || {};

  const explicitTeaser = fm.teaserVideo || "";
  const fallbackTeaser = `/videos/${slug}.mp4`;

  const teaserVideo = explicitTeaser
    ? explicitTeaser
    : publicFileExists(fallbackTeaser)
    ? fallbackTeaser
    : "";

  return {
    slug,
    title: fm.title || slug,
    subtitle: fm.subtitle || "",
    year: fm.year || "",
    client: fm.client || "",
    featured: Boolean(fm.featured),
    featuredOrder: typeof fm.featuredOrder === "number" ? fm.featuredOrder : 999,
    services: Array.isArray(fm.services) ? fm.services : [],
    deliverables: Array.isArray(fm.deliverables) ? fm.deliverables : [],
    heroImage: fm.heroImage || "",
    heroVideo: fm.heroVideo || "",
    heroPoster: fm.heroPoster || "",
    teaserVideo,
  };
}

function sortProjects(projects) {
  return projects.sort((a, b) => {
    if (a.featuredOrder !== b.featuredOrder) {
      return a.featuredOrder - b.featuredOrder;
    }

    if (a.year && b.year && a.year !== b.year) {
      return String(b.year).localeCompare(String(a.year));
    }

    return a.title.localeCompare(b.title);
  });
}

export function getAllProjects() {
  const slugs = getAllProjectSlugs();

  const projects = slugs
    .map((slug) => getProjectRawBySlug(slug))
    .map((raw) => mapProjectSummary(raw))
    .filter(Boolean);

  return sortProjects(projects);
}

export function getFeaturedProjects(limit) {
  const featured = getAllProjects().filter((project) => project.featured);

  if (typeof limit === "number") {
    return featured.slice(0, limit);
  }

  return featured;
}