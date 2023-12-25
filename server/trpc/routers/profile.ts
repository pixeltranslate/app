import { createRouter, publicProcedure } from '../trpc'
import { profileSchema } from '~/server/schemas'
import type { Profile } from '~/types'

export const router = createRouter({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<Profile>('/profile/me', profileSchema)
  })
})
