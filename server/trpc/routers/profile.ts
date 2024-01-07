import { z } from 'zod'
import { createRouter, publicProcedure } from '../trpc'
import { profileSchema, tokenSchema } from '~/server/schemas'
import type { Profile, Token } from '~/types'

const secretIdSchema = z.object({
  secretId: z.string()
})
type SecretId = z.infer<typeof secretIdSchema>

export const router = createRouter({
  me: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<Profile>({ url: '/profile/me', schema: profileSchema })
  }),
  tokens: publicProcedure.query(({ ctx }) => {
    return ctx.fetch<Token[]>({ url: '/profile/tokens', schema: z.array(tokenSchema) })
  }),
  createToken: publicProcedure.input(z.object({ name: z.string() })).mutation(({ input, ctx }) => {
    return ctx.fetch<SecretId>({
      url: '/profile/tokens',
      method: 'POST',
      body: input,
      schema: secretIdSchema
    })
  }),
  deleteToken: publicProcedure.input(z.object({ id: z.string() })).mutation(({ input, ctx }) => {
    return ctx.fetch<Token>({
      url: '/profile/tokens',
      method: 'DELETE',
      schema: tokenSchema,
      body: input
    })
  })
})
