import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: "#FFD700",
        brandRed: "#DC2626",
        brandDark: "#1F2937",
        brandLight: "#F3F4F6",
        successGreen: "#10B981"
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.15)"
      }
    }
  },
  plugins: []
};

export default config;
