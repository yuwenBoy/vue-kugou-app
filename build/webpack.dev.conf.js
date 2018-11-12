// 'use strict'
// /**
//  * 该webpack.dev.conf.js文件主要用来开发环境配置：
//  * 主要作用：1、引入相关插件和配置；2、生成处理各种样式的规则；3、配置开发环境，
//  * 如热更新、监听端口号，是否自动打开浏览器等都在webpack中的devServer中配置完成；
//  * 4、寻找可利用的端口和添加显示程序编译运行时的错误信息。
//  */

// // utils提供工具函数，包括生成处理各种样式言语的loader，获取资源文件存放路径的工具函数。
// const utils = require('./utils')

// // 引入webpack模块
// const webpack = require('webpack')

// // 引入config文件夹，默认为index模块
// const config = require('../config')

// // 将基础配置和开发环境配置或者生产环境配置合并在一起的包管理
// const merge = require('webpack-merge')
// const path = require('path')

// // 引入基本webpack基本配置
// const baseWebpackConfig = require('./webpack.base.conf')

// const CopyWebpackPlugin = require('copy-webpack-plugin')

// // 文件名及时更新，自动打包并且生成相应的文件在index.html
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// // 可识别某些类型的webpack错误并清理，汇总和优先化它们以提供更好的开发者体验
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// // 查看困闲端口位置，默认情况下搜索8000这个端口
// const portfinder = require('portfinder')

// // process为node的一个全局对象获取当前程序的环境变量，即host
// const HOST = process.env.HOST
// const PORT = process.env.PORT && Number(process.env.PORT)
// console.log('config.dev.env.NODE_ENV:'+HOST)
// const devWebpackConfig = merge(baseWebpackConfig, {
//   module: {
//     // 自动生成了css，postcss，aess等规则，并进行模块转换，转换为webpack可识别的文件，进行解析转换
//     rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
//   },
//   // 增加调试信息
//   devtool: config.dev.devtool,

//   // these devServer options should be customized in /config/index.js
//   devServer: {
//     clientLogLevel: 'warning',
//     historyApiFallback: { // 当使用HTML5 History API时，任意的404 响应都可能需要被替换为 index.html。
//       rewrites: [
//         { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
//       ],
//     },
//     hot: true, // 启动热模块更新特征
//     contentBase: false, // since we use CopyWebpackPlugin.告诉服务器从哪里提取内容，一般是本地静态资源。
//     compress: true, // 一切服务器是否都启用gzip压缩
//     host: HOST || config.dev.host, // 指定一个host，默认是localhost。如果有全局host就用全局，否则就用index.js中的设置。
//     port: PORT || config.dev.port, // 指定端口
//     open: config.dev.autoOpenBrowser, //  是否在浏览器开启本地 dev server
//     overlay: config.dev.errorOverlay // 当有编译器错误时，是否在浏览器总显示全屏覆盖。
//       ? { warnings: false, errors: true }
//       : false,
//     publicPath: config.dev.assetsPublicPath, // 此路径下的打包文件可在浏览器中访问
//     proxy: config.dev.proxyTable, // 如果你有单独的后端开发服务器api，并且希望在同域名下发送api请求，那么代理某些URL会很有用。
//     quiet: true, // necessary for FriendlyErrorsPlugin 启用quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台，这也意味着来自webpack的错误或警告在控制台不可见。
//     watchOptions: {  // webpack 使用文件系统（file system）获取文件改动的通知。在某些情况下，不会正常工资，例如，当使用Network File system （NFS）时。Vagrant 也有很多问题。在这些情况下使用轮询。
//       poll: config.dev.poll, // 是否使用轮询
//     }
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': require('../config/dev.env')
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
//     new webpack.NoEmitOnErrorsPlugin(),
//     // https://github.com/ampedandwired/html-webpack-plugin
//     new HtmlWebpackPlugin({
//       filename: 'index.html', // 生成文件的名称
//       template: 'index.html', // 可以指定模块html文件
//       inject: true // 向template中注入所有静态资源，不同的配置值注入的位置不同，等于true时，即所有JavaScript资源插入到body元素的底部
//     }),
//     // copy custom static assets
//     new CopyWebpackPlugin([
//       {
//         from: path.resolve(__dirname, '../static'),
//         to: config.dev.assetsSubDirectory,
//         ignore: ['.*']
//       }
//     ])
//   ]
// })

// // webpack 将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量。
// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port

//       // Add FriendlyErrorsPlugin
//       devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({ // 出错友好处理插件
//         compilationSuccessInfo: { // build成功的话会执行这块
//           messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//         },
//         onErrors: config.dev.notifyOnErrors // 如果出错就执行这块，在utils里面配置好的提示信息
//         ? utils.createNotifierCallback()
//         : undefined
//       }))

//       resolve(devWebpackConfig)
//     }
//   })
// })

var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

