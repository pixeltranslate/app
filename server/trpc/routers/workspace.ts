import { createRouter, publicProcedure } from '../trpc'
import { createWorkspaceSchema, idSchema } from '~/server/schemas'
import type { APIWorkspaceResponse } from '~/server/api-types'

export const router = createRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<APIWorkspaceResponse[]>('/workspaces')
  }),
  byId: publicProcedure.input(idSchema.nullish()).query(({ input, ctx }) => {
    if (!input) {
      return null
    }
    return ctx.fetch<APIWorkspaceResponse>(`/workspaces/${input}`)
  }),
  create: publicProcedure.input(createWorkspaceSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>('/workspaces', 'POST', input)
  }),
  delete: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>(`/workspaces/${input}`, 'DELETE')
  })
})
