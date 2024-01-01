import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { createWorkspaceSchema, idSchema, updateWorkspaceSchema, workspaceSchema } from '~/server/schemas'
import type { Workspace } from '~/types'

export const router = createRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.fetch<Workspace[]>({ url: '/workspaces', schema: z.array(workspaceSchema) })
    return z.array(workspaceSchema).parse(data)
  }),
  byId: publicProcedure.input(idSchema.nullish()).query(({ input, ctx }) => {
    if (!input) {
      return null
    }
    return ctx.fetch<Workspace>({ url: `/workspaces/${input}`, schema: workspaceSchema })
  }),
  create: publicProcedure.input(createWorkspaceSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<Workspace>({ url: '/workspaces', method: 'POST', body: input })
  }),
  update: publicProcedure.input(updateWorkspaceSchema).mutation(({ input, ctx }) => {
    const { id } = input
    return ctx.fetch<Workspace>({ url: `/workspaces/${id}`, method: 'PATCH', body: { name: input.name, description: input.description } })
  }),
  delete: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<Workspace>({ url: `/workspaces/${input}`, method: 'DELETE' })
  })
})
