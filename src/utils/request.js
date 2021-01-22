import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { logout } from '@/api/sys/user'
import { getToken, getUserName, getUserId } from '@/utils/auth'
import defaultSettings from '@/settings'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
})

// request interceptor
// 设置请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // const token = Cookies.get('token')
    const userName = getUserName()
    const userId = getUserId()

    userId && (config.headers.userId = userId)
    userName && (config.headers.userName = encodeURIComponent(userName))
    config.headers.systemName = `${defaultSettings.systemName}`
    /* 判断请求时是否拿到了token，如果拿到token后，给请求头加上token
       如果没有token且当前的路由不是登录路由，认为不合法，就做登出操作 */
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      /* config.headers['X-Token'] = getToken()*/
      config.headers.token = getToken()
    } else if (router.history.current.path !== '/login') {
      logout()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 设置响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    /* const res = response.data
    return res*/
    /* 先判断响应的状态是否为200，满足条件后判断响应回来的code是否为200
        如果不是code不是200，弹出错误信息，再判断当前路径，如果不是登录且返回的code是401，就执行登出操作 */
    if (response.status === 200) {
      if (response.data.code !== 200) {
        Message.error(response.data.msg)
        const path = router.history.current.path
        if (response.data.code === 401 && path !== '/login') {
          logout()
        }
      }
      return response.data
    }

    // if the custom code is not 20000, it is judged as an error.
    /* if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }*/
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
