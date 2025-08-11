<script setup lang="ts">
const alertStore = useAlertStore()
const { isOpen, title, message } = storeToRefs(alertStore)

const close = (): void => {
  alertStore.hideAlert()
}

onMounted(() => {
  setTimeout(() => {
    alertStore.hideAlert()
  }, 5000)
})
</script>

<template>
  <Transition name="toast-slide">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none"
    >
      <div class="max-w-md w-full p-4">
        <div
          @click.stop
          class="bg-[#fee2e2] rounded-[10px] p-4 flex gap-3 items-start relative pointer-events-auto"
        >
          <LucideX
            :size="20"
            color="#EF4444"
            @click="close"
            class="absolute top-3 right-3 cursor-pointer"
          />
          <LucideAlertCircle class="mt-[2px]" color="#B91C1C" :size="18" />
          <div class="flex flex-col text-[#B91C1C] items-start">
            <h3 class="font-semibold text-[15px]">
              {{ title }}
            </h3>
            <p class="text-[#B91C1C] text-[13px]">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease-out;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
