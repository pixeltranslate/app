// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@nuxt/ui',
    '@nuxt/image'
  ],
  typescript: {
    shim: false
  },
  ui: {
    icons: ['pixelarticons']
  }
})
