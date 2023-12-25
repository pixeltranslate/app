import { useQuery } from '@tanstack/vue-query'

export default () => {
  return {
    workspaces: {
      getAll: () => useQuery({
        queryFn: () => 'Test',
        queryKey: ['workspaces']
      })
    }
  }
}
