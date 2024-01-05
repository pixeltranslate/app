import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { idSchema, collectionGetAllSchema, createCollectionSchema, updateCollectionSchema, idObjectSchema, collectionSchema, collectionEntrySchema } from '~/server/schemas'
import type { CollectionGetAll, Collection } from '~/types'

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
  byId: publicProcedure.input(inputWorkspaceProjectIdSchema.merge(z.object({ id: z.string().nullish() }))).query(({ ctx, input }) => {
    const { workspaceId, projectId, id } = input
    if (!workspaceId || !projectId || !id) {
      return undefined
    }
    return ctx.fetch<Collection>({
      url: `/workspaces/${workspaceId}/projects/${projectId}/collections/${id}`,
      schema: collectionSchema
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
  updateEntries: publicProcedure.input(inputWorkspaceProjectIdSchema.merge(z.object({ id: z.string().nullish(), data: z.array(collectionEntrySchema) }))).mutation(({ input, ctx }) => {
    const { workspaceId, projectId, id, data } = input
    if (!workspaceId || !projectId || !id) {
      return undefined
    }
    return ctx.fetch<Collection>({
      url: `/workspaces/${workspaceId}/projects/${projectId}/collections/${id}/commit_entries`,
      method: 'POST',
      body: data,
      schema: collectionSchema
    })
  }),
  delete: publicProcedure.input(inputWorkspaceProjectIdSchema.merge(idObjectSchema)).mutation(({ input, ctx }) => {
    return ctx.fetch<CollectionGetAll>({
      url: `/workspaces/${input.workspaceId}/projects/${input.projectId}/collections/${input.id}`,
      method: 'DELETE'
    })
  })
})
