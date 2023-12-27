export default defineNuxtRouteMiddleware(() => {
  const { data, signOut } = useAuth()

  // See when the session is supposed to expire and if that point has passed, force logout the user
  if (data.value?.expires) {
    const date = new Date(data.value?.expires)
    if (new Date() >= date) {
      signOut()
    }
  }
})
