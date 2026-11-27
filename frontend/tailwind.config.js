/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0F1D',      // page background (deep navy)
        surface: '#101828',  // cards
        raised: '#162136',   // hovered / inset surfaces
        line: '#223049',     // borders
        fg: '#E8ECF4',       // primary text
        muted: '#98A4BA',    // secondary text
        accent: {
          DEFAULT: '#6D9BFF',
          strong: '#4F7FF0',
          soft: '#6D9BFF1F',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 32px -16px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
