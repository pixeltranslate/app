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
  byId: publicProcedure.input(z.object({ id: idSchema })).query(({ input, ctx }) => {
    return ctx.fetch<APIWorkspaceResponse>(`/workspaces/${input.id}`)
  }),
  create: publicProcedure.input(z.object({ name: z.string() })).mutation(({ input, ctx }) => {
    return ctx.fetch<void>('/workspaces', 'POST', input)
  })
})
