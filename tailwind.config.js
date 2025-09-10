import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: "#393FCB",
          50: '#f2f7fd',
          100: '#e3eefa',
          200: '#c1dcf5',
          300: '#8ac0ec',
          400: '#4b9fde',
          500: '#2380c8',
          600: '#1866aa',
          700: '#15538b',
          800: '#164673',
          900: '#183c61',
          950: '#112741',
        },
        secondary: {
          DEFAULT: "#0ACBDB",
          50: '#f4f7f9',
          100: '#e3e9ee',
          200: '#ccd7e0',
          300: '#abbcca',
          400: '#8498af',
          500: '#687c95',
          600: '#54657b',
          700: '#465365',
          800: '#3d4655',
          900: '#353d49',
          950: '#21262f',
        },
        accent: "#3DC1E1",
        dark: "#0C0E1D",
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.75s ease-in forwards',
        'fade-out': 'fadeOut 0.75s ease-out forwards',
        'slide-up': 'slideUp 0.75s ease-out forwards',
        'slide-down': 'slideDown 0.75s ease-out forwards',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'border-beam': 'border-beam 4s infinite linear',
        'rainbow': 'rainbow var(--speed, 2s) infinite linear',
        'shiny-text': 'shiny-text 8s infinite',
        'background-position-spin': 'background-position-spin 3000ms infinite alternate',
        "meteor-effect": "meteor 5s linear infinite",
        'scroll': 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        "radar-spin": "radar-spin 10s linear infinite",
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'border-beam': {
          '0%': {
            transform: 'rotate(0deg) translate(calc(var(--size) * -1), 0)',
          },
          '100%': {
            transform: 'rotate(360deg) translate(calc(var(--size) * -1), 0)',
          }
        },
        'rainbow': {
          '0%': {
            'background-position': '0%',
          },
          '100%': {
            'background-position': '200%',
          },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
        'background-position-spin': {
          '0%': {
            backgroundPosition: 'top center',
          },
          '100%': {
            backgroundPosition: 'bottom center',
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "radar-spin": {
          from: {
            transform: "rotate(-90deg)",
          },
          to: {
            transform: "rotate(270deg)",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#9CA3AF',
            h1: { color: '#FFFFFF' },
            h2: { color: '#FFFFFF' },
            h3: { color: '#FFFFFF' },
            strong: { color: '#FFFFFF' },
            a: {
              color: '#0ACBDB',
              '&:hover': { color: '#3DC1E1' },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
    plugin(({ addUtilities, addBase }) => {
      addUtilities({
        '.mask-radial-gradient': {
          'mask-image': 'radial-gradient(circle at center, transparent 20%, black)',
          '-webkit-mask-image': 'radial-gradient(circle at center, transparent 20%, black)',
        },
        '.absolute': {
          'position': 'absolute'
        },
        '.inset-0': {
          'top': '0',
          'right': '0',
          'bottom': '0',
          'left': '0'
        },
        '.z-0': {
          'z-index': '0'
        },
        '.z-10': {
          'z-index': '10'
        }
      });

      addBase({
        ':root': {
          '--mask-gradient': 'radial-gradient(circle at center, transparent 20%, black)'
        }
      });
    }),
  ],
}