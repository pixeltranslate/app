import { router as profileRouter } from './profile'
import { router as workspaceRouter } from './workspace'
import { createRouter } from '~/server/trpc/trpc'

export const appRouter = createRouter({
  profileRouter,
  workspaceRouter
})

export type AppRouter = typeof appRouter
