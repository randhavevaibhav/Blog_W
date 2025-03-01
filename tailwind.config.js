/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
      colors: {
        "bg-primary": "var(--bg-primary)",
        "text-primary": "var(--text-primary)",
      },
      height: {
        header: "var(--header-height)",
        footer: "var(--footer-height)",
        scminushd: "var(--screen-minus-header)",
        scminushdminusfoot: "var(--screen-minus-header-minus-footer)",
        articleform: "var(--article-form-height)",
      },
      minHeight: {
        scminushd: "var(--screen-minus-header)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
