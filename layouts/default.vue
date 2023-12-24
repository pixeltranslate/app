<template>
  <div class="h-screen bg-foreground">
    <div class="flex">
      <NavigationSidebar />
      <div class="w-full overflow-auto">
        <NavigationBar />
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
