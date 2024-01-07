import { z } from 'zod'

export const routeSchema = z.object({
  workspaceId: z.string().optional(),
  projectId: z.string().optional(),
  collectionId: z.string().optional()
})
export type RouteSchema = z.infer<typeof routeSchema>

export default () => {
  const { params, path } = useRoute()
  const routeParams = routeSchema.parse(params)
  const { workspaces, projects } = useQuery()

  const { data: workspace, isLoading: isWorkspaceLoading } = workspaces.byId(routeParams.workspaceId || undefined)
  const { data: project, isLoading: isProjectLoading } = projects.byId({
    workspaceId: routeParams.workspaceId || undefined,
    projectId: routeParams.projectId || undefined
  })

  return {
    workspaceId: routeParams.workspaceId,
    workspace: {
      data: workspace,
      isLoading: isWorkspaceLoading
    },
    projectId: routeParams.projectId,
    project: {
      data: project,
      isLoading: isProjectLoading
    },
    collectionId: routeParams.collectionId,
    path
  }
}
