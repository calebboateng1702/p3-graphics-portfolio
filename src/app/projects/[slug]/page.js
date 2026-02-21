import HeroMedia from "./HeroMedia";
import Reveal from "./Reveal";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllProjectSlugs, getProjectRawBySlug } from "@/lib/projects";
import { mdxComponents } from "./mdx-components";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = await params; // your Next version: params is Promise
  const raw = getProjectRawBySlug(p?.slug);
  if (!raw) return { title: "Project Not Found | P3 Graphics" };

  const fm = raw.frontmatter || {};
  return {
    title: `${fm.title || raw.slug} | P3 Graphics`,
    description: fm.subtitle || "Case study by P3 Graphics",
  };
}

export default async function ProjectPage({ params }) {
  const p = await params;
  const raw = getProjectRawBySlug(p?.slug);
  if (!raw) notFound();

  const fm = raw.frontmatter || {};

  const { content } = await compileMDX({
    source: raw.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: mdxComponents,
  });

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* Glass header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="P3 Graphics" width={28} height={28} style={{ objectFit: "contain" }} />
            <span className="font-semibold tracking-tight">
              P3 <span className="text-orange-500">Graphics</span>
            </span>
          </a>
          <a
            href="/#contact"
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            Start a Project
          </a>
        </div>
      </header>

      {/* Hero (from frontmatter) */}
      <section className="px-6 pt-10 pb-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            {fm.year ? `${fm.year} • ` : ""}
            {Array.isArray(fm.services) ? fm.services.join(" • ") : ""}
          </p>

          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
            {fm.title || raw.slug}
          </h1>

          {fm.subtitle ? <p className="mt-4 text-gray-300 max-w-2xl">{fm.subtitle}</p> : null}

          {fm.heroImage ? (
  <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
    <HeroMedia
      videoSrc={fm.heroVideo}
      posterSrc={fm.heroPoster}
      imageSrc={fm.heroImage}
      alt={`${fm.title || raw.slug} hero`}
    />
  </div>
) : null}
        </div>
      </section>

      {/* MDX body */}
      <section className="px-6 pb-20">
        <article className="mx-auto max-w-3xl">
  <Reveal>{content}</Reveal>
</article>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} P3 Graphics Studio
      </footer>
    </main>
  );
}
