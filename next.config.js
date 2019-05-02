const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin

module.exports =withImages(withCSS(withSass({
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
      }),
      new CriticalPlugin({
        src: 'index.html',
        inline: true,
        minify: true,
        dest: 'index.html'
      })
    ]

    return config
  }
})))

//target: 'serverless',
