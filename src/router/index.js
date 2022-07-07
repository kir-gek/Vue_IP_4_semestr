import Vue from 'vue'
import VueRouter from 'vue-router'
import Teams from '../views/Teams.vue'
import Games from '../views/Games.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
