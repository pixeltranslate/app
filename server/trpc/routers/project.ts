import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { createProjectSchema, updateProjectSchema, idSchema, projectSchema } from '~/server/schemas'
import type { ApiProjectGetAll } from '~/types'

const inputWorkspaceProjectIdSchema = z.object({
  workspaceId: idSchema,
  projectId: idSchema
})

export const router = createRouter({
  all: publicProcedure.input(idSchema.nullish()).query(({ input, ctx }) => {
    if (!input) {
      return []
    }
    return ctx.fetch<ApiProjectGetAll[]>({ url: `/workspaces/${input}/projects`, schema: z.array(projectSchema) })
  }),
  byId: publicProcedure.input(inputWorkspaceProjectIdSchema.nullish()).query(({ input, ctx }) => {
    if (!input) {
      return null
    }
    return ctx.fetch<ApiProjectGetAll>({ url: `/workspaces/${input.workspaceId}/projects/${input.projectId}`, schema: projectSchema })
  }),
  create: publicProcedure.input(createProjectSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<ApiProjectGetAll>({ url: `/workspaces/${input.workspaceId}/projects`, method: 'POST', body: input })
  }),
  update: publicProcedure.input(updateProjectSchema).mutation(({ input, ctx }) => {
    const { workspaceId, id } = input
    return ctx.fetch<ApiProjectGetAll>({
      url: `/workspaces/${workspaceId}/projects/${id}`,
      method: 'PATCH',
      body: input
    })
  }),
  delete: publicProcedure.input(inputWorkspaceProjectIdSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<ApiWorkspaceGetAll>({ url: `/workspaces/${input.workspaceId}/projects/${input.projectId}`, method: 'DELETE' })
  })
})
