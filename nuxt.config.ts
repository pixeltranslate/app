// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  colorMode: {
    preference: 'dark'
  },
  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@formkit/auto-animate/nuxt'
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
