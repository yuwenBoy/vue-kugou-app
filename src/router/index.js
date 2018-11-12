/**
 * @author：zhao.jian
 * @email:zhaoj2016@qq.com
 * @github:https://github.com/zhaojianMaster/
 * @description:路由配置
 * @data:2018/11/9 19点58分
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '../views/NewSongs',
      component: resolve => require(['../views/NewSongs'], resolve),
      alias: '/'
    },{
		path: '/rank',
		component: resolve => require(['../views/rank'], resolve)
	}, {
		path: '/plist',
		component: resolve => require(['../views/Plist'], resolve)
	}, {
		path: '/singer',
		component: resolve => require(['../views/Singer'], resolve)
	}, {
		path: '/rank/info/:id',
		component: resolve => require(['../views/RankInfo'], resolve)
  },
   {
		path: '/plist/info/:id',
		component: resolve => require(['../views/PlistInfo'], resolve)
	},
  {
   path: '/singer/list/:id',
   component: resolve => require(['../views/SingerList'], resolve)
 },{
  path: '/singer/info/:id',
  component: resolve => require(['../views/SingerInfo'], resolve)
},
{
  path: '/search',
  component: resolve => require(['../views/search'], resolve)
},{
		path: '*', redirect: '/'
  }
  ]
})
