'use strict'
/**
 * utils.js 文件作用：提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数；
 * 1、计算资源文件存放路径；2、生成cssLoaders用于加载.vue文件中的样式；
 * 3、生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件；
 * 4、处理程序在编译过程中出现的错误，并在桌面进行错误信息的提示
 */
// node.js的文件路径，用来处理文件当中的路径问题
const path = require('path')
// 引入config文件夹默认为index模块
const config = require('../config')
// 提取bundle中的特定文本，将提取后的文本单独存放到另外的文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入包的json文件
const packageConfig = require('../package.json')

// 资源存放的路径，区别在于生产环境和开发环境
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path) // path.posix以posix兼容的方式交互，是跨平台的，如果是path.win32的话，只能在win上
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader', // 用来解决浏览器的前缀问题
    options: {
      sourceMap: options.sourceMap // 是否使用sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // 判断将cssLoader和postcssLoader推入loaders数组
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    //处理各种各样的loader，并且将各种各样的loader推入loaders数组当中去
    if (options.extract) { // 如果options.extact存在，则用extract-text-plugin提取样式
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders) // 无需提取样式则简单使用vue-tyle-loader配合各种样式loader去处理vue当中的<style>里面的样式
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html cssloaders将各种loader 转成对象形式以便styleLoaders进行处理
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options) // 调用cssLoaders方法

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

// 引入node-notifier模块，这个模块是用来在桌面窗口提示信息，如果想要关闭直接return掉或者在webpack.dev.config.js中关掉
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0] // 每次捕获第一个错误
    const filename = error.file && error.file.split('!').pop() // 错误文件的名称所在位置

    notifier.notify({
      title: packageConfig.name, // 错误提示项目名字
      message: severity + ': ' + error.name, // 错误提示类型
      subtitle: filename || '', // 错误提示副标题
      icon: path.join(__dirname, 'logo.png') // 错误提示图示标
    })
  }
}
