import { GetStaticProps } from "next";
import { BubblesScreen } from "../components/bubbles/BubblesScreen";
import SEO from "../services/head";
import { getMyTopTags } from "../services/stackoverflow/client";
import { TagData } from "../services/d3/usePackLayout";
import { TAG_COUNT } from "../config";

interface Props {
  initialData: TagData[];
}

export default function Bubbles({ initialData }: Props): JSX.Element {
  return (
    <>
      <SEO
        title="Linda Paiste - Front End Web Developer - Houston, TX"
        appendSiteName={false}
      />
      <BubblesScreen tags={initialData} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    initialData: (await getMyTopTags(TAG_COUNT)).items,
  },
  revalidate: 3600, // 1 hour
});
