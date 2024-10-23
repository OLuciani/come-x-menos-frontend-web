import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '400px',
        'custom-w-450': '450px',
        'xxs': '340px',
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      const newComponents = {
        '.no-spin': {
          // Para navegadores basados en WebKit (Chrome, Safari, Opera)
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          // Para Firefox
          '&': {
            '-moz-appearance': 'textfield',
          },
        },
      };
      addComponents(newComponents);
    }),
  ],
};

export default config;

