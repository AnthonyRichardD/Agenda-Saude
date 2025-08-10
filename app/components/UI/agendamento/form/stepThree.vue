<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DateValue } from '@internationalized/date'

const availableDatesFromApi = ref([
  '2025-08-15',
  '2025-08-18',
  '2025-08-22',
  '2025-09-01',
  '2025-09-02',
  '2025-09-10',
  '2025-12-09',
])

const selectedDate = ref<Date | null>(null)

const availableDatesSet = computed(() => new Set(availableDatesFromApi.value))

const minDate = computed(() => {
  if (availableDatesFromApi.value.length === 0) return new Date()
  const sortedDates = [...availableDatesFromApi.value].sort()
  return new Date(sortedDates[0] + 'T00:00:00')
})

const maxDate = computed(() => {
  if (availableDatesFromApi.value.length === 0) return undefined
  const sortedDates = [...availableDatesFromApi.value].sort()
  return new Date(sortedDates[sortedDates.length - 1] + 'T00:00:00')
})

const isDateUnavailable = (date: DateValue): boolean => {
  const dateString = date.toString()

  return !availableDatesSet.value.has(dateString)
}

const formatDate = (date: Date | null): string => {
  console.log(date)
  if (!date || !(date instanceof Date)) {
    return ''
  }
  return date.toLocaleDateString('pt-BR', {
    dateStyle: 'long',
    timeZone: 'UTC',
  })
}
</script>
<template>
  <div
    class="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center"
  >
    <div
      class="w-full max-w-xs mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
    >
      <UCalendar
        v-model="selectedDate"
        :is-date-unavailable="isDateUnavailable"
        :min-date="minDate"
        :max-date="maxDate"
        :year-controls="false"
        locale="pt-BR"
        class="w-full"
      />

      <div
        v-if="selectedDate"
        class="mt-6 w-full p-4 bg-primary-100 dark:bg-primary-900/50 border-l-4 border-primary-500 dark:border-primary-400 text-primary-700 dark:text-primary-300 rounded-lg"
      >
        <p class="font-semibold">Data selecionada:</p>
        <p class="text-lg">{{ selectedDate }}</p>
      </div>
      <div
        v-else
        class="mt-6 w-full p-4 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-lg text-center"
      >
        <p>Nenhuma data selecionada.</p>
      </div>
    </div>
  </div>
</template>
