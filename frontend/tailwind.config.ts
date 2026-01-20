import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#1f2937',
        
        // Sono Medical News Color Palette
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0B1829', // Deep Navy - Header & Navigation
          950: '#070f1a',
        },
        gold: {
          50: '#fdfaf5',
          100: '#faf3e6',
          200: '#f4e6cc',
          300: '#ead5a8',
          400: '#dfc184',
          500: '#BF9B50', // Muted Gold - Accents & Breaking News
          600: '#a88545',
          700: '#8a6d39',
          800: '#6d562e',
          900: '#574525',
        },
        skyblue: {
          50: '#f0f8fc',
          100: '#e1f1f9',
          200: '#c3e3f3',
          300: '#a5d5ed',
          400: '#8ABADD', // Soft Sky Blue - Hover & Decorative
          500: '#6fa8d1',
          600: '#5690ba',
          700: '#45769a',
          800: '#365d7a',
          900: '#2a4a5f',
        },
        
        // Legacy support (mapped to new palette)
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0B1829',
        },
        accent: {
          50: '#fdfaf5',
          100: '#faf3e6',
          200: '#f4e6cc',
          300: '#ead5a8',
          400: '#dfc184',
          500: '#BF9B50',
          600: '#a88545',
          700: '#8a6d39',
          800: '#6d562e',
          900: '#574525',
        },
        highlight: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        arabic: ['var(--font-tajawal)', 'sans-serif'],
        headline: ['var(--font-cairo)', 'var(--font-tajawal)', 'sans-serif'],
        sans: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 2px 8px -2px rgba(11, 24, 41, 0.08), 0 1px 4px -1px rgba(11, 24, 41, 0.06)',
        'premium': '0 20px 40px -12px rgba(11, 24, 41, 0.15), 0 8px 16px -8px rgba(11, 24, 41, 0.1)',
        'medical': '0 4px 16px -4px rgba(11, 24, 41, 0.12)',
        'glow-gold': '0 0 20px rgba(191, 155, 80, 0.3)',
        'glow-blue': '0 0 20px rgba(138, 186, 221, 0.3)',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-left': 'slideLeft 30s linear infinite',
        'shimmer': 'shimmer 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'medical-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B1829' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
