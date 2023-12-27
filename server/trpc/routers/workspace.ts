import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { createWorkspaceSchema, idSchema, workspaceSchema } from '~/server/schemas'
import type { ApiWorkspaceGetAll } from '~/types'

export const router = createRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.fetch<ApiWorkspaceGetAll[]>({ url: '/workspaces', schema: z.array(workspaceSchema) })
    return z.array(workspaceSchema).parse(data)
  }),
  byId: publicProcedure.input(idSchema.nullish()).query(({ input, ctx }) => {
    if (!input) {
      return null
    }
    return ctx.fetch<ApiWorkspaceGetAll>({ url: `/workspaces/${input}`, schema: workspaceSchema })
  }),
  create: publicProcedure.input(createWorkspaceSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>({ url: '/workspaces', method: 'POST', body: input })
  }),
  delete: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>({ url: `/workspaces/${input}`, method: 'DELETE' })
  })
})
