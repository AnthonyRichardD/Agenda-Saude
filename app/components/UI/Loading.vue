<script setup lang="ts">
import IconLogo from '~/assets/icons/logo.svg?component'

const useLoading = useLoadingStore()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="useLoading.loading"
      class="h-dvh w-full max-w-md gap-5 fixed z-50 bg-gradient-to-b from-[#042F2E] to-[#0F766E] flex flex-col items-center justify-center"
    >
      <div
        class="bg-[#F5F5F5] rounded-[30px] w-[142px] h-[142px] flex items-center justify-center pulse-scale"
      >
        <IconLogo class="mr-[-6px]" width="110px" />
      </div>
      <h1 class="text-white font-bold text-[40px]">Agenda Saúde</h1>
      <p class="text-[#99F6E4] text-[20px] font-bold">Cuidando da sua saúde</p>

      <div class="flex items-center gap-2 h-4">
        <div
          class="h-2 w-2 bg-white rounded-full opacity-0 fall-and-bounce-animation"
        ></div>
        <div
          class="h-2 w-2 bg-white rounded-full opacity-0 fall-and-bounce-animation"
          style="animation-delay: 150ms"
        ></div>
        <div
          class="h-2 w-2 bg-white rounded-full opacity-0 fall-and-bounce-animation"
          style="animation-delay: 300ms"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}

@keyframes fall-and-bounce {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    transform: translateY(-20%);
  }
  100% {
    transform: translateY(0);
  }
}

.fall-and-bounce-animation {
  animation: fall-and-bounce 1.2s ease-out infinite;
}

@keyframes pulse-scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-scale {
  animation: pulse-scale 1.2s ease-out infinite;
}
</style>
