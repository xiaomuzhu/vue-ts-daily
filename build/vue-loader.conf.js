var utils = require('./utils')
var config = require('../config')
// var isProduction = process.env.NODE_ENV === 'production'
// for mp
var isProduction = true

module.exports = {
  loaders: Object.assign(utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }), {
    ts: [
      'babel-loader',
      {
        loader: 'awesome-typescript-loader',
        options: {
          // errorsAsWarnings: true,
          useCache: true,
        }
      },
      // // *.vue文件直接写ts，使用的时候，注释掉上面的awesome-typescript-loader
      // {
      //   loader: 'ts-loader',
      //   options: {
      //     // errorsAsWarnings: true,
      //     appendTsSuffixTo: [/\.vue$/],
      //   }
      // },
    ]
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  fileExt: config.build.fileExt
}
