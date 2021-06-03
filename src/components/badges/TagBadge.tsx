import React from "react";
import clsx from "clsx";
import { IoTrophySharp } from "react-icons/io5";
const styles = require("./badges.module.css");
import { BadgeRank } from "../../services/stackoverflow/types-badges";

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
  award_count?: number;
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
      className={clsx(styles.medal, rank)}
      style={{ borderColor: darker, background: lighter }}
    >
      <span
        className={styles.circle}
        style={{ background: main, border: `2px solid ${darker}` }}
      />
      <IoTrophySharp className={styles.trophy} color={main} size={40} />
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
}: Required<TagBadgeProps>): JSX.Element => {
  const { lighter, darker } = colors[rank];
  return (
    <div
      className={clsx(styles.tagBadgeBox, rank)}
      style={{ borderColor: darker, background: lighter }}
    >
      <div className={styles.badgeTexts}>
        <span className={styles.rarity}>
          1 of <span className={styles.count}>{award_count}</span> users with
          badge
        </span>
        <span className={styles.tagName}>{tag_name}</span>
      </div>
      <BadgeMedal rank={rank} />
    </div>
  );
};
