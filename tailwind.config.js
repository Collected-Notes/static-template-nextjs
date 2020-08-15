module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
