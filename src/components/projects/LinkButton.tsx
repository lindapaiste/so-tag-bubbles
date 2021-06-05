import { IconType } from "react-icons";
const styles = require("./button.module.scss");

export interface Props {
  url: string;
  Icon: IconType;
  text: string;
}

export const LinkButton = ({ url, Icon, text }: Props): JSX.Element => (
  <a href={url} className={styles.button}>
    <Icon className={styles.icon} size={20} />
    <div className={styles.text}>{text}</div>
  </a>
);
