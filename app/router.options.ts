import type { RouterConfig } from '@nuxt/schema'

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/Home.vue'),
     meta: {
        middleware: 'auth'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/Login.vue'),
   
    }
  ],
} satisfies RouterConfig