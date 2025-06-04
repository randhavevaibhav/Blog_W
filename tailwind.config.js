/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", "class"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-error-txt":"var(--bg-error-txt)",
        "text-primary": "var(--text-primary)",
        "bg-shade": "var(--bg-shade)",
        "bg-shade-hover": "var(--bg-shade-hover)",
        "error-txt":"var(--error-txt)",
        "code-txt-color":"var(--code-txt-color)",
        "code-bg-color":"var(--code-bg-color)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      height: {
        header: "var(--header-height)",
        footer: "var(--footer-height)",
        scminushd: "var(--screen-minus-header)",
        scminushdminusfoot: "var(--screen-minus-header-minus-footer)",
        articleform: "var(--article-form-height)",
        postcontentheight:"var(--post-content-height)"
      },
      minHeight: {
        scminushd: "var(--screen-minus-header)",
      },
      zIndex: {
        nav: "var(--nav-z-index)",
        modal: "var(--modal-z-index)",
      },
      fontSize: {
        fs_5xl: "var(--fs-5xl)",
        fs_4xl: "var(--fs-4xl)",
        fs_3xl: "var(--fs-3xl)",
        fs_2xl: "var(--fs-2xl)",
        fs_xl: "var(--fs-xl)",
        fs_lg: "var(--fs-lg)",
        fs_base: "var(--fs-base)",
        fs_small: "var(--fs-small)",
        fs_xs: "var(--fs-xs)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
