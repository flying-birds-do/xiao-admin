import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'home', path: '/', component: () => import('../views/HomePage.vue') },
    { name: 'test', path: '/test', component: () => import('../views/TestPage.vue') },
  ]
})
export default router