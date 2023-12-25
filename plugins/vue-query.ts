import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { QueryClient, VueQueryPlugin, QueryCache, dehydrate, hydrate } from '@tanstack/vue-query'
import { useState } from '#app'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const errorNotification = (error: unknown, errorKey: string) => {
    const { status } = useAuth()

    const toast = useToast()

    if (status.value !== 'authenticated') {
      toast.add({
        title: 'Please login'
      })
      return
    }

    toast.add({
      title: `${errorKey} could not be retrieved`
    })
    console.error(error)
  }

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
    queryCache: new QueryCache({
      onError: (error, query) => errorNotification(
        error,
        // `errorKey` either doesn't exist OR is a string (see `useQuery.ts`), so we can safely lie to typescript at this one point
        query.meta?.errorKey ? (query.meta.errorKey as string) : 'Unbekannte Daten'
      )
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
