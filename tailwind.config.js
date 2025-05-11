// tailwind.config.js
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
                  h1: { color: '#ffffff', fontWeight: '700', fontSize: '2.25rem' },
            h2: { color: '#ffffff', fontWeight: '700', fontSize: '1.75rem' },
            h3: { color: '#e4e4e7', fontWeight: '600', fontSize: '1.5rem' },
            h4: { color: '#e4e4e7', fontWeight: '600' },
            p: { marginTop: '1rem', marginBottom: '1rem' },
            li: { marginTop: '0.5rem', marginBottom: '0.5rem' },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#22c55e',
              fontStyle: 'italic',
              paddingLeft: '1rem',
            },
            },
            },
            },

    },
  },
  plugins: [typography],
};
