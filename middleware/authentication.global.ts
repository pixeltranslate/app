export default defineNuxtRouteMiddleware((to) => {
  const { status, signIn, data, signOut } = useAuth()

  // See when the session is supposed to expire and if that point has passed, force logout the user
  if (data.value?.expires) {
    const date = new Date(data.value?.expires)
    if (new Date() >= date) {
      signOut()
      return
    }
  }

  // If user is authenticated we allow them to access the page
  if (status.value === 'authenticated') {
    return
  }

  /**
   * We do not want to enforce protection on `404` pages.
   *
   * This is to:
   * - improve UX and DX: Having to log-in to see a `404` is not pleasent,
   * - avoid the `Error [ERR_HTTP_HEADERS_SENT]`-error that occurs when we redirect to the sign-in page when the original to-page does not exist. Likely related to https://github.com/nuxt/framework/issues/9438
   *
   */
  const matchedRoute = to.matched.length > 0
  if (!matchedRoute) {
    // Hands control back to `vue-router`, which will direct to the `404` page
    return
  }

  // User is not signed in, so redirect them to our keyclock instance to take over
  signIn('keycloak')
})
