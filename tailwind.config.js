/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector'],
  theme: {
    
    extend: {
      screens: {
        'xs': '300px',
      },
      colors:{
        "bg-primary":"var(--bg-primary)",
        "text-primary":"var(--text-primary)",
      },
      height:{
        "header":"var(--header-height)",
        "headerMinus":"var(--header-minus)"
      }
      
    },
  },
  plugins: [],
}

