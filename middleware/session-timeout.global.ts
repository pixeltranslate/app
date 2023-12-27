export default defineNuxtRouteMiddleware(() => {
  const { data, signOut } = useAuth()

  if (data.value?.expires) {
  // See when the session is supposed to expire and if that point has passed, force logout the user
    const date = new Date(data.value?.expires)
    if (new Date() >= date) {
      signOut()
    }
  }
})
