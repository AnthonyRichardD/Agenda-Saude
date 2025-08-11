import { useApiFetch } from '~/composables/useApiFetch'
interface LoginResponse {
  is_error: boolean
  message: string
  user: {
    id: number
    name: string
    email: string
  }
  token: string
}

export const useLoginStore = () => {
  const login = (credentials: { email: string; password: string }) => {
    return useApiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  return {
    login,
  }
}
