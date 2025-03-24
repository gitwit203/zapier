import type { Config } from "tailwindcss";

<<<<<<< HEAD
const config: Config = {
=======
export default {
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        amber: {
          700: "#ff4f00"
        },
        slate: {
          100: "#ebe9df"
        }
      }
    },
  },
  plugins: [],
};
export default config;
=======
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        amber:{
          700:"#ff4f00"
        }
      },
      slate:{
        100:"#ebe9df"
      }, 
    },
  },
  plugins: [],
} satisfies Config;
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
