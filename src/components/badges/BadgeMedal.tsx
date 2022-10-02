import { IconType } from "react-icons";
import { SiJavascript, SiReact, SiReactrouter, SiRedux, SiTypescript } from "react-icons/si";
import { IoTrophySharp } from "react-icons/io5";
import clsx from "clsx";
import { rankColors } from "./rankColors";
import { BadgeRank } from "../../services/stackoverflow/types-badges";

export interface BadgeMedalProps {
  /**
   * gold, silver, or bronze
   */
  rank: BadgeRank;
  /**
   * The name of the tag is used to lookup the icon
   */
  tag_name: string;
}

/**
 * Mapping of tag names to icon components.
 * Have to hardcode this somewhere.
 * Returns a component or `undefined` on an unknown tag.
 */
const getIconComponent = (tag: string): IconType | undefined => {
  // exact matches first
  if (tag === "reactjs") return SiReact;
  if (tag === "javascript") return SiJavascript;
  // `includes` covers cases which lack a specific icon
  // applies to "redux", "react-redux", and "redux-toolkit" which all use the same logo
  if (tag.includes("redux")) return SiRedux;
  // applies to "react-router"
  if (tag.includes("router")) return SiReactrouter;
  // applies to "typescript", "typescript-generics", etc.
  if (tag.includes("typescript")) return SiTypescript;
  // applies to "react", "react-native", etc.
  if (tag.includes("react")) return SiReact;
  return undefined;
};
/**
 * Renders a circular medal with an icon for the technology (or a trophy if unknown).
 *
 * Currently it is only used in the TagBadgeBox, but could be used elsewhere.
 * Could use a tooltip to show the badge name.
 *
 * Overall size is based on root font size -- is 4rem square. Can scale with CSS transform.
 */
export const BadgeMedal = ({
  rank,
  tag_name,
}: BadgeMedalProps): JSX.Element => {
  const { main, lighter, darker } = rankColors[rank];
  const Icon = getIconComponent(tag_name);
  return (
    <div
      className={clsx(
        "box-content border-solid border-2",
        "w-16 h-16 rounded-full shadow-md",
        "relative"
      )}
      style={{ borderColor: darker, background: lighter, overflow: "hidden" }}
    >
      <span
        className="rounded-full w-full h-full p-2 opacity-50 absolute"
        style={{ background: main, border: `4px solid ${darker}` }}
      />
      {Icon === undefined ? (
        <IoTrophySharp className="w-10 h-10 m-3 absolute" color={main} />
      ) : (
        <Icon className="w-10 h-10 m-3 absolute rounded" color={darker} />
      )}
    </div>
  );
};
