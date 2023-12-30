// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,
  colorMode: {
    preference: 'system'
  },
  build: {
    transpile: ['trpc-nuxt']
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
    icons: ['pixelarticons', 'bxl', 'file-icons']
  },
  auth: {
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 10000
    },
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: false
    }
  },
  googleFonts: {
    families: {
      'Pixelify Sans': true,
      Inter: true
    }
  },
  app: {
    head: {
      title: 'PixelTranslate'
    }
  }
})
