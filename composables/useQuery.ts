import { useQuery } from '@tanstack/vue-query'

const _fetch = (url: string, headers: HeadersInit) => {
  return $fetch(`http://pixeltranslate.local${url}`, { headers })
}

export default () => {
  const { $trpc } = useNuxtApp()
  const { data } = useAuth()
  const HEADERS = computed(() => {
    return { Authorization: `Bearer ${data.value?.accessToken}` }
  })

  return {
    profile: {
      me: () => useQuery({
        queryFn: () => $trpc.profileRouter.me.query(),
        queryKey: ['profiles', 'me']
      })
    },
    workspaces: {
      all: () => useQuery({
        queryFn: () => _fetch('/workspaces', HEADERS.value),
        queryKey: ['workspace']
      }),
      byId: () => useQuery({
        queryFn: () => $trpc.workspaceRouter.all.query(),
        queryKey: ['profiles', 'me']
      })
    }
  }
}
