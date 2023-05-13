import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
         'gradient-color': 'linear-gradient(to bottom, #FFE3BF, #FFECD4)',
      })
    }
  },
  plugins: [],
} satisfies Config;
