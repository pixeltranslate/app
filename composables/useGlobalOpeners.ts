const makeGlobalOpener = <T>() => {
  const data = ref<T>()

  return {
    open: (payload: T) => { data.value = payload },
    close: () => { data.value = undefined },
    data
  }
}

interface CreateOrEditInterface<T> {
  mode: 'create' | 'edit'
  data?: T
}

const openers = {
  workspaceCreateOrEdit: makeGlobalOpener<CreateOrEditInterface<{ name: string }>>()
}

export default () => {
  return openers
}
