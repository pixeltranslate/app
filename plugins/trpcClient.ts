import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import superjson from 'superjson'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpc = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [httpBatchLink()]
  })

  return {
    provide: {
      trpc
    }
  }
})
