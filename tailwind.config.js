/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#111111',
        surface2: '#1a1a1a',
        card: '#161616',
        red: {
          primary: '#E50914',
          bright: '#FF2020',
          dark: '#B00000',
          muted: 'rgba(229,9,20,0.15)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.55)',
          muted: 'rgba(255,255,255,0.3)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          red: 'rgba(229,9,20,0.3)',
        }
      },
      fontFamily: {
        display: ['"IBM Plex Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Fragment Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
