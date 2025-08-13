<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
  }>(),
  {
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
}

const onConfirm = () => {
  emit('confirm')
  closeModal()
}

const onCancel = () => {
  emit('cancel')
  closeModal()
}
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60"
      @click.self="onCancel"
    >
      <div class="w-full max-w-md p-[20px]">
        <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100"
            >
              <LucideAlertTriangle class="h-6 w-6 text-red-600" />
            </div>

            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900">
                {{ title }}
              </h3>
              <p class="mt-2 text-sm text-gray-600">
                {{ message }}
              </p>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="onCancel"
              type="button"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {{ cancelText }}
            </button>
            <button
              @click="onConfirm"
              type="button"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
