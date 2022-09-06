import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import(/*webpackChunkName:"itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/*webpackChunkName:"search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName:"login" */ '../views/Login.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login')
      }
    },
    component: () => import(/*webpackChunkName:"userInfo" */ '../views/UserInfo.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{
  if (to.path=='/login'||to.path=='/search') {
    store.state.isFooterShow=false
  }else{
    store.state.isFooterShow=true
  }
})





export default router
