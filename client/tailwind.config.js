/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#15616d",
        secondary: "#ffd166",
      },
      screens: {
        xs: "435px", // Define the 'xs' breakpoint for extra small devices
      },
    },
  },
  plugins: [],
};
