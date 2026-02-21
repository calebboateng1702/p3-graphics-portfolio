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
  // default to the first path (helps error messages)
  return CANDIDATE_DIRS[0];
}

export function getAllProjectSlugs() {
  const dir = getProjectsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectRawBySlug(slug) {
  const dir = getProjectsDir();
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return { slug, frontmatter: data, content };
}
export function getAllProjects() {
  const slugs = getAllProjectSlugs();

  return slugs
    .map((slug) => {
      const raw = getProjectRawBySlug(slug);
      if (!raw) return null;

      const fm = raw.frontmatter || {};

      return {
        slug,
        title: fm.title || slug,
        subtitle: fm.subtitle || "",
        year: fm.year || "",
        services: Array.isArray(fm.services) ? fm.services : [],
        heroImage: fm.heroImage || "",
        // Homepage hover teaser (you said you want different teasers):
        teaserVideo: `/videos/${slug}.mp4`,
      };
    })
    .filter(Boolean);
}

