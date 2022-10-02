import clsx from "clsx";
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
  return (
    <div
      className={clsx(
        "font-lora",
        "flex flex-row justify-between items-center",
        "rounded-lg border-2 border-[#50d7cb] shadow-md p-3"
      )}
    >
      <div className="flex-1 flex flex-col text-center items-stretch">
        <span className="italic text-xs">
          1 of <span className="italic font-bold text-base">{award_count}</span>{" "}
          users with badge
        </span>
        <span className={clsx(
          "font-bold font-benchnine uppercase",
          tag_name.length > 15 ? "text-2xl" : "text-3xl"
        )}>
          {tag_name}
        </span>
      </div>
      <BadgeMedal rank={rank} tag_name={tag_name} />
    </div>
  );
};
