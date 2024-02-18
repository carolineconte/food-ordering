/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
      primary: '#E1123C',
      primaryHover: '#9B0322',
      secondary: '#005743',
      secondaryHover: '#033B2E',
      backgorund: '#F5EDEC'
     },
     backgroundImage: {
      'hero-pattern': "url('/pizzaHero.svg')",
    }
    },
  },
  plugins: [],
};
