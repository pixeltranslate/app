import { vueDebounce } from 'vue-debounce'

export default defineNuxtPlugin((app) => {
  app.vueApp.directive('debounce', vueDebounce({ lock: true }))
})
