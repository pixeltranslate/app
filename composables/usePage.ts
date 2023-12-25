const getWorkspaceFromRoute = (route: string) => {
  const splitRoute = route.split('/').splice(1)
  if (splitRoute[0] === 'workspace') {
    return splitRoute[1]
  }
  return undefined
}

export default () => {
  const router = useRouter()
  const workspace = ref(getWorkspaceFromRoute(router.currentRoute.value.fullPath))

  return {
    workspace: workspace.value,
    getWorkspaceFromRoute
  }
}
