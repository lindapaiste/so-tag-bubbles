import { GetStaticProps } from "next";
import { BubblesScreen } from "../components/bubbles/BubblesScreen";
import SEO from "../services/head";
import {
  getMyBadgesWithCount,
  getMyTopTags,
} from "../services/stackoverflow/client";
import { TagData } from "../services/d3/usePackLayout";
import { TAG_COUNT } from "../config";
import { getGithubContributions } from "../services/github/client";
import { ContributedRepo } from "../services/github/types";
import { GithubGrid } from "../components/github/GithubGrid";
import { Badge } from "../services/stackoverflow/types-badges";
import { BadgesGrid } from "../components/badges/BadgesGrid";
import { Section } from "../components/layout/Section";
import { ProjectsList } from "../components/projects/ProjectsList";

interface Props {
  initialData: {
    bubbles: TagData[];
    repos: ContributedRepo[];
    badges: Badge[];
  };
}

/**
 * Note: useSWR hook can be used to refetch fresh data on top of the
 * prefetched data from getStaticProps, but this is probably not necessary.
 */
export default function HomePage({ initialData }: Props): JSX.Element {
  return (
    <>
      <SEO
        title="Linda Paiste - Front End Web Developer - Houston, TX"
        appendSiteName={false}
      />
      <BubblesScreen tags={initialData.bubbles} />
      <Section
        title="Tag Badges I've Earned on StackOverflow"
        subtitle="Sorted by Rarity"
      >
        <BadgesGrid badges={initialData.badges} />
      </Section>
      <Section
        title="Open-Source Projects I've Contributed To"
        subtitle="Pull Requests & Issues"
      >
        <GithubGrid repos={initialData.repos} />
      </Section>
      <Section title="Web Apps I've Created" subtitle="(work in progress)">
        <ProjectsList />
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [bubbles, repos, badges] = await Promise.all([
    getMyTopTags(TAG_COUNT),
    getGithubContributions(),
    getMyBadgesWithCount(),
  ]);
  return {
    props: {
      initialData: {
        bubbles: bubbles.items,
        repos,
        badges,
      },
    },
    revalidate: 3600, // 1 hour
  };
};
