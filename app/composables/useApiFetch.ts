export function useApiFetch<T>(url, options = {}) {
  const config = useRuntimeConfig()

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
        console.log('Lógica para lidar com token expirado...')
      }
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(url, params)
}
