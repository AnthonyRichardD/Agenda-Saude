<script setup lang="ts">
import { computed } from 'vue'
import { vMaska } from 'maska/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  mask: {
    type: [String],
    default: () => '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <input
    v-maska="mask"
    v-model="internalValue"
    :type="props.type"
    class="block w-full h-[45px] px-3 py-2 font-normal placeholder:text-gray-400 text-gray-800 bg-white bg-clip-padding border-2 rounded-lg transition-colors duration-200 focus:bg-white focus:outline-none"
    :class="{
      'border-red-500 focus:border-red-600 text-red-700': props.error,
      'border-teal-300 focus:border-emerald-700 text-teal-700': !props.error,
    }"
  />
</template>
