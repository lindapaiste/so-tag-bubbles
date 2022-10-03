import { Html, Head as DocumentHead, Main, NextScript } from "next/document";

/**
 * Global document component renders <head> tags which are common to all pages,
 * like fonts and favicons.
 *
 * Icons: Load favicons with svg as the primary and ico as a fallback only:
 * https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/
 *
 * Fonts: Preload fonts in the <head>:
 * https://nextjs.org/docs/basic-features/font-optimization
 * Note: could make conditional, but most pages will use both.
 *
 * Note: errors re: using <Head> without a <title> are from Webstorm
 * based on the component name, not based on the Next.js <Head> itself.
 * Avoid by aliasing to DocumentHead.
 */
export default function Document() {
  return (
    <Html>
      <DocumentHead>
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
        <link rel="mask-icon" href="/favicon-masked.svg" color="#5bbad5" />
      </DocumentHead>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
