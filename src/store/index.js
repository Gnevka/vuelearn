import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import auth from './auth'
import navigation from './navigation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    auth,
    navigation
  },
  strict: debug,
})
