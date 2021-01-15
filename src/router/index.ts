import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Encrypt from '../views/Encrypt.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/encrypt' },
  {
    path: '/encrypt',
    name: 'Encrypt',
    component: Encrypt
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
