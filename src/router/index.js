import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Verification from '../views/Verification.vue'
import Success from '../views/Success.vue'

Vue.use(VueRouter)

const routeGuard = (to, from, next) => {
  const tokenData = JSON.parse(localStorage.getItem('tokenData'))
  if (tokenData) {
    next()
  } else {
    next({path:'login'})
  }
}

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/verification',
    name: 'verification',
    component: Verification,
    beforeEnter: routeGuard
  },
  {
    path: '/success',
    name: 'success',
    component: Success,
    beforeEnter: routeGuard
  },
  {
    path: '**',
    redirect: { name: 'login' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
