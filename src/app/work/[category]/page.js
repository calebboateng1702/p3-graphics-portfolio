import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { graphicItems } from "@/lib/gallery-graphic";
import { motionItems } from "@/lib/gallery-motion";

export default async function WorkCategoryPage({ params }) {
  // Next.js can provide params as a Promise in some versions
  const { category } = await params;

  if (category === "graphic-design") {
    return (
      <Gallery
        title="Graphic Design"
        subtitle="Curated selections — logos, layouts, posters, and brand visuals."
        items={graphicItems}
      />
    );
  }

  if (category === "motion") {
    return (
      <Gallery
        title="Motion"
        subtitle="Premium motion previews with controlled autoplay and full-screen playback."
        items={motionItems}
      />
    );
  }

  return notFound();
}