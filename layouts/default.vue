<template>
  <div class="h-screen flex flex-col bg-background">
    <NavigationBar />
    <div class="flex h-full overflow-hidden">
      <NavigationSidebar />
      <div class="w-full overflow-auto">
        <div class="p-8 overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
