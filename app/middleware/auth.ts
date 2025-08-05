import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware [auth] está sendo executado!');

  const token = useCookie('token');
  const isAuthenticated = !!token.value;

  if (!isAuthenticated) {
    if (to.path !== '/login') {
      console.log('Acesso bloqueado. Redirecionando para /login');
      return navigateTo('/login', { replace: true });
    }
  }
})