import { router as profileRouter } from './profile'
import { createRouter } from '~/server/trpc/trpc'

export const appRouter = createRouter({
  profileRouter
})

export type AppRouter = typeof appRouter
