import Layout from '@/layout'

export function addDynamicMenuRoutes(menuList = []) {
  var routes = []
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    var route = {}
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = menuList[i].children
      const child = addDynamicMenuRoutes(temp)
      route = {
        path: menuList[i].url,
        component: Layout,
        redirect: '',
        name: menuList[i].name,
        meta: {
          title: menuList[i].name,
          index: menuList[i].id,
          icon: '',
        },
        children: child,
      }
    } else {
      const url = menuList[i].url
      route = {
        path: menuList[i].url.replace(/^\//, ''),
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id,
          title: menuList[i].name,
        },
        component: resolve => require([ `@/views${url}`, ], resolve),
      }
    }
    if (JSON.stringify(routes).indexOf(JSON.stringify(route)) === -1) {
      routes.push(route)
    }
  }
  return routes
}
