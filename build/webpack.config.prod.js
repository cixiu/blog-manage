const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.config.base')
const config = require('../config')

const resolve = dir => path.join(__dirname, '..', dir)

const prodConfig = webpackMerge(baseConfig, {
  devtool: config.build.devtool,
  // 入口文件
  entry: {
    app: ['babel-polyfill', resolve('view/index.tsx')]
  },
  output: {
    filename: 'static/js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      // 针对antd样式 专门配置css-loader
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9' // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
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
      tslint: resolve('tslint.json')
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

module.exports = prodConfig
