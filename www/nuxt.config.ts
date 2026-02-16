// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  // GitHub Pages serves under /nabella-studio/
  app: {
    baseURL: '/nabella-studio/',
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxtjs/i18n'],

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
    ],
    strategy: 'prefix_except_default',
  },
})
