import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { QueryClient, VueQueryPlugin, QueryCache, dehydrate, hydrate } from '@tanstack/vue-query'
import { useState } from '#app'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const errorNotification = (error: Error) => {
    const { status } = useAuth()

    /*
    const toast = useToast()

    if (status.value !== 'authenticated') {
      toast.add({
        title: 'Please login first'
      })
      return
    }

    toast.add({
      title: 'There was an issue, please check the server console'
    })
    */
    console.error(error)
  }

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
    queryCache: new QueryCache({
      onError: error => errorNotification(error)
    })
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
