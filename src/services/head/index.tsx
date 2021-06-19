import NextHead from "next/head";
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
 * Combine SEO with Fonts and Icons
 *
 * Icons: Load favicons with svg as the primary and ico as a fallback only:
 * https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/
 *
 * Fonts: Preload fonts in the <head>:
 * https://nextjs.org/docs/basic-features/font-optimization
 * Note: could make conditional, but most pages will use both.
 *
 * SEO: Copied & altered from Next.js docs:
 * https://nextjs.org/docs/migrating/from-create-react-app#search-engine-optimization
 *
 * Wanted to break up into individual components, but Next.js <Head>
 * requires that contents be DIRECT children, so cannot even wrap in a fragment.
 *
 * Note: errors re: using <Head> without a <title> are from Webstorm
 * based on the component name, not based on the Next.js <Head> itself
 */
export default function Head({
  description,
  title,
  appendSiteName = true,
}: SEOProps): JSX.Element {
  return (
    <NextHead>
      {/* SEO */}
      <title>{appendSiteName ? `${title} | ${SITE_TITLE}` : title}</title>
      {description !== undefined && (
        <meta name="description" content={description} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description !== undefined && (
        <meta property="og:description" content={description} />
      )}
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <link
        // can load all weights: wght@300;400;700;
        href="https://fonts.googleapis.com/css2?family=BenchNine:wght@700&display=swap"
        rel="stylesheet"
      />
      {/* Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
    </NextHead>
  );
}
