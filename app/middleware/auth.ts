import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Log para sabermos que o middleware foi acionado
  console.log('Middleware [auth] está sendo executado!');

  // --- Sua lógica de verificação ---
  const token = useCookie('token'); // Mude para o nome do seu cookie
  const isAuthenticated = !!token.value;
  // --------------------------------

  // Se o usuário NÃO estiver autenticado...
  if (!isAuthenticated) {
    // ...e não estiver tentando acessar a página de login...
    if (to.path !== '/login') {
      console.log('Acesso bloqueado. Redirecionando para /login');
      // ...redireciona para o login.
      return navigateTo('/login', { replace: true });
    }
  }
})