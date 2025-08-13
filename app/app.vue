<script setup>
const alertStore = useAlertStore()
const { isOpen } = storeToRefs(alertStore)

const useNavMenu = useNavStore()
const { navIsActive } = storeToRefs(useNavMenu)
</script>

<template>
  <div>
    <main class="w-full max-w-md mx-auto bg-gray-100 h-dvh min-h-dvh relative">
      <UILoading />
      <UIDialogAlert v-if="isOpen" />
      <UApp>
        <NuxtPage :class="{ 'pb-[70px]': navIsActive }" />

        <NavMenu v-if="navIsActive" />
      </UApp>
    </main>
  </div>
</template>
