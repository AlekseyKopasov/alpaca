export default ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-sorting': {
      order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
      'properties-order': 'alphabetical',
      'unspecified-properties-position': 'bottom',
    },
    'postcss-nesting': {},
    autoprefixer: {},
    // "cssnano": ctx.env === "production" ? {} : false,
    cssnano: false,
  },
});
