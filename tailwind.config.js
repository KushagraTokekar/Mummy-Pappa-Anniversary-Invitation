/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#C0C0C0', // Royal Silver
          600: '#8A92A0',
          700: '#64748B',
          800: '#475569',
          900: '#334155',
        },
        champagne: {
          DEFAULT: '#E8DCC5', // Champagne from palette
          50: '#FAF8F4',
          100: '#F5EFE4',
          200: '#EDE4D3',
          300: '#E8DCC5',
          400: '#DFCDB0',
          500: '#CEB890',
          600: '#B69E73',
          700: '#8F7850',
        },
        ivory: {
          DEFAULT: '#FFFDF8',
          light: '#FFFFFF',
          dark: '#F7F4EB',
        },
        charcoal: {
          DEFAULT: '#171717',
          light: '#262626',
          dark: '#0F0F0F',
        },
        midnight: {
          DEFAULT: '#141720',
          dark: '#0D0E12',
          card: 'rgba(20, 23, 32, 0.85)',
          border: 'rgba(192, 192, 192, 0.20)',
        },
        gold: {
          300: '#F6E088',
          400: '#E8C550',
          500: '#D4AF37', // Soft Gold Accent
          600: '#B89222',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        display: ['Cinzel', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'silver-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E8DCC5 20%, #C0C0C0 50%, #E5E7EB 75%, #FFFFFF 100%)',
        'silver-metallic': 'linear-gradient(110deg, #9ca3af 0%, #f3f4f6 25%, #d1d5db 45%, #ffffff 50%, #9ca3af 70%, #f3f4f6 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #FFFDF8 0%, #E8DCC5 50%, #CEB890 100%)',
      },
      boxShadow: {
        'silver-glow': '0 0 25px rgba(192, 192, 192, 0.22)',
        'champagne-glow': '0 0 25px rgba(232, 220, 197, 0.25)',
        'silver-card': '0 10px 40px -10px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(192, 192, 192, 0.25)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
