<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="block w-[330px] h-[45px] px-2 py-1 font-normal placeholder:text-teal-700 text-teal-700 bg-white bg-clip-padding border-2 border-teal-300 rounded-[13px] focus:bg-white focus:border-emerald-700 focus:outline-none"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>