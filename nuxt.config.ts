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
    '@formkit/auto-animate/nuxt',
    'nuxt-lodash'
  ],
  runtimeConfig: {
    public: {
      auth_client_id: '',
      auth_tenant_id: '',
      auth_issuer: ''
    }
  },
  typescript: {
    shim: false
  },
  ui: {
    icons: ['pixelarticons', 'bxl', 'file-icons']
  },
  auth: {
    provider: {
      type: 'authjs',
      defaultProvider: 'fusionauth',
      addDefaultCallbackUrl: true
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 10000
    },
    globalAppMiddleware: {
      // We disable the default global app middleware, as we use our own custom implemtation
      isEnabled: false
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
