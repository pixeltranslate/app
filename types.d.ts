import NextAuth, { DefaultSession } from "next-auth"
import { z } from 'zod'
import { profileSchema, createWorkspaceSchema, workspaceSchema, updateWorkspaceSchema, createOrUpdateWorkspaceSchema, createOrUpdateProjectSchema, projectSchema, platformSchema, collectionInfoSchema, collectionSchema } from "~/server/schemas"

// Extend the NuxtAuth Session type with more information we pass in /server/api/auth/[...].ts
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string
    user: {
      preferred_username?: string
      image?: string
    } & DefaultSession["user"]
  }
}

export type Profile = z.infer<typeof profileSchema>
export type ApiWorkspaceGetAll = z.infer<typeof workspaceSchema>
export type ApiProjectGetAll = z.infer<typeof projectSchema>

export type CreateOrUpdateWorkspace = z.infer<typeof createOrUpdateWorkspaceSchema>
export type CreateOrUpdateProject = z.infer<typeof createOrUpdateProjectSchema>
export type ProjectPlatforms = z.infer<typeof platformSchema>

export type CollectionInfo = z.infer<typeof collectionInfoSchema>
export type Collection = z.infer<typeof collectionSchema>
