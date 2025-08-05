<script setup>
import { computed } from 'vue'
import { vMaska } from 'maska/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  mask: {
    type: [String, Array],
    default: () => ''
  }
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

</script>

<template>
  <input
    v-maska="mask"
    v-model="internalValue"
    class="block w-[330px] h-[45px] px-2 py-1 font-normal placeholder:text-teal-700 text-teal-700 bg-white bg-clip-padding border-2 border-teal-300 rounded-[13px] focus:bg-white focus:border-emerald-700 focus:outline-none"
  />
</template>
