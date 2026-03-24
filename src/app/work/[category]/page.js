import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { graphicItems } from "@/lib/gallery-graphic";
import { motionItems } from "@/lib/gallery-motion";

export async function generateMetadata({ params }) {
  const { category } = await params;

  if (category === "graphic-design") {
    return {
      title: "Graphic Design | P3 Graphics",
      description:
        "Curated graphic design work from P3 Graphics, including logos, posters, layouts, and brand visuals.",
    };
  }

  if (category === "motion") {
    return {
      title: "Motion | P3 Graphics",
      description:
        "Motion design work from P3 Graphics, including logo reveals, promos, and short-form brand visuals.",
    };
  }

  return {
    title: "Work | P3 Graphics",
  };
}

export default async function WorkCategoryPage({ params }) {
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

  notFound();
}