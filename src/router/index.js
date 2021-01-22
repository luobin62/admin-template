import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 设置常规路由，动态路由是由接口去操作并配置
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [ {
      path: 'home',
      name: '首页',
      component: () => import('@/views/Intro/index'),
      meta: { title: '首页', icon: 'home', },
    }, ],
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },

  /* {
    path: '/example',
    component: Layout,
    redirect: '/example/overview',
    name: '芯片监控',
    meta: { title: '芯片监控', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'overview',
        name: '芯片图谱',
        component: () => import('@/views/overview/index'),
        meta: { title: '芯片图谱', icon: 'overview' }
      },
      {
        path: 'chip-altas',
        name: '芯片总表',
        component: () => import('@/views/chip-altas/index'),
        meta: { title: '芯片总表', icon: 'chip-altas' }
      }
    ]
  },*/

  /* {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form', },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1', },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2', },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1', },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2', },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3', },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2', },
      },
    ],
  },*/

  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },*/

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/* export const asyncRoutes = [
  /!* {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/overview/index'),
      name: 'Icons',
      meta: {
        title: 'icons',
        icon: 'icon',
        noCache: true
      }
    }]
  },*!/
  /!* {
    path: '/form',
    component: () => import('@/views/form/index'),
    name: 'Permission',
    meta: {
      title: '',
      icon: '',
      index: '11'
    }
  },
  {
    path: '/Intro',
    component: () => import('@/views/Intro/index'),
    name: 'Role',
    meta: {
      title: '',
      icon: 'r',
      index: '111'
    }
  }*!/
  /!* {
    path: '*',
    redirect: '/404',
    hidden: true
  }*!/

]*/

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0, }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router