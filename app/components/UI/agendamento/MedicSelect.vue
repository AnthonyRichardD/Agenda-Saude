<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array as () => Array<{
      value: string | number
      label: string
    }>,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(props.modelValue)

watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="option in options"
      :key="option.value"
      class="w-full cursor-pointer rounded-xl border-2 p-4 transition-all duration-200"
      :class="
        selectedOption === option.value
          ? 'border-teal-400 bg-teal-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300'
      "
      @click="selectedOption = option.value"
    >
      <div class="flex items-center">
        <div
          class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2"
          :class="
            selectedOption === option.value
              ? 'border-teal-500 bg-white'
              : 'border-gray-300'
          "
        >
          <div
            v-if="selectedOption === option.value"
            class="h-3 w-3 rounded-full bg-teal-500"
          ></div>
        </div>

        <div class="ml-4">
          <p class="font-medium text-[14.5px] text-[#134E4A]">
            {{ option.label }}
          </p>
          <p class="text-[13px] font-bold text-[#0F766E]">
            Disponível para consultas
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
