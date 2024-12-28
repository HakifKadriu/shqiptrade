/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryd: "#222831",
        secondaryd: "#393E46",
        tertiaryd: "#00ADB5",
        buttond: "#323232",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
