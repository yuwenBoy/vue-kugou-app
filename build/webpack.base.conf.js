'use strict'
/**
 * webpack.base.conf.js 文件主要作用（开发和生产环境的公共配置）；
 * webpack.base.conf.js主要完成了下面这些事情：
 * 1、配置webpack编译入口；2、配置webpack输出路径和命名规则
 * 3、配置模块resolve规则；4、配置不同类型模块的处理规则
 */
// node.js的文件路径，用来处理文件中的路径问题
const path = require('path')
// 引入utils模块
const utils = require('./utils')
// 引入config文件，默认是index模块
const config = require('../config')
// vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css,less,sass之类的和样式有关的loader
const vueLoaderConfig = require('./vue-loader.conf')

// 此函数用来返回当前目录的平行目录的路径，因为有个'..'
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'), // 基础目录（绝对路径），用于从配置中解析入口点和加载程序
  entry: {
    app: './src/main.js' // 定义入口文件
  },
  output: {
    path: config.build.assetsRoot, // 打包生成的出口文件所放的位置
    filename: '[name].js', // 打包生成app.js文件
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath // 项目上线地址，也就是真正的文件引用路径，如果是production生产环境；
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],// 省略扩展名，比方说，impor index from '../js/index'会默认去找index文件，然后找index.js,index.vue,index.json文件
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), // 使用别名 使用上面的resolve函数，意思就是用@代替src的绝对路径
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 不同文件模块使用不同的loader
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
  // 这些选项可以配置是否polyfill 或mock 某些node.js全局变量和模块。这可以使最初为 node.js环境编写的代码，在其他环境（如浏览器）中运行。
}
