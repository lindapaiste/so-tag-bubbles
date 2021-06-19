import { useWindowSize } from "../services/window/useWindowSize";
import { BubblesScreen } from "../components/bubbles/BubblesScreen";
import SEO from "../services/head";
import { GetStaticProps } from "next";
import { getMyTopTags } from "../services/stackoverflow/client";
import { TagData } from "../services/d3/usePackLayout";
import { TAG_COUNT } from "../config";

interface Props {
  initialData: TagData[];
}

export default function Bubbles({ initialData }: Props): JSX.Element {
  const { width, height } = useWindowSize({ width: 500, height: 500 });

  return (
    <>
      <SEO
        title={"Linda Paiste - Front End Web Developer - Houston, TX"}
        appendSiteName={false}
      />
      <BubblesScreen tags={initialData} width={width} height={height} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      initialData: (await getMyTopTags(TAG_COUNT)).items,
    },
    revalidate: 3600, // 1 hour
  };
};
