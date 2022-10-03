import { IconType } from "react-icons";

export interface Props {
  url: string;
  Icon: IconType;
  text: string;
}

export const LinkButton = ({ url, Icon, text }: Props): JSX.Element => (
  <a
    href={url}
    className="inline-flex flex-row items-center rounded bg-green-300 p-2 font-benchnine uppercase text-black no-underline shadow-md"
  >
    <Icon className="mr-3" size={20} />
    <div>{text}</div>
  </a>
);
