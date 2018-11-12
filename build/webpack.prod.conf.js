'use strict'
/**
 * 该文件主要作用是生成环境下配置：主要完成下面几件事情：
 * 1、合并基础的weback配置
 * 2、配置样式文件的处理规则，styleLoaders
 * 3、配置webpack的输出
 * 4、配置webpack插件
 * 5、gzip模式下的webpack插件配置
 * 6、webpack-hundle分析
 */
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 将基础配置和开发环境配置或生产环境配置合并在一起的包管理
const merge = require('webpack-merge')
// 引入基本webpack基本配置
const baseWebpackConfig = require('./webpack.base.conf')
// 在webpack中拷贝文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 文件名即使更改，自动打包并且生产响应的文件在index.html里面
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 他会将所有的入口 chunk（entry chunks）中引用的 *.css，移动到独立分离的css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 一个用来压缩优化css大小的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 一个用来压缩优化js大小的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 引入生产环境
const env = require('../config/prod.env')
// 将webpack基本配置和生产环境配置合并在一起，生产css,less,postcss等规则，并进行模块转换，转换成webpack可识别的二五年间，进行解析
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: { // 文件打包的输出路径
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 主文件入口文件名字
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 非主文件入口文件文件名，可以存放cdn的地址
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({ // 允许创建一个在编译时可以配置的全局常量。这可以会对开发模式和发布模式的构建允许不同的行为非常有用。
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file 它会将所有的入口chunk中引用的 *.css，移动到地理分离的 css文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 删除index.html中的注释
        collapseWhitespace: true, // 删除index.html中的空格
        removeAttributeQuotes: true // 删除各种html标签属性值的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' // 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入verdor.js，再注入app.js
    }),
    // keep module.id stable when vendor modules does not change 该插件会根据模块的相对路径生成一个四位数的hash作为模块id，建议用于生产环境。
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting 预编译所有模块到一个闭包中，提升你的代码再浏览器中的执行速度。
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file 将所有从node_modules中引入的js提取到verdor.js，即抽取库文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    //  把webpack的runtime和mainfest这些webpack管理所有模块交互的代码打包到[name].js文件中，防止build之后verdor的hash值被更新
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets 拷贝文件和文件夹
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
// 提供带 content-Encoding编码的压缩版的资源
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
// 分析bundle内容的插件即 LLI工具，以便捷的、交互式、可缩放的树状图形式展给用户。
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
