import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green': 'var(--green)',
        'green-light': 'var(--green-light)',
        'green-dark': 'var(--green-dark)',
        'dark': 'var(--dark)',
        'light': 'var(--light)',
        'grey': 'var(--grey)',
        'gray': 'var(--gray)',
        'blue': 'var(--blue)',
        'purple': 'var(--purple)',
        'red': 'var(--red)',
        'orange': 'var(--orange)',
        'mid': 'var(--mid)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'mori': ['Mori', 'sans-serif'],
        'fraktion-mono': ['Fraktion Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
