/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mlks-indigo': '#30359B',
        'mlks-deep-indigo': '#171B55',
        'mlks-orange': '#FF7A1A',
        'mlks-orange-dark': '#E65F00',
        'mlks-ink': '#161A24',
        'mlks-slate': '#657083',
        'mlks-ice': '#F3F6FA',
        'mlks-cyan': '#39BFEF',
        'mlks-success': '#0E9F6E',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

