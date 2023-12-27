import { z } from 'zod'

export const routeSchema = z.object({
  workspace: z.string().nullish(),
  project: z.string().nullish()
})
export type RouteSchema = z.infer<typeof routeSchema>

export default () => {
  const { params } = useRoute()
  const routeParams = routeSchema.parse(params)

  return {
    workspaceId: routeParams.workspace || undefined
  }
}
