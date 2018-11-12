'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
/**
 * index.js文件，保存着开发环境和生产环境所需要的信息。
 */
const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    // Paths
    assetsSubDirectory: 'static', // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsPublicPath: '/', // 发布路径，如果构建后的产品文件有用于cnd或者放到其它域名服务器，可以在这里设置，当然本地打包，本来浏览一般都将这里设置为"./" 设置之后的构建的产品在注入到index.html中就会带上这里的发布路径
    proxyTable: {
			'/proxy': {
				target: 'http://m.kugou.com',
				changeOrigin: true,
				pathRewrite: {
					'^/proxy': ''
				}
			},
			'/aproxy': {
				target: 'http://mobilecdn.kugou.com',
				changeOrigin: true,
				pathRewrite: {
					'^/aproxy': ''
				}
			},
			'/bproxy': {
				target: 'http://www.kugou.com',
				changeOrigin: true,
				pathRewrite: {
					'^/bproxy': ''
				}
			}
		},

    // Various Dev Server settings 这个可以被process.env.HOST重写
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // process.env.PORT重写，在端口空闲的情况下
    autoOpenBrowser: false, // 是否自动打开浏览器
    errorOverlay: true,// 当出现编译器错误或警告时，在浏览器中显示全屏叠加，覆盖到浏览器的项目页面的上方。
    notifyOnErrors: true,// 是否允许窗口弹出错误信息
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-  webpck使用文件系统获取文件改动的通知

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true, // 如果使用eslint，您的代码将在捆绑和连接错误和警告将在控制台中显示
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,// 如果使用eslint，违反eslint规则的错误和警告也将被显示在浏览器的透明黑色层上面

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', // 开启调试的类型

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true, // 是否通过将哈希查询附加到文件名来生成具有缓存清除的源映射

    cssSourceMap: true // 开发环境下，显示cssSourceMap
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // 获取绝对路径，index.html的模板文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), // 获取dist文件夹的绝对路径
    assetsSubDirectory: 'static', // 二级目录
    assetsPublicPath: './', // 发布路径，如果构建后的产品文件有用于cnd或者放到其它域名服务器，可以在这里设置，当然本地打包，本地浏览一般都将这里设置为"./"
    // 设置之后的构建的产品在注入到index.html中就会带上这里的发布路径
    /**
     * Source Maps
     */

    productionSourceMap: true, // 生产环境下生成souceMap文件
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map', // 开启调试的类型

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'], // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report // 是否展开webpack构建打包之后的分析报告
  }
}
