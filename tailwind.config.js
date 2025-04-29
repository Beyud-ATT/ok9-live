/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      times: ["Times", ...fontFamily.sans],
      utm: ["UTM Avo", ...fontFamily.sans],
      utmBold: ["UTM AvoBold", ...fontFamily.sans],
    },
  },
  plugins: [],
};
