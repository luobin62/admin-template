import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  menuRouteLoaded: false,
  newRoute: [],
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  menuRouteLoadedChange: (state, newValue) => {
    state.menuRouteLoaded = newValue
  },
  getRoutes: (state, newData) => {
    state.newRoute = newData
  },
  // 改变菜单和路由的加载状态
}

const actions = {
  toggleSideBar({ commit, }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit, }, { withoutAnimation, }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit, }, device) {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
