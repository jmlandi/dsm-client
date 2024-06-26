import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/aulas',
      name: 'aulas',
      component: () => import('../views/AulasView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import ('../views/PedidosView.vue')
    },
    {
      path: '/checkout/sucesso',
      name: 'checkout-sucesso',
      component: () => import ('../views/CheckoutSuccessView.vue')
    },
    {
      path: '/checkout/erro',
      name: 'checkout-erro',
      component: () => import ('../views/CheckoutErrorView.vue')
    }
  ]
})

export default router
