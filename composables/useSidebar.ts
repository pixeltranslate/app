const isExpanded = ref(true)
const toggle = () => {
  isExpanded.value = !isExpanded.value
}

export default () => {
  return {
    isExpanded,
    toggle
  }
}
