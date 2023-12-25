export default () => {
  const { data } = useAuth()

  const username = computed(() => data.value?.user.preferred_username ?? data.value?.user.name ?? 'Unknown')
  const name = computed(() => data.value?.user.name ?? 'Unknown')
  const avatar = computed(() => {
    return {
      src: data.value?.user.image ?? false,
      text: username.value[0].toLocaleUpperCase(),
      ui: {
        background: '!bg-primary-dark'
      }
    }
  })

  return {
    username,
    name,
    avatar
  }
}
