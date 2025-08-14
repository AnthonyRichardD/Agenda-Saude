<script setup>
const alertStore = useAlertStore()
const { isOpen } = storeToRefs(alertStore)

const useNavMenu = useNavStore()
const { disabledRoutes } = storeToRefs(useNavMenu)
const router = useRouter()
const navIsActive = computed(() => {
  return !disabledRoutes.value.includes(router.currentRoute.value.path)
})
</script>

<template>
  <div>
    <main class="w-full max-w-md mx-auto bg-gray-100 h-full min-h-dvh relative">
      <UILoading />
      <UIDialogAlert v-if="isOpen" />
      <UApp>
        <NuxtPage :class="{ 'pb-[70px]': navIsActive }" />

        <NavMenu v-if="navIsActive" />
      </UApp>
    </main>
  </div>
</template>
