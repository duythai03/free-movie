module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#031018",
        "medium-blue": "#011D2A",
        "light-blue": "#024248",
        "light-text": "#92989F",
        "black-text": "#333333",
        "light-bg": "#f5f5f5",
        mainBlue: "#3180ff",
      },
      boxShadow: {
        bottom: "0 3px 6px -2px gray",
        bigFull: "0 0 10px -1px rgba(0, 0, 0, 0.5)",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      },
      backgroundColor: {
        "custom-gray": "#f0f0f0 !important",
      },
      backgroundImage: {
        "login-bg": "url('/src/assets/loginbg.png')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    require("daisyui"),
  ],
};
