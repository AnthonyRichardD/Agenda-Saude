export const useAuthStore = defineStore('auth', () => {
  interface IUser {
    id: number
    full_name: string
    email: string
  }

  const isAuthenticated = () => !!useCookie('auth_token').value

  const getUser = () => useCookie<IUser>('user').value

  return { isAuthenticated, getUser }
})
