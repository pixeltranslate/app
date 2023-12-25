import { z } from 'zod'

/*
  When adding a new schema which needs to be used as a Type, please add it in ~/types.d.ts as:
  export type Example = z.infer<typeof example>
*/

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
