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
import Home from '../components/learn/game/home'
import unk from '../components/learn/unk'
import forms from '../components/learn/forms'
import trans from '../components/learn/trans'
import vx from '../components/learn/vuex/vx'
import inc from '../components/learn/axios/inc'
import Welcome from '../components/learn/axios/comp/welcome'
import DashboardPage from '../components//learn/axios/comp/dashboard'
import SignupPage from '../components//learn/axios/comp/signup'
import SigninPage from '../components/learn/axios/comp/signin'


Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.state.auth.isAuthenticated !== true) {
    next()
    return
  }
  next('/') 
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
    next('/')
  })
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/welcome', component: Welcome },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/dashboard', component: DashboardPage },

    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/22',
      name: 'inc',
      component: inc,
    },
    {
      path: '/263',
      name: 'vx',
      component: vx,
    },
    {
      path: '/191',
      name: 'trans',
      component: trans,
    },
    {
      path: '/150',
      name: 'forms',
      component: forms,
    },
    {
      path: '/8',
      name: 'unk',
      component: unk,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
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
