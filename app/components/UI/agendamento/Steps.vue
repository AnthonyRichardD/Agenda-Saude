<script setup lang="ts">
const useSteps = useSchedulingStore()
const props = defineProps({
  maxSteps: {
    type: Number,
    default: 0,
  },
  stepsLabel: {
    type: Array,
    default: [],
  },
})
</script>

<template>
  <div class="w-full h-[70px] border flex justify-around items-center mb-9">
    <div
      class="flex flex-col items-center justify-center"
      v-for="step in props.maxSteps"
      :key="step"
    >
      <div
        class="h-9 w-9 rounded-full flex items-center justify-center text-[20px] font-medium"
        :class="{
          'bg-[#DBDBDB] text-[#B8B8B8]': step > useSteps.step,
          'bg-[#0F766E] text-white': step <= useSteps.step,
        }"
      >
        <span v-if="step >= useSteps.step">{{ step }}</span>
        <LucideCheck v-else class="text-white" :size="17" stroke-width="3" />
      </div>
      <p
        class="text-[#0F766E] text-[16px] font-medium"
        :class="{ 'text-[#B8B8B8]': step > useSteps.step }"
      >
        {{ props.stepsLabel[step - 1] }}
      </p>
    </div>
  </div>
</template>
