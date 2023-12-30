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
    return ctx.fetch<ApiProjectGetAll>({ url: `/workspaces/${input.workspaceId}/${input.projectId}`, schema: projectSchema })
  }),
  create: publicProcedure.input(createProjectSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>({ url: `/workspaces/${input.workspaceId}/projects`, method: 'POST', body: input })
  }),
  update: publicProcedure.input(updateProjectSchema).mutation(({ input, ctx }) => {
    const { workspaceId, id } = input
    return ctx.fetch<ApiProjectGetAll>({ url: `/workspaces/${workspaceId}/project/${id}`, method: 'PATCH', body: { name: input.name, description: input.description } })
  }),
  delete: publicProcedure.input(inputWorkspaceProjectIdSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<void>({ url: `/workspaces/${input.workspaceId}/${input.projectId}`, method: 'DELETE' })
  })
})
