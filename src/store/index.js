import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
})

export default store
