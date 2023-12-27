import { createRouter, publicProcedure } from '../trpc'
import type { Profile } from '~/types'

export const router = createRouter({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<Profile>('/profile/me')
  })
})
