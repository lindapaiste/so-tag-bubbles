module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  typescript: {
    // disabled due to issue https://github.com/styleguidist/react-docgen-typescript/issues/356
    // TODO: re-enable once resolved
    reactDocgen: 'none'
  },
  /*
  TODO: get Tailwind loading properly
  // https://stackoverflow.com/a/65709909/10431574
  // https://nebulab.com/blog/nextjs-tailwind-storybook
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