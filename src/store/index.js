import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import auth from './auth'
import navigation from './navigation'
import stop from './stop'
import sav from './sav'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    stop,
    auth,
    sav,
    navigation
  },
  strict: debug,
})
