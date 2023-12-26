import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import fetch from 'node-fetch'
import { getServerSession } from '#auth'

const API_BASE = process.env.API_BASE || 'http://localhost:8080'
const _fetch = async <T>(url: string, headers: HeadersInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${url}`, { headers })
  if (!response.ok) {
    throw new Error('Fetch Bad...')
  }
  return response.json() as T
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext (_event: H3Event) {
  const session = await getServerSession(_event)
  const HEADERS = { Authorization: `Bearer ${session?.accessToken}` }

  return {
    session,
    fetch: <T>(url: string) => _fetch<T>(url, HEADERS)
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
