import KeycloakProvider from 'next-auth/providers/keycloak'
import type { JWT } from 'next-auth/jwt'
import { NuxtAuthHandler } from '#auth'

async function refreshAccessToken (token: JWT) {
  try {
    const url = `${process.env.KEY_CLOAK_ISSUER}/protocol/openid-connect/token`
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
  pages: {
    signIn: '/auth'
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.KEY_CLOAK_CLIENT_ID,
      clientSecret: process.env.KEY_CLOAK_CLIENT_SECRET,
      issuer: process.env.KEY_CLOAK_ISSUER
    })
  ],

  callbacks: {
    jwt ({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.accessTokenExpires = account.expires_at
        token.refreshToken = account.refresh_token
        token.refreshTokenExpires = Date.now() + (account.refresh_expires_in as number) * 1000
      }

      // If the access token has not expired we return it
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // refresh to access token if it has expired
      return refreshAccessToken(token)
    },
    session ({ session, token }) {
      return {
        ...session,
        expires: new Date(token.refreshTokenExpires as number).toISOString(), // Overwrite default expires to a custom one, to signout the user when the session is no longer active
        user: {
          ...session.user,
          image: token.picture || undefined
        }
      }
    }
  }
})
