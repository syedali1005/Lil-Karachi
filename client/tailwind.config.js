import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar,
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1-gold': {
          '-webkit-text-stroke-width': '1px',
          '-webkit-text-stroke-color': '#E0AC38',
        },
        '.text-stroke-2-gold': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#E0AC38',
        },
        '.text-stroke-3-gold': {
          '-webkit-text-stroke-width': '3px',
          '-webkit-text-stroke-color': '#E0AC38',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
