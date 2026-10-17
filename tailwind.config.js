/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFCF9',
          100: '#FAF6F0',
          150: '#F5EFEB',
          200: '#EFE6DD',
          300: '#E4D8CA',
          400: '#D5C4B2',
          500: '#BAA590',
        },
        espresso: {
          950: '#14100E',
          900: '#231C18',
          800: '#2F2620',
          700: '#43372E',
          600: '#5F5043',
          500: '#7F6E60',
          400: '#A49384',
          300: '#CBC0B4',
          200: '#E5DFD7',
          100: '#F3EFEB',
        },
        terracotta: {
          DEFAULT: '#C25E42',
          hover: '#AA4E35',
          light: '#F8ECE7',
          border: '#E8C5BA',
          dark: '#873B25',
        },
        rose: {
          dusty: '#B8736B',
          light: '#F8EFEB',
          border: '#E3C7C3',
          dark: '#8B4D46',
        },
        olive: {
          DEFAULT: '#58674E',
          hover: '#47533E',
          light: '#EEF3EC',
          border: '#C7D4BF',
          dark: '#353F2D',
        },
        brass: {
          DEFAULT: '#C49649',
          light: '#FAF3E5',
          dark: '#936C29',
        }
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        display: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'warm-xs': '0 1px 2px rgba(35, 28, 24, 0.04)',
        'warm-sm': '0 2px 6px rgba(35, 28, 24, 0.06), 0 1px 2px rgba(35, 28, 24, 0.03)',
        'warm-md': '0 6px 18px -2px rgba(35, 28, 24, 0.08), 0 2px 6px -1px rgba(35, 28, 24, 0.04)',
        'warm-lg': '0 14px 32px -4px rgba(35, 28, 24, 0.1), 0 4px 12px -2px rgba(35, 28, 24, 0.05)',
        'album': '0 20px 42px -10px rgba(35, 28, 24, 0.14), 0 2px 6px rgba(35, 28, 24, 0.06)',
        'audio-inset': 'inset 0 2px 4px rgba(35, 28, 24, 0.1)',
      }
    },
  },
  plugins: [],
}
