import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'

/*
{
    "details": {
        "created_timestamp": 1703490669187,
        "email": "reapermaga@gmail.com",
        "name": "Maga AliKacktImHof",
        "picture": "gaY",
        "preferred_username": "reapermaga"
    },
    "id": "84d28c75-7a17-4b2d-81cb-b751ce82f0ba",
    "workspaces": []
}
*/

const profileSchema = z.object({
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

export const router = createRouter({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<z.infer<typeof profileSchema>>('/profile/me', profileSchema)
  })
})
