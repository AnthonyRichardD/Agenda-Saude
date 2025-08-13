<script setup lang="ts">
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
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isPasswordVisible = ref(false)
function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}

const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<template>
  <div class="flex flex-col gap-1" :class="props.class">
    <label
      v-if="props.label"
      class="text-[#134E4A] font-semibold text-[14px]"
      >{{ props.label }}</label
    >

    <div class="relative">
      <input
        :disabled="props.isDisabled"
        :name="props.name"
        v-maska="mask"
        v-model="internalValue"
        :type="inputType"
        :placeholder="props.placeholder"
        class="block w-full text-[#115E59] h-[45px] px-3 py-2 font-normal placeholder:text-[#115E5980] bg-white bg-clip-padding border-2 rounded-lg transition-colors duration-200 focus:bg-white focus:outline-none"
        :class="{
          'border-[#EF4444]': props.error,
          'border-[#99F6E4] focus:border-teal-500': !props.error,
          'pr-10': props.type === 'password',
          '!text-[#115E5980]': props.isDisabled,
        }"
      />

      <button
        tabindex="-1"
        v-if="props.type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#115E59] cursor-pointer"
        aria-label="Alternar visibilidade da senha"
      >
        <LucideEyeOff v-if="isPasswordVisible" name="EyeOff" class="h-5 w-5" />
        <LucideEye v-else name="Eye" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>
