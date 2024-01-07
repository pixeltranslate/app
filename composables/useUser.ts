import { useAuth } from '#imports'
import getInitialsFromString from '~/helpers/getInitialsFromString'

export default () => {
  const { data } = useAuth()

  const username = computed(() => data.value?.user.name ?? 'Unknown')
  const avatar = computed(() => {
    return {
      src: data.value?.user.image ?? false,
      text: getInitialsFromString(username.value),
      ui: {
        background: '!bg-primary-dark'
      }
    }
  })

  return {
    username,
    avatar
  }
}
