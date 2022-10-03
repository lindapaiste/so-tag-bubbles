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
 * SEO: Copied & altered from Next.js docs:
 * https://nextjs.org/docs/migrating/from-create-react-app#search-engine-optimization
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
    </NextHead>
  );
}
