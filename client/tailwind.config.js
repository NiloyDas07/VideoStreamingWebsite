/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "Segoe UI", "sans-serif"],
      },
      colors: {
        primary: "#1e293b",

        "secondary-1": "#ffffff",
        "secondary-2": "hsl(222.22, 47.37%, 11.18%)",

        accent: "hsl(198.44, 93.2%, 59.61%)",
        "accent-2": "hsl(200.41, 98.01%, 39.41%)",

        "neutral-1": "hsl(215.29, 25%, 26.67%)",
        "neutral-2": "hsl(0, 0%, 83.14%)",
        "neutral-3": "hsl(220, 14.29%, 95.88%)",
        "neutral-4": "hsl(216.92, 19.12%, 26.67%)",
      },

      boxShadow: {
        input: "inset 0 0 0 1000px rgba(240, 240, 240, 1)",
      },
    },
  },
  plugins: [],
};
