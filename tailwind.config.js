// tailwind.config.js
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.white'),
              fontWeight: '700',
              fontSize: '2.25rem',
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: '700',
              fontSize: '1.75rem',
            },
            h3: {
              color: theme('colors.zinc.200'),
              fontWeight: '600',
              fontSize: '1.5rem',
            },
            h4: {
              color: theme('colors.zinc.200'),
              fontWeight: '600',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              color: theme('colors.zinc.400'),
              borderLeftColor: theme('colors.green.500'),
              fontStyle: 'italic',
              paddingLeft: '1rem',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
