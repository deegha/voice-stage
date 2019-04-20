const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
}))

//target: 'serverless',


