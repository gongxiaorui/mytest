import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/agreement',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'example' }
    }]
  },

  {
    path: '/agreement',
    component: Layout,
    redirect: '/agreement/list-agreement',
    children: [
      {
        path: 'list-agreement',
        name: 'list-agreement',
        component: () => import('@/views/list-agreement/index'),
        meta: { title: '协议列表', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/classify-manage',
  //   component: Layout,
  //   redirect: '/classify-manage/classify',
  //   children: [
  //     {
  //       path: 'classify',
  //       name: 'classify',
  //       component: () => import('@/views/classify/index'),
  //       meta: { title: '分类管理', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/agreement-manage',
  //   component: Layout,
  // 	alwaysShow: true,
  //   redirect: '/agreement-manage/add-agreement',
  //   name: 'agreement-manage',
  //   meta: { title: '协议管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'add-agreement',
  //       name: 'add-agreement',
  //       component: () => import('@/views/add-agreement/index'),
  //       meta: { title: '添加协议', icon: 'table' }
  //     }
  //   ]
  // },
  // {
  //   path: '/signature-manage',
  //   component: Layout,
  //   redirect: '/signature-manage/signature',
  //   children: [
  //     {
  //       path: 'signature',
  //       name: 'signature',
  //       component: () => import('@/views/signature/index'),
  //       meta: { title: '签章管理', icon: 'table' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true },
	
	{
	  path: '/edit',
	  component: Layout,
	  redirect: '/edit/edit-agreement',
	  children: [
			{
				path: '/edit-agreement',
				name: 'edit-agreement',
				component: () => import('@/views/edit-agreement/index'),
				meta: { title: '协议详情' }
			}
		],
		hidden: true,
	}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
