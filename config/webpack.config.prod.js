const webpackMerge = require('webpack-merge');
const ngw = require('@ngtools/webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./webpack.config.common');
const path = require('path');
const rootPath = path.resolve(__dirname, '..');

module.exports = webpackMerge(commonConfig, {
  output: {
    publicPath: '/',
    filename: '[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  plugins: [
    new ngw.AngularCompilerPlugin({
      tsConfigPath: path.resolve(rootPath, 'tsconfig.aot.json'),
      entryModule: path.resolve(rootPath, 'src', 'app', 'app.module#AppModule')
    })
  ]
});
