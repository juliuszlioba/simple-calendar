const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "512px",
      ...defaultTheme.screens,
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      fuchsia: colors.fuchsia,
      green: colors.lime,
      red: colors.red,
      yellow: colors.yellow,
      "light-background": "#F9F5F2",
      "light-background-transparent": "#AB8D741A",
    },
    extend: {},
  },
  plugins: [],
}
