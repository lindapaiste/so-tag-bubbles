module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'lora': ['Lora', 'serif'],
      'benchnine': ['BenchNine', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
