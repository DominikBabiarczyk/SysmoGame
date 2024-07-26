import { extendedColors } from "./src/styles/colors";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: extendedColors,
      screens: {
        "2xl": "1470px",
      },
    },
  },
  plugins: [],
};
export default config;
