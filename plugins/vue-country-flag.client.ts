import CountryFlag from 'vue-country-flag-next'

export default defineNuxtPlugin((app) => {
  app.vueApp.component('CountryFlag', CountryFlag)
})
