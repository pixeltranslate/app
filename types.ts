import { z } from 'zod'
import { profileSchema, createWorkspaceSchema, workspaceSchema, updateWorkspaceSchema, createOrUpdateWorkspaceSchema, createOrUpdateProjectSchema, projectSchema, platformSchema, collectionEntrySchema, collectionSchema, collectionGetAllSchema, createOrUpdateCollectionSchema, tokenSchema, recentProjectSchema } from "~/server/schemas"

export type Profile = z.infer<typeof profileSchema>
export type Workspace = z.infer<typeof workspaceSchema>
export type Project = z.infer<typeof projectSchema>
export type RecentProject = z.infer<typeof recentProjectSchema>

export type CreateOrUpdateWorkspace = z.infer<typeof createOrUpdateWorkspaceSchema>
export type CreateOrUpdateProject = z.infer<typeof createOrUpdateProjectSchema>
export type ProjectPlatforms = z.infer<typeof platformSchema>

export type CollectionGetAll = z.infer<typeof collectionGetAllSchema>
export type CollectionEntry = z.infer<typeof collectionEntrySchema>
export type Collection = z.infer<typeof collectionSchema>

export type CreateOrUpdateCollection = z.infer<typeof createOrUpdateCollectionSchema>

export type Token = z.infer<typeof tokenSchema>
