import { ProjectsList } from "../../components/projects/ProjectStub";
import SEO from "../../services/head";

export default function Page(): JSX.Element {
  return (
    <div>
      <SEO title="Projects - React Web Apps" />
      <ProjectsList />
    </div>
  );
}
