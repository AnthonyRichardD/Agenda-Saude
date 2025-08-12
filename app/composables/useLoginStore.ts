import { useApiFetch } from '~/composables/useApiFetch'
interface LoginResponse {
  is_error: boolean
  message: string
  data: {
    user: {
      id: number
      name: string
      email: string
    }
    token: string
  }
}
export const useLoginStore = () => {
  const login = (data: { email: string; password: string }) => {
    return useApiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: data,
    })
  }

  return {
    login,
  }
}
