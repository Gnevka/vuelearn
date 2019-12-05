import Http from '../utils/http'

const state = {
    message: null,
    isAuthenticated: null,
    user: {},
}

const getters = {
    message: state => state.message,
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
}

const actions = {
    auth: ({commit, dispatch}, LoginForm ) => {
      return new Promise((resolve) => {
        Http.post('http://185.87.193.167/index.php/auth', LoginForm)
          .then(resp => {
            commit('setMessage', null)
            commit('setIsAuthenticated', true)
            dispatch('check')
            resolve(resp)
          })
          .catch(() => {
              commit('setMessage', "Неверный логин и пароль")
              commit('setIsAuthenticated', false)
          })
      })
    },
    check: ({commit}) => {
        return new Promise((resolve, reject) => {
          Http.get('http://185.87.193.167/index.php/' + 'auth/check')
            .then(resp => {
              commit('setIsAuthenticated', true)
              commit('setUser', resp.data)
              resolve(resp)
            })
            .catch(err => {
              if (err.response) {
                commit('setIsAuthenticated', false)
                reject('error')
              }
            })
        })
    },
    logout: ({commit, dispatch}) => {
        return new Promise((resolve) => {
          Http.get('http://185.87.193.167/index.php/' + 'logout', {withCredentials: true})
            .then(resp => {
                commit('setIsAuthenticated', false)
                dispatch('check')
                resolve(resp)
            })
        })
      },
  }


const mutations = {
    setMessage: (state, message) => {
        state.message = message
    },
    setIsAuthenticated: (state, isAuthenticated) => {
        state.isAuthenticated = isAuthenticated 
    },
    setUser: (state, user) => {
      state.user = user
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}