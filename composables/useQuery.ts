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
        queryKey: ['workspaces', unref(id)]
      })
    },
    projects: {
      all: (workspaceId: MaybeComputedRef<string | undefined>) => useQuery({
        queryFn: () => $trpc.projectRouter.all.query(unref(workspaceId)),
        queryKey: ['projects', unref(workspaceId)]
      }),
      byId: (input: MaybeComputedRef<{ workspaceId?: string, projectId?: string} | undefined>) => useQuery({
        queryFn: () => $trpc.projectRouter.byId.query(unref(input)),
        queryKey: ['projects', unref(input)?.workspaceId, unref(input)?.projectId]
      })
    },
    collections: {
      all: (input: MaybeComputedRef<{ workspaceId?: string, projectId?: string}>) => useQuery({
        queryFn: () => $trpc.collectionRouter.all.query(unref(input)),
        queryKey: ['collections', unref(input).workspaceId, unref(input).projectId]
      }),
      byId: (input: MaybeComputedRef<{ workspaceId?: string, projectId?: string, id?: string }>) => useQuery({
        queryFn: () => $trpc.collectionRouter.byId.query(unref(input)),
        queryKey: ['collections', unref(input).workspaceId, unref(input).projectId, unref(input).id]
      })
    }
  }
}
