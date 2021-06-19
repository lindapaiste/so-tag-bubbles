module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      /**
       * Creates tailwind classes for custom-loaded fonts:
       * "font-lora" and "font-benchnine"
       */
      lora: ["Lora", "serif"],
      benchnine: ["BenchNine", "sans-serif"],
    },
    cursor: {
      default: 'default',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
