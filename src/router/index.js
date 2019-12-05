import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import Login from '../components/login'
import Logout from '../components/logout'
import Users from '../components/users'
import Profile from '../components/users/profile'
import ChangePassword from '../components/users/changePassword'
import Rights from '../components/rights'
import RightUser from '../components/users/right'
import Registration from '../components/registration'
import Restore from '../components/restore'
import Activate from '../components/activate'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated !== true) {
    next()
    return
  }
  next('/login')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated === true) {
    next()
    return
  }
}


const check = (to, from, next) => {
  store.dispatch('auth/check')
  .then(() => {
    next()
  })
  .catch(error => {
    console.log('error: ', error)
    next('/login')
  })
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: check, ifNotAuthenticated,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/profile/:id',
      name: 'cliencardProfile',
      component: Profile,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePassword,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/rights',
      name: 'rights',
      component: Rights,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/rightsUser/:id',
      name: 'rightsUser',
      component: RightUser,
      beforeEnter: check, ifAuthenticated,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/restore',
      name: 'restore',
      component: Restore,
    },
    {
      path: '/activate/:key',
      name: 'activate',
      component: Activate,
    },
  ],
})
