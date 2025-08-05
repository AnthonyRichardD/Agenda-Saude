// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@vite-pwa/nuxt', '@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  pwa: {
    /* PWA options */
  },
  devtools: { enabled: true },
})
