<template>
  <div class="h-screen bg-foreground">
    <div class="flex">
      <div class="w-72 h-[98vh] pl-4 pr-12 bg-primary-dark rounded-r my-2 shadow" />
      <div class="w-full overflow-auto">
        <Navbar />
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
