export const dynamic = "force-dynamic";
export const revalidate = 0;

import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import GalleryClient from "./GalleryClient";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4"]);

export default async function WorkCategoryPage({ params }) {
  const p = await params; // your Next version: params can be a Promise
  const category = p?.category;

  if (typeof category !== "string" || !category) notFound();

  const dirPath = path.join(process.cwd(), "public", "work", category);

  if (!fs.existsSync(dirPath)) notFound();

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const items = files.map((file) => ({
    file,
    src: `/work/${category}/${file}`,
    type: file.toLowerCase().endsWith(".mp4") ? "video" : "image",
  }));

  return (
    <main className="min-h-screen bg-black text-white">
      <GalleryClient category={category} items={items} />
    </main>
  );
}