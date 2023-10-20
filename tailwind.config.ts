import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      "synthwave",
      {
        mytheme: {

          "primary": "#e59840",

          "secondary": "#7fffdd",

          "accent": "#ffc4ca",

          "neutral": "#302032",

          "base-100": "#432b45",

          "info": "#4e73d0",

          "success": "#0f664c",

          "warning": "#f7b022",

          "error": "#e8214c",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
export default config
