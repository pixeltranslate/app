import NextAuth, { DefaultSession } from "next-auth"
import { z } from 'zod'
import { profileSchema, createWorkspaceSchema, workspaceSchema, updateWorkspaceSchema, createOrUpdateWorkspaceSchema } from "~/server/schemas"

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

export type CreateOrUpdateWorkspace = z.infer<typeof createOrUpdateWorkspaceSchema>
