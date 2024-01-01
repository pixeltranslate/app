import { z } from 'zod'

/*
  When adding a new schema which needs to be used as a Type, please add it in ~/types.d.ts as:
  export type Example = z.infer<typeof example>
*/

export const idSchema = z.string().min(36)
export const idObjectSchema = z.object({ id: idSchema })
export const workspaceRolesSchema = z.enum(['admin'])

export const profileSchema = z.object({
  id: z.string(),
  workspaces: z.array(z.string()),
  details: z.object({
    created_timestamp: z.coerce.date(),
    email: z.string().email(),
    name: z.string(),
    picture: z.string().nullish(),
    preferred_username: z.string()
  })
})

export const workspaceSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(64),
  description: z.string().max(360),
  createdAt: z.coerce.date(),
  members: z.record(z.string(), z.any())
})

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'The name should be at least 1 letters long.').max(36, 'The name cannot be longer than 36 letters.'),
  description: z.string().max(256, 'The description is too long.').optional()
})
export const updateWorkspaceSchema = createWorkspaceSchema.merge(idObjectSchema)
export const createOrUpdateWorkspaceSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('create'), data: createWorkspaceSchema }),
  z.object({ mode: z.literal('update'), data: updateWorkspaceSchema })
])

export const platformSchema = z.enum(['unity', 'unreal', 'java', 'node', 'multi'])

export const projectSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(64),
  description: z.string().max(360),
  createdAt: z.coerce.date(),
  members: z.record(z.string(), z.any()),
  platform: platformSchema
})

export const createProjectSchema = z.object({
  workspaceId: idSchema,
  name: z.string().min(1, 'The name should be at least 1 letters long.').max(36, 'The name cannot be longer than 36 letters.'),
  description: z.string().max(256, 'The description is too long.').optional(),
  platform: platformSchema
})
export const updateProjectSchema = createProjectSchema.merge(idObjectSchema)
export const createOrUpdateProjectSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('create'), data: createProjectSchema }),
  z.object({ mode: z.literal('update'), data: updateProjectSchema })
])

export const collectionSchema = z.object({
  id: idSchema,
  name: z.string(),
  entries: z.number().optional()
})

export const collectionEntrySchema = z.object({
  id: idSchema,
  name: z.string(),
  createdAt: z.coerce.date(),
  translations: z.record(z.string(), z.string())
})
