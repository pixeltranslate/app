import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { z } from 'zod'
import { getServerSession, getToken } from '#auth'

interface FetchOptions {
  url: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH'
  schema?: z.ZodTypeAny
  body?: any
}

const API_BASE = process.env.API_BASE || 'http://localhost:8080'
const _fetch = async <T>(request: FetchOptions, headers: HeadersInit): Promise<T> => {
  const data = await $fetch(`${API_BASE}${request.url}`, {
    method: request.method || 'GET',
    headers,
    body: request.body
  }) as T

  if (request.schema) {
    return request.schema.parse(data) as T
  }
  return data
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext (_event: H3Event) {
  const token = await getToken({ event: _event })
  const session = await getServerSession(_event)
  const HEADERS = { Authorization: `Bearer ${token?.accessToken}` }

  return {
    session,
    fetch: <T>(request: FetchOptions) => _fetch<T>(request, HEADERS)
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
