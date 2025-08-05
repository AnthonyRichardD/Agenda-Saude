import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

function isAuthenticated(): boolean {
  const token = useCookie('auth_token'); // Exemplo
  
  console.log('Verificando autenticação...');
  console.log('Valor do cookie/token:', token.value);
  const resultado = !!token.value; // Calcula o resultado
  console.log('Resultado da verificação (isAuthenticated):', resultado);
  return resultado;
}

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`Navegando de '${from.path}' para '${to.path}'`);

  const rotasPublicas = ['/login', '/cadastro', '/recuperar-senha'];

  if (rotasPublicas.includes(to.path)) {
    console.log(`Rota '${to.path}' é pública. Acesso permitido.`);
    return;
  }

  if (!isAuthenticated()) {
    console.log('Usuário NÃO autenticado. Redirecionando para /login...');
    return navigateTo('/login', { replace: true });
  }

  console.log('Usuário autenticado. Acesso permitido.');
});