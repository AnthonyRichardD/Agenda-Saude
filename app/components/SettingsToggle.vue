<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
})

const emit = defineEmits(['update:modelValue'])

const enabled = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emit('update:modelValue', newValue)
  },
})
</script>

<template>
  <div class="w-full flex justify-between items-center">
    <div class="w-full space-y-1">
      <h2 class="text-[#042F2E] text-[16px] font-semibold">
        {{ title }}
      </h2>
      <p class="text-[14px] text-[#3F3F46]">{{ description }}</p>
    </div>

    <CustomToggle v-model="enabled" />
  </div>
</template>
