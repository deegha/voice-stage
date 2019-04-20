const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

const webpack = require('webpack')

module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = [new TerserPlugin({
        parallel: true,
        sourceMap: true
      })]
    }
    return config
  }
}))

//target: 'serverless',