module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    // disabled due to issue https://github.com/styleguidist/react-docgen-typescript/issues/356
    // TODO: re-enable once resolved
    reactDocgen: 'none'
  },
  /**
   * https://stackoverflow.com/questions/59235008/css-loader-has-been-initialised-using-an-options-object-that-does-not-match-the/64620666#64620666
   * https://stackoverflow.com/questions/65495912/storybook-tailwind-how-should-i-add-tailwind-to-storybook/65709909#65709909
   */
  /**
   * With @tailwind/jit
   * https://github.com/storybookjs/storybook/issues/12668#issuecomment-730194625
   * https://github.com/wagerfield/storybook-tailwind
   * https://github.com/storybookjs/storybook/discussions/13971
   */
  /**
   * With @storybook/addon-postcss: https://storybook.js.org/addons/@storybook/addon-postcss
   * get SyntaxError (1:1) Unknown word if using `global.css` with both syntaxes
   * @tailwind/base and @import "tailwindcss/base"
   *
   * If using `global.scss`, the file loads and the styles in that file load,
   * but the tailwind classes don't seem to be loading.
   * Tried both @tailwind and @import - neither works
   */
  /**
   * Config from https://nebulab.com/blog/nextjs-tailwind-storybook
   * https://github.com/nebulab/nextjs-storybook-tailwindcss
   * has error SassError: SassError: expected "{".
   * var api = require("!../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
   * or SyntaxError (1:1) Unknown word on same line
   *
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    })

    return config
  },
  */
  /*
  TODO: get Tailwind loading properly
  // https://stackoverflow.com/a/65709909/10431574
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
   */
}