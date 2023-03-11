import { createRouter, createWebHistory } from "vue-router";
import layout from '../layout/index.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'index', path: '/', component: layout,
      children: [
        // 使用手册
        {
          path: 'HomePage',
          component: () => import('../views/HomePage.vue'),
          name: 'HomePage',
          meta: {
            title: '首页'
          }
        }
      ]
    },
    { name: 'login', path: '/login', component: () => import('../views/login/index.vue') },
    {
      name: 'watchImage', path: '/watchImage', component: layout,
      children: [
        // 使用手册
        {
          path: 'analysis',
          component: () => import('../views/analysis/index.vue'),
          name: 'analysis',
          meta: {
            title: '大炫图表'
          }
        },
         {
          path: 'works',
          component: () => import('../views/works/index.vue'),
          name: 'analysis',
          meta: {
            title: '工作中心'
          }
        },
      ]
    },
    { name: 'home', path: '/home', component: () => import('../views/HomePage.vue') },
    { name: 'test', path: '/test', component: () => import('../views/TestPage.vue') },
  ]
})
export default router