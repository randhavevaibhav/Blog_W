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
        "bg-shade":"var(--bg-shade)"
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
      zIndex: {
        nav: "var(--nav-z-index)",
        modal: "var(--modal-z-index)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography",)],
};
