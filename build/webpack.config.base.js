const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')

const resolve = dir => path.join(__dirname, '..', dir)

// const HotLoader = process.env.NODE_ENV === 'production'

module.exports = {
  entry: ['babel-polyfill', resolve('view/index.tsx')],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
    alias: {
      '@': resolve('view'),
      store: resolve('view/store'),
      pages: resolve('view/pages'),
      components: resolve('view/components'),
      api: resolve('view/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [resolve('node_modules')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // ts-loader配合fork-ts-checker-webpack-plugin插件获取完全的类型检查来加快编译的速度
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css'
                  })
                ]
              })
              // compilerOptions: {
              //   module: 'es2015'
              // }
            }
          }
        ]
      },
      // antd样式不启用css-modules
      {
        test: /\.(css|scss)$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            // 使用typings-for-css-modules-loader来解决使用import './xxx.scss'找不到模块的报错问题
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              namedExport: true,
              camelCase: true,
              slient: true
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
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}
