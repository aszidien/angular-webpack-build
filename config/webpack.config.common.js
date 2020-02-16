const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV !== 'production';

const path = require('path');
const rootPath = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    main: isDev ? './src/main.ts' : './src/main.aot.ts'
  },
  output: {
    path: path.resolve(rootPath, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        options: {
          cache: false,
          fix: false,
          emitWarning: true,
          emitError: true,
          failOnWarning: true,
          failOnError: true
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        // TODO temporarily bug fix - System.import() is deprecated and will be removed soon
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },  // enable SystemJS
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // TODO temporarily bug fix - Critical dependency: the request of a dependency is an expression
    new webpack.ContextReplacementPlugin(
      /[\/\\]@angular[\/\\]core[\/\\]fesm5/,
      path.resolve(rootPath, 'src'),
      {}
    )
  ]
};
