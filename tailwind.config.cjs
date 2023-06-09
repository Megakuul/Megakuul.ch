module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ["dark"]
  },
  plugins: [
    require('daisyui'),
  ]
};

