import React from "react";
import clsx from "clsx";
import { rankColors } from "./rankColors";
import { BadgeMedal, BadgeMedalProps } from "./BadgeMedal";

export interface TagBadgeProps extends BadgeMedalProps {
  /**
   * The badge box also includes the number of users who have been awarded
   * with this badge.
   */
  award_count: number;
}

/**
 * Box shows the name of the badge, the number of recipients, and the medal.
 *
 * Note: in UI terms, the StackOverflow badge element is a "chip" rather than a "badge"
 */
export const TagBadgeBox = ({
  rank,
  tag_name,
  award_count,
}: TagBadgeProps): JSX.Element => {
  const { lighter, darker } = rankColors[rank];
  return (
    <div
      className={clsx(
        "font-lora",
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
      <BadgeMedal rank={rank} tag_name={tag_name} />
    </div>
  );
};
