<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface SelectOption {
  value: string | number
  label: string
  icon?: string
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as () => SelectOption[],
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Selecione uma opção',
  },
  error: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectElement = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue)
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: SelectOption) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    selectElement.value &&
    !selectElement.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="selectElement">
    <button
      type="button"
      @click="toggleDropdown"
      class="relative w-full cursor-pointer rounded-lg border-2 bg-white py-2 pl-3 pr-10 text-left transition-colors duration-200"
      :class="{
        'border-red-500': props.error,
        'border-teal-200 hover:border-teal-400': !props.error,
      }"
    >
      <span
        class="block truncate"
        :class="{ 'text-gray-400': !selectedOption }"
      >
        {{ selectedOption ? selectedOption.label : props.placeholder }}
      </span>

      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <LucideChevronDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </button>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="isOpen"
        class="absolute space-y-0.5 z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border-1 border-teal-100 bg-white text-base shadow-lg sm:text-sm p-2"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          @click="selectOption(option)"
          class="relative rounded-[10px] flex gap-1 cursor-pointer select-none p-1 text-[#042F2E]"
          :class="{
            'bg-[#99F6E480]': modelValue === option.value,
          }"
        >
          <span
            class="flex items-center text-white"
            :class="{
              '!text-teal-600': modelValue === option.value,
            }"
          >
            <LucideCheck class="h-5 w-5" aria-hidden="true" />
          </span>
          <span class="block truncate text-[16px] font-medium">
            {{ option.label }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>
