import HomeClient from "./HomeClient";
import { getAllProjects } from "@/lib/projects";

export default function Page() {
  const projects = getAllProjects();
  return <HomeClient projects={projects} />;
}
