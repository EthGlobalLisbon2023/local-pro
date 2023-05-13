import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-color": "linear-gradient(to bottom, #FFE3BF, #FFECD4)",
        "gradient-custom":
          "linear-gradient(-82deg, var(--color-custom-purple1) 0%, var(--color-custom-purple2) 100%)",
      }),

      fontFamily: {
        zilla: ["Zilla Slab", "sans-serif"],
      },

      colors: {
        "custom-purple1": "#B74688",
        "custom-purple2": "#7602AD",
      },

      borderRadius: {
        custom: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
