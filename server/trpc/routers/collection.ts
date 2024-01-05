import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { idSchema, collectionGetAllSchema, createCollectionSchema, updateCollectionSchema, idObjectSchema } from '~/server/schemas'
import type { CollectionGetAll } from '~/types'

const inputWorkspaceProjectIdSchema = z.object({
  workspaceId: idSchema.nullish(),
  projectId: idSchema.nullish()
})

export const router = createRouter({
  all: publicProcedure.input(inputWorkspaceProjectIdSchema).query(({ ctx, input }) => {
    const { workspaceId, projectId } = input
    if (!workspaceId || !projectId) {
      return []
    }
    return ctx.fetch<CollectionGetAll[]>({
      url: `/workspaces/${workspaceId}/projects/${projectId}/collections`,
      schema: z.array(collectionGetAllSchema)
    })
  }),
  create: publicProcedure.input(createCollectionSchema).mutation(({ input, ctx }) => {
    return ctx.fetch<CollectionGetAll>({
      url: `/workspaces/${input.workspaceId}/projects/${input.projectId}/collections`,
      method: 'POST',
      body: input
    })
  }),
  update: publicProcedure.input(updateCollectionSchema).mutation(({ input, ctx }) => {
    const { workspaceId, projectId, id } = input
    return ctx.fetch<CollectionGetAll>({
      url: `/workspaces/${workspaceId}/projects/${projectId}/collections/${id}`,
      method: 'PATCH',
      body: input
    })
  }),
  delete: publicProcedure.input(inputWorkspaceProjectIdSchema.merge(idObjectSchema)).mutation(({ input, ctx }) => {
    return ctx.fetch<CollectionGetAll>({
      url: `/workspaces/${input.workspaceId}/projects/${input.projectId}/collections/${input.id}`,
      method: 'DELETE'
    })
  })
})
