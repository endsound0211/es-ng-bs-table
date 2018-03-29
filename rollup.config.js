import angularInline from 'rollup-plugin-angular-inline';

export default {
  input: './src/index.js',
  output: {
	  file: './dist/bundles/es-ng-bs-table.js',
	  format: 'umd',
	  name: 'NgTable',
	  sourceMap: false
  },
  plugins: [
    angularInline({ include: './src/**/*.component.js' })
  ]
}