import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f8fafc",
          text: "#1e293b",
          primary: "#1e40af",
        },
        dark: {
          background: "#0f172a",
          text: "#e2e8f0",
          primary: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};

export default config;