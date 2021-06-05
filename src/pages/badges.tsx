import { Badge } from "../services/stackoverflow/types-badges";
import { SoResponse } from "../services/stackoverflow/types";
import { getMyBadgesWithCount } from "../services/stackoverflow/client";
import useSWR from "swr";
import { TagBadgeBox } from "../components/badges/TagBadge";
import { sortBy, uniqBy } from "lodash";
import { GetStaticProps } from "next";
const styles = require("../components/badges/badges.module.css");

// TODO: head

export interface Props {
  initialData: SoResponse<Badge>;
}

/**
 * Note: useSWR hook can be used to refetch fresh data on top of the
 * prefetched data from getStaticProps, but this is probably not necessary.
 */
export default function TagBadges({ initialData }: Props): JSX.Element {
  const { data } = useSWR("tag_badge_data", getMyBadgesWithCount, {
    initialData,
  });

  // sort by rarity
  // remove lower-level duplicates, ie. if I have silver and bronze, just show bronze.
  const badges =
    uniqBy(
    sortBy(data?.items || [], (b) => b.award_count),
      (b) => b.name
    );




  return (
    <div>
      <h3>Compared to my peers, I excel at:</h3>
    <div className={styles.container}>
      {badges.map((badge) => (
        <TagBadgeBox
          rank={badge.rank}
          tag_name={badge.name}
          award_count={badge.award_count}
          key={badge.badge_id}
        />
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
