<script setup lang="ts">
interface ActionCard {
    title: string
    description?: string
    href?: string
    click?: () => void
    icon: string
    iconForeground: string
    iconBackground: string
}

defineProps<{
  actions: ActionCard[]
}>()
</script>

<template>
  <div
    class="grid sm:grid-cols-2 xl:grid-cols-4 justify-items-stretch gap-1"
  >
    <UButton
      v-for="action in actions"
      :key="action.title"
      :padded="false"
      :to="action.href ?? undefined"
      variant="ghost"
      block
      class="w-full h-full rounded overflow-hidden"
      @click="action.click"
    >
      <div class="group relative w-full h-full bg-white dark:bg-foreground p-5 hover:ring-2 hover:ring-inset hover:ring-primary/50 text-left">
        <div>
          <span :class="[action.iconBackground, action.iconForeground, 'inline-flex rounded-lg p-3 ring-0']">
            <Icon :name="action.icon" size="20px" />
          </span>
        </div>
        <div class="mt-4">
          <h3 class="leading-6 text-gray-900 dark:text-gray-200 text-sm">
            {{ action.title }}
          </h3>
          <p v-if="action.description" class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-xs">
            {{ action.description }}
          </p>
        </div>
        <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400 group-hover:text-gray-100" aria-hidden="true">
          <Icon name="ph:arrow-up-right-bold" size="24px" />
        </span>
      </div>
    </UButton>
  </div>
</template>
