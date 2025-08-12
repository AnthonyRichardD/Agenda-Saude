<script setup>
const alertStore = useAlertStore()
const { isOpen } = storeToRefs(alertStore)
</script>

<template>
  <div>
    <main class="w-full max-w-md mx-auto bg-gray-100 h-dvh min-h-dvh relative">
      <UILoading />
      <UIDialogAlert v-if="isOpen" />
      <UApp>
        <NuxtPage />
      </UApp>
    </main>
  </div>
</template>
