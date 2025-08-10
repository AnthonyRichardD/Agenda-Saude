import { defineNuxtRouteMiddleware, navigateTo, useCookie } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  const isAuthenticated = !!token.value

  if (!isAuthenticated) {
    console.log('not authenticated')
    if (to.path !== '/login') {
      return navigateTo('/login', { replace: true })
    }
  }
})
