<script lang="ts" setup>
export interface SidebarItem {
  label: string
  icon?: string
  href?: string
  avatar?: {
    text: string,
    image?: string,
  }
  children?: Omit<SidebarItem, 'children'>[]
}
const props = defineProps<SidebarItem>()

const isExpanded = ref(false)

const toggle = () => {
  if (props.children) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <NuxtLink :event="href ? 'click' : ''" :to="href">
    <div
      class="flex items-center justify-between hover:bg-primary-dark/40 p-2 mx-2 rounded cursor-pointer"
      :class="isExpanded && 'bg-primary-dark/20'"
      @click="toggle"
    >
      <div class="flex items-center gap-2 truncate">
        <Icon v-if="icon" :name="icon" size="20" />
        <UAvatar v-if="avatar" size="xs" :text="avatar.text" :src="avatar.image" :ui="{ background: '!bg-secondary' }" />
        <p class="truncate text-sm">
          {{ label }}
        </p>
      </div>
      <Icon v-if="children" name="pixelarticons:chevron-down" size="22" class="transition" :class="isExpanded ? 'rotate-180' : 'rotate-0'" />
    </div>
    <div v-if="children && isExpanded" class="ml-4 mt-2">
      <NavigationSidebarItem v-for="item in children" v-bind="item" :key="item.label" />
    </div>
  </NuxtLink>
</template>
