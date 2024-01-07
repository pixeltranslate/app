import FusionAuthProvider from 'next-auth/providers/fusionauth'

import type { JWT } from 'next-auth/jwt'
import { NuxtAuthHandler } from '#auth'

async function refreshAccessToken (token: JWT) {
  try {
    const url = `${process.env.AUTH_ISSUER}/token`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        'grant_type=refresh_token' +
        `&client_id=${process.env.AUTH_CLIENT_ID}` +
        `&client_secret=${process.env.AUTH_CLIENT_SECRET}` +
        `&refresh_token=${token.refreshToken}`
    })

    const res = await req.json()

    if (res.error) {
      return {
        ...token,
        error: 'RefreshAccessTokenExpired'
      }
    }
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
    FusionAuthProvider.default({
      issuer: process.env.AUTH_ISSUER,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      tenantId: process.env.AUTH_TENANT_ID
    })
  ],
  callbacks: {
    jwt ({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.accessTokenExpires = account.expires_at
        token.refreshToken = account.refresh_token
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
        error: token.error ?? undefined
      }
    }
  }
})
