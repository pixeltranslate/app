import { z } from 'zod'

export const routeSchema = z.object({
  workspace: z.string().nullish(),
  project: z.string().nullish()
})
export type RouteSchema = z.infer<typeof routeSchema>

export default () => {
  const { params } = useRoute()
  const routeParams = routeSchema.parse(params)
  const { workspaces } = useQuery()

  const { data: workspace } = workspaces.byId(routeParams.workspace || undefined)

  return {
    workspaceId: routeParams.workspace || undefined,
    workspace: workspace || undefined,
    projectId: routeParams.project || undefined
  }
}
