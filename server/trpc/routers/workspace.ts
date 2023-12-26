import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { idSchema } from '~/server/schemas'
import type { APIWorkspaceResponse } from '~/server/api-types'

/*
  GET /workspaces -> Get all
  GET /workspaces/ID -> Get a workspace
  POST /workspaces/ID -> { name: string } Create a workspace
*/

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
  create: publicProcedure.input(z.object({ name: z.string(), description: z.string() })).mutation(({ input, ctx }) => {
    return ctx.fetch<void>('/workspaces', 'POST', input)
  }),
  delete: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>(`/workspaces/${input}`, 'DELETE')
  })
})
