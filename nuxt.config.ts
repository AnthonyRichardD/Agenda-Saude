// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@vite-pwa/nuxt',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@pinia/nuxt',
    'nuxt-svgo',
    'nuxt-lucide-icons',
  ],
  fonts: {
    families: [{ name: 'Inter', provider: 'google' }],
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  pwa: {
    /* PWA options */
  },
  svgo: {
    autoImportPath: './app/assets/icons/',
    componentPrefix: 'icon',
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:5001',
    },
  },
})
