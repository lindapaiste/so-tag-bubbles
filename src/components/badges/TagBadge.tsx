import React from "react";
import clsx from "clsx";
import { IoTrophySharp } from "react-icons/io5";
import { BadgeRank } from "../../services/stackoverflow/types-badges";
const styles = require("./badges.module.css");
/**
 * Dictionary allows easy lookup of the color set for each rank.
 * Colors are copy & pasted from StackOverflow's CSS, as of right now.
 */
const colors = {
  gold: {
    main: "#ffcc01",
    lighter: "#fff4d1",
    darker: "#f1b600",
  },
  silver: {
    main: "#b4b8bc",
    lighter: "#e8e8e8",
    darker: "#9a9c9f",
  },
  bronze: {
    main: "#caa789",
    lighter: "#f2e9e1",
    darker: "#ab825f",
  },
};

export interface TagBadgeProps {
  rank: BadgeRank;
  tag_name: string;
  award_count: number;
}

/**
 * Renders a circular medal with a trophy icon
 */
export const BadgeMedal = ({
  rank,
}: Pick<TagBadgeProps, "rank">): JSX.Element => {
  const { main, lighter, darker } = colors[rank];
  return (
    <div
      className={clsx(
        "box-content border-solid border-2",
        "w-16 h-16 rounded-full",
        "relative"
      )}
      style={{ borderColor: darker, background: lighter }}
    >
      <span
        className="rounded-full w-full h-full p-2 opacity-50 absolute"
        style={{ background: main, border: `4px solid ${darker}` }}
      />
      <IoTrophySharp className="w-10 h-10 m-3 absolute" color={main} />
    </div>
  );
};

/**
 * Box shows the name of the badge, the number of recipients, and the medal.
 *
 * Note: in UI terms, the component is a "chip" rather than a "badge"
 */
export const TagBadgeBox = ({
  rank,
  tag_name,
  award_count,
}: TagBadgeProps): JSX.Element => {
  const { lighter, darker } = colors[rank];
  return (
    <div
      className={clsx(
        styles.loraFont,
        "flex flex-row justify-between items-center",
        "border-solid border rounded-md p-3"
      )}
      style={{ borderColor: darker, background: lighter }}
    >
      <div className="flex-1 flex flex-col text-center items-stretch">
        <span className="text-xs">
          1 of <span className="italic font-bold text-base">{award_count}</span>{" "}
          users with badge
        </span>
        <span className="italic text-2xl">{tag_name}</span>
      </div>
      <BadgeMedal rank={rank} />
    </div>
  );
};
