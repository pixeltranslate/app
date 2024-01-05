<script lang="ts" setup>
const links = [
  {
    name: 'Documentation',
    href: '/',
    description: 'Learn how to integrate our tools with your app.',
    icon: 'i-pixelarticons-book'
  },
  {
    name: 'Discord',
    href: '/',
    description: 'Join our Discord and get direct help from the community.',
    icon: 'ic:baseline-discord'
  }
]

const error = useError()
const formattedError = computed(() => {
  if (error.value instanceof Error) {
    return {
      url: '/',
      statusCode: 418,
      statusMessage: 'I am a teapot',
      message: error.value
    }
  }
  return error.value
})

const handleError = (options: { redirect?: string, click?: () => void }) => {
  clearError({
    redirect: options.redirect
  })
}

</script>

<template>
  <NuxtLayout>
    <TheLayout>
      <main v-if="formattedError" class="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
        <div class="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <p class="text-base font-semibold leading-8 text-primary-dark dark:text-primary-light">
            {{ formattedError.statusCode }}
          </p>
          <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Something went wrong
          </h1>
          <p class="mt-1 text-base leading-7 text-gray-500 sm:mt-3 sm:text-lg sm:leading-8">
            {{ formattedError.statusMessage }}
          </p>
        </div>

        <div class="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 class="sr-only">
            Helpful pages
          </h2>

          <ul role="list" class="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
            <li v-for="(link, linkIdx) in links" :key="linkIdx" class="relative flex items-center gap-x-4 p-3 my-2 hover:bg-white/70 dark:hover:bg-foreground rounded">
              <div class="flex h-12 w-12 flex-none items-center justify-center rounded-lg shadow ring-1 ring-gray-900/10 dark:ring-gray-500/30">
                <Icon :name="link.icon" size="28" class="text-gray-500" />
              </div>
              <div class="flex-auto items-center">
                <h3 class="text-sm font-semibold dark:text-gray-300">
                  <a :href="link.href">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {{ link.name }}
                  </a>
                </h3>
                <p class="text-sm leading-6 text-gray-500">
                  {{ link.description }}
                </p>
              </div>
            </li>
          </ul>

          <div class="mt-10 flex justify-center gap-2">
            <UButton size="lg" @click="handleError({ redirect: '/' })">
              <span aria-hidden="true">&larr;</span>
              Back to my workspaces
            </UButton>
          </div>
        </div>
      </main>
    </TheLayout>
  </NuxtLayout>
</template>
