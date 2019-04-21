const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack: (config, {dev}) => {
    // config.plugins = config.plugins.filter((plugin) => (plugin.constructor.name !== 'UglifyJsPlugin'))

    config.optimization.minimize[
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]

    return config
  }
}))

//target: 'serverless',
