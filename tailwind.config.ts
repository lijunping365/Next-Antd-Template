/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss';
export default {
  darkMode: 'class',
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
} as Config;
