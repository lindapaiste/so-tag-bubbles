import { useWindowSize } from "../services/window/useWindowSize";
import { useTopTags } from "../services/stackoverflow/useTopTags";
import React from "react";
import { BubblesScreen } from "../components/bubbles/BubblesScreen";
import SEO from "../services/seo/SEO";

export default function Bubbles(): JSX.Element {
  const { width, height } = useWindowSize({
    width: 500,
    height: 500,
  });

  const tags = useTopTags();

  return (
    <>
      <SEO
        title={"Linda Paiste - Front End Web Developer - Houston, TX"}
        appendSiteName={false}
      />
      <BubblesScreen tags={tags} width={width} height={height} />
    </>
  );
}
