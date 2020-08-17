const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");

module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      maxWidth: {
        prose: "65ch",
      },

      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },

      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.300"),
            '[class~="lead"]': {
              color: theme("colors.gray.400"),
            },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.gray.700"),
            },
            hr: {
              borderTopColor: theme("colors.gray.800"),
            },
            strong: {
              color: theme("colors.white"),
            },
            "figure figcaption": {
              color: theme("colors.gray.500"),
            },
            a: {
              color: theme("colors.white"),
            },
            th: {
              color: theme("colors.white"),
            },
            "h1, h2, h3, h4": {
              color: theme("colors.white"),
            },
            code: {
              color: theme("colors.gray.300"),
            },
            "code:before": {
              color: theme("colors.gray.300"),
            },
            "code:after": {
              color: theme("colors.gray.300"),
            },
            "ol > li:before": {
              color: theme("colors.gray.400"),
            },
            "ul > li:before": {
              backgroundColor: theme("colors.gray.600"),
            },
          },
        },
      }),
    },
  },
  variants: {
    textColor: ["responsive", "dark", "hover", "focus"],
    backgroundColor: ["responsive", "dark", "hover", "focus"],
    typography: ["responsive", "dark"],
  },
  plugins: [
    plugin(function ({ addVariant, prefix }) {
      addVariant("dark", ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `dark${separator}${sel.value}`;
              sel.parent.insertBefore(
                sel,
                selectorParser().astSync(prefix(".scheme-dark "))
              );
            });
          }).processSync(selector);
        });
      });
    }),
    require("@tailwindcss/typography"),
  ],
};
