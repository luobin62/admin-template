import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getMenu } from '@/api/sys/user'
// import { asyncRoutes } from '@/router'
import { addDynamicMenuRoutes } from '@/utils/util'
import Layout from '@/layout'

// import el from 'element-ui/src/locale/lang/el'

NProgress.configure({ showSpinner: false, }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
// 设置前置路由
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 开始进度条
  NProgress.start()

  // set page title
  // 获取页面的标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 获取到token
  const hasToken = getToken()

  /* if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }*/
  /* 此处的逻辑：
         1.判断当前路径是否为登录路径：
              是登陆路径且有token，跳转到：{ path: '/' }
              是登陆路径但没有token，不做处理
              不是登录路由，且没有token，就返回到登录页面
              不是登录路由，且有token，去加载动态路由
         */
  if (to.path === '/login') {
    if (hasToken) {
      next({ path: '/', })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (!hasToken) {
      next({ path: '/login', })
    } else {
      try {
        // get user info
        // await store.dispatch('user/getInfo')
        /* 2.在加载动态路由前，先判断是否已经加载了动态路由，加载了就不做处理*/
        if (store.state.app.menuRouteLoaded) {
          console.log('动态菜单和路由已经存在.')
          next()
          return
        }
        /* 3.调取接口，获取菜单栏相关的数据的数据*/
        getMenu().then(res => {
          /* 4.此处的addDynamicMenuRoutes就是对请求到的数据进行路优化的设置，得到的dynamicRoutes即为常用的route中的子路由*/
          const dynamicRoutes = addDynamicMenuRoutes(res.data)
          /* console.log(typeof (asyncRoutes))
          console.log(dynamicRoutes)
          dynamicRoutes.forEach(item => {
            if (!asyncRoutes.includes(item)) {
              asyncRoutes.push(item)
              console.log(asyncRoutes)
            }
          })*/
          /* 5.需要注意：动态加载路由，对于404界面，一定要放在最后进行添加，不然会出现页面为空的现象*/
          dynamicRoutes.push({
            path: '*',
            redirect: '/404',
          })
          /* 6.把这个动态路由初始化成，我们常用的路由route，此处的layout就是页面的整体*/
          const wholeRoutes = {
            path: '/',
            component: Layout,
            children: dynamicRoutes,
          }
          /* 7.再把这个完整的动态路由route添加到router里*/
          router.addRoutes([ wholeRoutes, ])
          /* 8.将是否加载完路由的状态进行改变，置为true*/
          store.commit('app/menuRouteLoadedChange', true)
          /* 9.把这个动态路由的数据进行更新，到时候在相关组件里引用这个动态路由，然后展示到页面上*/
          store.commit('app/getRoutes', dynamicRoutes)
          // next()
          /* 10.此处注意，不能使用next（）不然会进入死循环*/
          next({ ...to, replace: true, })
        })
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login`)
        NProgress.done()
      }
    }
  }
})
// 设置后置路由
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
/*  if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the Intro page
        next({ path: '/' })
        NProgress.done()
      } else {
        const hasGetUserInfo = store.getters.name
        if (hasGetUserInfo) {
          next()
        } else {
          try {
            // get user info
            // await store.dispatch('user/getInfo')
            if (store.state.app.menuRouteLoaded) {
              console.log('动态菜单和路由已经存在.')
              next()
              return
            }
            console.log(store.state.app.menuRouteLoaded)
            // console.log(store.state.app.menuRouteLoaded)
            getMenu().then(res => {
              console.log(res)
              const dynamicRoutes = addDynamicMenuRoutes(res.data)
              dynamicRoutes.forEach(item => {
                if (!asyncRoutes.includes(item)) {
                  asyncRoutes.push(item)
                  console.log(asyncRoutes)
                }
              })
              asyncRoutes.push({
                path: '*',
                redirect: '/404'
              })
              const wholeRoutes = {
                path: '/',
                component: Layout,
                children: asyncRoutes
              }
              router.addRoutes([wholeRoutes])
              store.commit('app/menuRouteLoadedChange', true)
              store.commit('app/getRoutes', asyncRoutes)
              // next()
              next({ ...to, replace: true })
            })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      // has no token

      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })*/

