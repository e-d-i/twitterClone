/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "twitterColor0": "#50b7f5",
        "twitterColor1": "#e6ecf0",
      }
    },
  },
  plugins: [],
}