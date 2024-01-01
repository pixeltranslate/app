import { vue3Debounce } from 'vue-debounce'

export default defineNuxtPlugin((app) => {
  app.vueApp.directive('debounce', vue3Debounce({ lock: true }))
})
