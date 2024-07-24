import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

const purgecssConfig = purgecss({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    ...(process.env.NODE_ENV === 'production' ? [purgecssConfig] : [])
  ],
};
