const makeGlobalOpener = <T>() => {
  const data = ref<T>()

  return {
    open: (payload: T) => { data.value = payload },
    close: () => { data.value = undefined },
    data
  }
}

interface CreateInterface<C> {
  mode: 'create'
  data?: C
}
interface UpdateInterface<U> {
  mode: 'update'
  data: U
}
type CreateOrUpdateInterface<C, U> = CreateInterface<C> | UpdateInterface<U>

// Type definitions
type CreateOrUpdateWorkspace = CreateOrUpdateInterface<{}, { id: string, name: string }>
type CreateOrUpdateProject = CreateOrUpdateInterface<{ workspaceId: string }, { workspaceId: string, id: string, name: string }>

// Opener definition
const openers = {
  workspaceCreateOrEdit: makeGlobalOpener<CreateOrUpdateWorkspace>(),
  workspaceDelete: makeGlobalOpener<{ id: string, name?: string }>(),
  projectCreateOrEdit: makeGlobalOpener<CreateOrUpdateProject>()
}

export default () => {
  return openers
}
