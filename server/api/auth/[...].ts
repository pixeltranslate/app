import KeycloakProvider from 'next-auth/providers/keycloak'
import type { JWT } from 'next-auth/jwt'
import { NuxtAuthHandler } from '#auth'

async function refreshAccessToken (token: JWT) {
  try {
    const url = process.env.KEY_CLOAK_REFRESH_ISSUER ?? ''
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        'grant_type=refresh_token' +
        `&client_id=${process.env.KEY_CLOAK_CLIENT_ID}` +
        `&client_secret=${process.env.KEY_CLOAK_CLIENT_SECRET}` +
        `&refresh_token=${token.refreshToken}`
    })

    const res = await req.json()
    return {
      ...token,
      accessToken: res.access_token,
      accessTokenExpires: Date.now() + res.expires_in * 1000,
      refreshToken: res.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.KEY_CLOAK_CLIENT_ID,
      clientSecret: process.env.KEY_CLOAK_CLIENT_SECRET,
      issuer: process.env.KEY_CLOAK_ISSUER
    })
  ],
  callbacks: {
    jwt ({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.accessTokenExpires = (account.expires_at ?? 0) * 1000
        token.refreshToken = account.refresh_token
      }
      if (profile) {
        token.preferred_username = (profile as any).preferred_username
      }

      const accessTokenExpires = token.accessTokenExpires as number
      if (typeof accessTokenExpires === 'number' && Date.now() < accessTokenExpires) {
        return token
      }
      return refreshAccessToken(token)
    },
    session ({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          image: token.picture || undefined,
          preferred_username: token.preferred_username || undefined
        }
      }
    }
  }
})
