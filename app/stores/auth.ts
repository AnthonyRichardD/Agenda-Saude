export interface IAuthUser {
  id: number
  full_name: string
  email: string
  cpf: string
}
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = () => !!useCookie('auth_token').value

  const getUser = () => useCookie<IAuthUser>('user').value

  const logout = () => {
    useCookie('auth_token').value = null
    useCookie('user').value = null
    navigateTo('/login')
  }

  return { isAuthenticated, getUser, logout }
})
