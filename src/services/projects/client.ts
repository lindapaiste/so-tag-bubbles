import { Project } from "./types";
import json from "./fake-database.json";

const data = json as Partial<Record<string, Project>>;

/**
 * Get the slugs for all projects.
 * Used to pre-render product pages.
 */
export const getProjectSlugs = async (): Promise<string[]> => Object.keys(json);

/**
 * Look up a project by slug.
 * Return the project object or throw an error if not found.
 */
export const getProject = async (slug: string): Promise<Project> => {
  const project = data[slug];
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};
