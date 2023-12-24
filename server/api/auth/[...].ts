import KeycloakProvider from 'next-auth/providers/keycloak'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.KEY_CLOAK_CLIENT_ID,
      clientSecret: process.env.KEY_CLOAK_CLIENT_SECRET,
      issuer: process.env.KEY_CLOAK_ISSUER
    })
  ]
})
