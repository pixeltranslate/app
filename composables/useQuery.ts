import { useQuery } from '@tanstack/vue-query'

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
      me: () => useQuery({
        queryFn: () => $trpc.workspaceRouter.all.query(),
        queryKey: ['profiles', 'me']
      }),
      byId: () => useQuery({
        queryFn: () => $trpc.workspaceRouter.all.query(),
        queryKey: ['profiles', 'me']
      })
    }
  }
}
