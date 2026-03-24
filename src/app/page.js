import HomeClient from "./HomeClient";
import { getAllProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Page() {
  const projects = await getAllProjects();
  return <HomeClient projects={projects} />;
}