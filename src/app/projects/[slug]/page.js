import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import HeroMedia from "./HeroMedia";
import Reveal from "./Reveal";
import { getAllProjectSlugs, getProjectRawBySlug } from "@/lib/projects";
import { mdxComponents } from "./mdx-components";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const raw = getProjectRawBySlug(p?.slug);

  if (!raw) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const fm = raw.frontmatter || {};
  const title = fm.title || raw.slug;
  const description =
    fm.subtitle ||
    `${title} — case study by P3 Graphics showcasing creative direction, execution, and deliverables.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | P3 Graphics`,
      description,
      images: fm.heroImage ? [{ url: fm.heroImage, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | P3 Graphics`,
      description,
      images: fm.heroImage ? [fm.heroImage] : undefined,
    },
  };
}

export default async function ProjectPage({ params }) {
  const p = await params;
  const raw = getProjectRawBySlug(p?.slug);

  if (!raw) notFound();

  const fm = raw.frontmatter || {};

  const { content } = await compileMDX({
    source: raw.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: mdxComponents,
  });

  const hasHeroMedia = fm.heroVideo || fm.heroPoster || fm.heroImage;

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="P3 Graphics"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="font-semibold tracking-tight">
              P3 <span className="text-orange-500">Graphics</span>
            </span>
          </Link>

          <Link
            href="/#contact"
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Start a Project
          </Link>
        </div>
      </header>

      <section className="px-6 pb-10 pt-12 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-gray-400">
              Case Study
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              {fm.title || raw.slug}
            </h1>

            {fm.subtitle ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                {fm.subtitle}
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fm.year ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Year
                </div>
                <div className="mt-2 text-sm text-white">{fm.year}</div>
              </div>
            ) : null}

            {fm.client ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Client
                </div>
                <div className="mt-2 text-sm text-white">{fm.client}</div>
              </div>
            ) : null}

            {Array.isArray(fm.services) && fm.services.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                <div className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Services
                </div>
                <div className="mt-2 text-sm text-white">
                  {fm.services.join(" • ")}
                </div>
              </div>
            ) : null}

            {Array.isArray(fm.deliverables) && fm.deliverables.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2 lg:col-span-4">
                <div className="text-xs uppercase tracking-[0.18em] text-gray-500">
                  Deliverables
                </div>
                <div className="mt-2 text-sm text-white">
                  {fm.deliverables.join(" • ")}
                </div>
              </div>
            ) : null}
          </div>

          {hasHeroMedia ? (
            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
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

      <section className="px-6 pb-24">
        <article className="mx-auto max-w-3xl">
          <Reveal>{content}</Reveal>
        </article>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} P3 Graphics
      </footer>
    </main>
  );
}