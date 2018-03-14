'use strict'
const path = require('path');
const webpack = require('webpack');
const config = require('./config')
const CleanCSSPlugin = require("less-plugin-clean-css")
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

 module.exports = {
     entry: './src/js/app.js',
     output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
     },
     resolve: {
        extensions: ['.js', '.json'],
        alias: {
          '@': resolve('src/js'),
        }
      },
     module: {
         
         rules: [
          {
            test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader", options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }]
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true, } },
              'postcss-loader'
            ]
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src/js'), resolve('test')]
          },
          {
            test: /\.worker\.js$/,
            loader: 'worker-loader',
            include: [resolve('src/js'), resolve('test')]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('fonts/[name].[hash:7].[ext]')
            }
          },
        ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };