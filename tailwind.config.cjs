/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#050b18",
        secondary: "#9bb5ce",
        tertiary: "#0f1f38",
        "black-100": "#0a1628",
        "black-200": "#060e1c",
        "white-100": "#f3f3f3",
        "blue-primary": "#2C5EAD",
        "blue-vibrant": "#1591DC",
        "blue-light": "#C4E2F5",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #102a52",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
