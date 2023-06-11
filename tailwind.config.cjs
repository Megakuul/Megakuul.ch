module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      'custom': ['ubuntu-mono', 'Ubuntu', 'sans-serif'],
    },
  },
  daisyui: {
    themes: ["dark"]
  },
  plugins: [
    require('daisyui'),
  ]
};

