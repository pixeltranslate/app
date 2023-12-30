import { z } from 'zod'

export const routeSchema = z.object({
  workspace: z.string().nullish(),
  project: z.string().nullish()
})
export type RouteSchema = z.infer<typeof routeSchema>

export default () => {
  const { params } = useRoute()
  const routeParams = routeSchema.parse(params)
  const { workspaces, projects } = useQuery()

  const { data: workspace, isLoading: isWorkspaceLoading } = workspaces.byId(routeParams.workspace || undefined)
  const { data: project, isLoading: isProjectLoading } = projects.byId({
    workspaceId: routeParams.workspace || undefined,
    projectId: routeParams.project || undefined
  })

  return {
    workspaceId: routeParams.workspace || undefined,
    workspace: {
      data: workspace,
      isLoading: isWorkspaceLoading
    },
    projectId: routeParams.project || undefined,
    project: {
      data: project,
      isLoading: isProjectLoading
    }
  }
}
