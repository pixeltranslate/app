import { useQuery } from '@tanstack/vue-query'

type MaybeComputedRef<T> = MaybeRef<T> | ComputedRef<T> | T

export default () => {
  const { $trpc } = useNuxtApp()

  return {
    profile: {
      me: () => useQuery({
        queryFn: () => $trpc.profileRouter.me.query(),
        queryKey: ['profiles', 'me']
      })
    },
    workspaces: {
      all: () => useQuery({
        queryFn: () => $trpc.workspaceRouter.all.query(),
        queryKey: ['workspaces']
      }),
      byId: (id: MaybeComputedRef<string | undefined>) => useQuery({
        queryFn: () => $trpc.workspaceRouter.byId.query(unref(id)),
        queryKey: ['workspaces', id]
      })
    },
    projects: {
      all: (workspaceId: MaybeComputedRef<string | undefined>) => useQuery({
        queryFn: () => $trpc.projectRouter.all.query(unref(workspaceId)),
        queryKey: ['workspaces', workspaceId, 'projects']
      }),
      byId: (input: MaybeComputedRef<{ workspaceId: string, projectId: string}>) => useQuery({
        queryFn: () => $trpc.projectRouter.byId.query(unref(input)),
        queryKey: ['workspaces', 'projects', input]
      })
    }
  }
}
