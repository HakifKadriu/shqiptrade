/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        firstd: "#000814",
        secondd: "#262626", // secondary bg
        thirdd: "#404040", // placeholder
        fourthd: "#ffc300ff",
        fifthd: "#0d0d0d", // button

        firstl: "#edede9ff",
        secondl: "#d6ccc2ff",
        thirdl: "#f5ebe0ff",
        fourthl: "#e3d5caff",
        fifthl: "#d5bdafff",


        green: "#DAF7A6",
      },
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
});
