import { VscGithub } from "react-icons/vsc";
import { LinkButton } from "./LinkButton";

export interface Props {
  url: string;
  text?: string;
  size?: number;
}
export const GithubButton = ({
  url,
  text = "Source Code",
}: Props): JSX.Element => <LinkButton text={text} url={url} Icon={VscGithub} />;
