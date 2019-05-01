import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  external: ['react', 'gatsby', 'gatsby-image', 'classnames'],
  output: {
    file: 'dist/index.min.js',
    format: 'umd',
    name: 'my-gatsby-lib',
    globals: {
      react: 'React',
      classnames: 'ClassNames',
      'gatsby-image': 'Img',
      gatsby: 'gatsby'
    }
  },
  plugins: [
    postcss({
      plugins: []
    }),
    babel({
      exclude: "node_modules/**"
    }),
  ],
}