module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#031018",
        "medium-blue": "#011D2A",
        "light-blue": "#024248",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
