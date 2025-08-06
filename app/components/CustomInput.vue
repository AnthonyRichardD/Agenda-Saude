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
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  class: {
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
  <div class="flex flex-col gap-1" :class="props.class">
    <label
      v-if="props.label"
      class="text-[#134E4A] font-semibold text-[14px]"
      >{{ props.label }}</label
    >
    <input
      :name="props.name"
      v-maska="mask"
      v-model="internalValue"
      :type="props.type"
      :placeholder="props.placeholder"
      class="block w-full text-[#115E59] h-[45px] px-3 py-2 font-normal placeholder:text-[#115E59] bg-white bg-clip-padding border-2 rounded-lg transition-colors duration-200 focus:bg-white focus:outline-none"
      :class="{
        'border-[#EF4444]': props.error,
        'border-[#99F6E4] focus:border-teal-500': !props.error,
      }"
    />
  </div>
</template>
