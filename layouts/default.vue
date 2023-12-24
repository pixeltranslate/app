<template>
  <div class="h-screen bg-foreground">
    <div class="flex">
      <div class="w-72 h-[98vh] bg-primary-dark rounded-r my-2 shadow">
        <NavigationSidebar />
      </div>
      <div class="w-full overflow-auto">
        <NavigationBar />
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
