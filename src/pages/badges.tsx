import { GetStaticProps } from "next";
import { Badge } from "../services/stackoverflow/types-badges";
import { getMyBadgesWithCount } from "../services/stackoverflow/client";
import SEO from "../services/head";
import { BadgesGrid } from "../components/badges/BadgesGrid";

export interface Props {
  initialData: Badge[];
}

/**
 * Note: useSWR hook can be used to refetch fresh data on top of the
 * prefetched data from getStaticProps, but this is probably not necessary.
 */
export default function TagBadges({ initialData }: Props): JSX.Element {
  return (
    <div>
      <SEO
        title="Linda Paiste - Front End Web Developer - Houston, TX"
        appendSiteName={false}
      />
      <div className="font-lora flex flex-col items-center">
        <h3 className="text-3xl">
          {"Among my peers, here's where I "}
          <span className="font-bold italic text-5xl">excel</span>
        </h3>
        <BadgesGrid badges={initialData} />
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
