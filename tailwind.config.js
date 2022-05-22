const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'roboto': ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
