const makeGlobalOpener = <T>() => {
  const isOpen = ref(false)
  const data = ref<T>()

  const open = (payload: T) => {
    data.value = payload
    isOpen.value = true
  }
  const close = () => {
    data.value = undefined
    isOpen.value = false
  }

  watch(isOpen, (newValue) => {
    if (newValue === false) {
      data.value = undefined
    }
  })

  return {
    open,
    close,
    data,
    isOpen
  }
}

const openers = {
  openTestDrawer: makeGlobalOpener<{ name: string }>()
}

export default () => {
  return openers
}
