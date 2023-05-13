import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-color": "linear-gradient(to bottom, #FFE3BF, #FFECD4)",
      }),

      fontFamily: {
        zilla: ["Zilla Slab", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
