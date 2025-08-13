export const useAuthStore = defineStore('auth', () => {
  interface IUser {
    id: number
    full_name: string
    email: string
    cpf: string
  }

  const isAuthenticated = () => !!useCookie('auth_token').value

  const getUser = () => useCookie<IUser>('user').value

  const logout = () => {
    useCookie('auth_token').value = null
    useCookie('user').value = null
    navigateTo('/login')
  }

  return { isAuthenticated, getUser, logout }
})
