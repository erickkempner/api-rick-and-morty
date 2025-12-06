// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-12',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  ssr: false,
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ]
})
