import { z } from 'zod'

/*
  When adding a new schema which needs to be used as a Type, please add it in ~/types.d.ts as:
  export type Example = z.infer<typeof example>
*/

export const idSchema = z.string().min(36)
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

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'The name should be at least 1 letters long.').max(64, 'The name cannot be longer than 15 letters.'),
  description: z.string().max(256, 'The description is too long.').optional()
})

export const workspaceSchema = z.object({
  id: idSchema,
  name: z.string().min(1).max(64),
  description: z.string().max(360),
  createdAt: z.coerce.date(),
  members: z.record(z.string(), z.any())
})
