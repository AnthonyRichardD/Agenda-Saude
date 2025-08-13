export function useApiFetch<T>(url, options = {}) {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const defaults = {
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const token = useCookie('auth_token')

      if (token.value) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
      }
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(url, params)
}
