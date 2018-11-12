/**
 * @author：zhao.jian
 * @email:zhaoj2016@qq.com
 * @github:https://github.com/zhaojianMaster/
 * @description:程序入口文件
 * @data:2018/11/9 19点58分
 */
// 导入vue框架
import Vue from 'vue'
// 导入主视图
import App from './App'
// 导入路由管理
import router from './router'
// 导入状态管理
import store from './store'
// 导入mint-ui框架
import MintUI from 'mint-ui'
// 导入请求资源
import axios from 'axios'
// 导入样式
import 'mint-ui/lib/style.css'
import './assets/css/neat-min.css'
import './assets/css/style.css'
// 使用mint-ui
Vue.use(MintUI)

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注入到根组件
  render: h => h(App)
})
