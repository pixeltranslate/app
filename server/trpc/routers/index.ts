import { router as profileRouter } from './profile'
import { router as workspaceRouter } from './workspace'
import { router as projectRouter } from './project'
import { createRouter } from '~/server/trpc/trpc'

export const appRouter = createRouter({
  profileRouter,
  workspaceRouter,
  projectRouter
})

export type AppRouter = typeof appRouter
