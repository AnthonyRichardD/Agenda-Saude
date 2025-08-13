import { defineNuxtRouteMiddleware, navigateTo, useCookie } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token')
  const isAuthenticated = !!token.value

  if (!isAuthenticated) {
    if (to.path !== '/login') {
      return navigateTo('/login', { replace: true })
    }
  }
})
