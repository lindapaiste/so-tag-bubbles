import { GetStaticPaths, GetStaticProps } from "next";
import { Project } from "../../services/projects/types";
import { getProject, getProjectSlugs } from "../../services/projects/client";
import { GithubButton } from "../../components/projects/GithubButton";

export interface Props {
  project: Project;
}

const ProjectPage = ({ project }: Props): JSX.Element => (
  <div>
    <h1 className="font-lora italic text-4xl">{project.name}</h1>
    <div>
      {project.links.github ? (
        <GithubButton url={project.links.github} />
      ) : null}
    </div>
  </div>
);

export default ProjectPage;

export const getStaticProps: GetStaticProps<Props, { project: string }> =
  async (context) => {
    if (!context.params) {
      throw new Error("missing required project slug");
    }
    return {
      props: {
        project: await getProject(context.params.project),
      },
    };
  };

export const getStaticPaths: GetStaticPaths<{ project: string }> = async () => {
  const slugs = await getProjectSlugs();
  return {
    paths: slugs.map((project) => ({ params: { project } })),
    fallback: false, // load 404 on other slugs
  };
};
