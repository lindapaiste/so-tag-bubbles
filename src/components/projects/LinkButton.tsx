import { IconType } from "react-icons";

export interface Props {
  url: string;
  Icon: IconType;
  text: string;
}

export const LinkButton = ({ url, Icon, text }: Props): JSX.Element => (
  <a
    href={url}
    className="inline-flex flex-row items-center uppercase font-benchnine text-black no-underline rounded p-2 bg-green-300 shadow-md"
  >
    <Icon className="mr-3" size={20} />
    <div>{text}</div>
  </a>
);
