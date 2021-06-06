import { sortBy, uniqBy } from "lodash";
import { GetStaticProps } from "next";
import { Badge } from "../services/stackoverflow/types-badges";
import { SoResponse } from "../services/stackoverflow/types";
import { getMyBadgesWithCount } from "../services/stackoverflow/client";
import { TagBadgeBox } from "../components/badges/TagBadge";

// TODO: head

export interface Props {
  initialData: SoResponse<Badge>;
}

/**
 * Note: useSWR hook can be used to refetch fresh data on top of the
 * prefetched data from getStaticProps, but this is probably not necessary.
 */
export default function TagBadges({ initialData }: Props): JSX.Element {
  // sort by rarity
  const sorted = sortBy(initialData?.items || [], (b) => b.award_count);
  // remove lower-level duplicates, ie. if I have silver and bronze, just show silver.
  const badges = uniqBy(sorted, (b) => b.name);

  return (
    <div className="font-lora flex flex-col items-center">
      <h3 className="text-3xl">
        Among my peers, here's where I{" "}
        <span className="font-bold italic text-5xl">excel</span>
      </h3>
      <div className="flex flex-wrap p-4 max-w-screen-lg">
        {badges.map((badge) => (
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={badge.badge_id}>
            <TagBadgeBox
              rank={badge.rank}
              tag_name={badge.name}
              award_count={badge.award_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const initialData = await getMyBadgesWithCount();
  return {
    props: {
      initialData,
    },
    revalidate: 3600, // 1 hour
  };
};
