import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import superjson from 'superjson'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
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
