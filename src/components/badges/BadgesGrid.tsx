import { FC } from "react";
import { TagBadgeBox } from "./TagBadge";
import { Badge } from "../../services/stackoverflow/types-badges";

export const BadgesGrid: FC<{ badges: Badge[] }> = ({ badges = [] }) => (
  <div className="flex flex-wrap p-4 w-full max-w-screen-xl">
    {badges?.map((badge) => (
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={badge.badge_id}>
        <TagBadgeBox
          rank={badge.rank}
          tag_name={badge.name}
          award_count={badge.award_count}
        />
      </div>
    ))}
  </div>
);
