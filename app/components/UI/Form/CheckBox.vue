<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer select-none">
    <input
      :name="props.name"
      v-model="internalValue"
      type="checkbox"
      class="appearance-none peer"
    />

    <span
      class="border-[#0F766E] peer-checked:bg-teal-600 w-4 h-4 border-2 rounded-full flex items-center justify-center transition-all"
    >
      <LucideCheck class="text-white" />
    </span>

    <span v-if="props.label" class="text-[#0F766E] font-medium text-[12px]">{{
      props.label
    }}</span>
  </label>
</template>
