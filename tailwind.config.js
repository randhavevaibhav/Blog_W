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
        "bg-shade": "var(--bg-shade)",
        "bg-shade-hover": "var(--bg-shade-hover)",
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

      fontSize:{
        fs_4xl:"var(--fs-4xl)",
        fs_3xl:"var(--fs-3xl)",
        fs_2xl:"var(--fs-2xl)",
        fs_xl:"var(--fs-xl)",
        fs_lg:"var(--fs-lg)",
        fs_base:"var(--fs-base)",
        fs_small:"var(--fs-small)",
        fs_xs:"var(--fs-xs)",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
