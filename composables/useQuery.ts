import { useQuery } from '@tanstack/vue-query'

export default () => {
  const { $trpc } = useNuxtApp()

  return {
    profile: {
      me: () => useQuery({
        queryFn: () => $trpc.profileRouter.me.query(),
        queryKey: ['profiles', 'me']
      })
    }
  }
}
