// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],
  typescript: {
    shim: false
  },
  ui: {
    icons: ['pixelarticons']
  },
  googleFonts: {
    families: {
      'Pixelify Sans': true,
      Inter: true
    }
  }
})
