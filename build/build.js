'use strict'
/**
 * build.js构建环境下的配置，执行 npm run build的时候首先是builde/build.js文件，build.js主要完成已下几件事。
 * 1、进行node和npm的版本检查
 * 2、打包时生产loading动画
 * 3、删除目标文件夹
 * 4、输出打包信息
 */
// 进行npm和node版本检查
require('./check-versions')()
// 当前node的环境变量设置为生产环境
process.env.NODE_ENV = 'production'
// 执行npm run build显示的进度条
const ora = require('ora')
// 用于删除文件或者文件夹的插件
const rm = require('rimraf')
// node.js文件路径，用来处理文件当中的路径文件
const path = require('path')
// chalk插件，它的作用时在命令行改变不同颜色的字体
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
// 填写打包时所显示的信息
const spinner = ora('building for production...')
spinner.start() // 开启loading动画
// 将文件目录拼接起来，默认是/dist/static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')
// process.stdout.write这一串是控制打包后详细文件的输出情况
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
// 打包失败，显示错误信息，并退出程序
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
