import Head from "next/head";
import { SITE_TITLE } from "../../config";

export interface SEOProps {
  /**
   * The primary title for the page
   */
  title: string;
  /**
   * Whether or not to include the site name after the title.
   * [Optional] default TRUE
   */
  appendSiteName?: boolean;
  /**
   * Meta description
   * [Optional] defaults to nothing, meaning Google will select relevant text
   */
  description?: string;
  /**
   * Can eventually support additional props like canonical URLs.
   */
}

/**
 * Component copied & altered from Next.js docs:
 * https://nextjs.org/docs/migrating/from-create-react-app#search-engine-optimization
 *
 * Also preloading fonts here: https://nextjs.org/docs/basic-features/font-optimization
 * Note: could make conditional, but most pages will use both.
 */
export default function SEO({
  description,
  title,
  appendSiteName = true,
}: SEOProps): JSX.Element {
  return (
    <Head>
      <title>{appendSiteName ? `${title} | ${SITE_TITLE}` : title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <link
        // can load all weights: wght@300;400;700;
        href="https://fonts.googleapis.com/css2?family=BenchNine:wght@700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
