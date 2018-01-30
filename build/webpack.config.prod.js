const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const config = require('./config')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = webpackMerge(baseConfig, {
  devtool: config.build.devtool,
  // 入口文件
  entry: {
    app: resolve('src/client-entry.js')
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    // 在编译时定义全局常量，开发环境下process.env.NODE_ENV = 'development'
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false
      },
      mangle: {
        safari10: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: config.build.productionSourceMap
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 消除weback运行打包时，vendor的hash的变化
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    // 以一个单独的进程来运行ts类型检查和lint来加快编译速度，配合ts-loader使用
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: resolve('view'),
      tsconfig: resolve('tsconfig.json'),
      tslint: resolve('tslint.json'),
    })
  ],
  // 某些第三方库使用了node原生的变量或者模块，但是在浏览器中并不会使用他们
  // 所以给这些变量或者模块提供一个空的对象，来让这些库正常运行
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
})
