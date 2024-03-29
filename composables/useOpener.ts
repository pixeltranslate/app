export default <T> () => {
  const isOpen = ref(false)
  const data = ref<undefined | T>()

  const close = () => {
    isOpen.value = false
    data.value = undefined
  }

  const open = (payload?: T) => {
    isOpen.value = true
    data.value = payload
  }

  return {
    isOpen,
    data,
    close,
    open
  }
}
