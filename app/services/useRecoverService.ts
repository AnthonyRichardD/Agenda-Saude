import { useApiFetch } from '~/composables/useApiFetch'

export const useRecoverService = () => {
  const requestRecoverEmail = (email: string) => {
    return useApiFetch<any>('email/recover-patient', {
      method: 'POST',
      body: { email },
    })
  }

  const verifyCode = (code: { code: string }) => {
    return useApiFetch<any>('email/verify-code', {
      method: 'POST',
      body: code,
    })
  }

  const resetPassword = (data: { new_password: string }, token: string) => {
    return useApiFetch<any>('email/reset-patient', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return {
    requestRecoverEmail,
    verifyCode,
    resetPassword,
  }
}
