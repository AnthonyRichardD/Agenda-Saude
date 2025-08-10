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

const isDateAvailable = (day: DateValue): boolean => {
  const dateString = day.toString()
  return availableDatesSet.value.has(dateString)
}
</script>

<template>
  <div
    class="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center"
  >
    <div
      class="w-full max-w-xs bg-white border-2 border-[#99F6E4] p-2 rounded-[15px]"
    >
      <UCalendar
        v-model="selectedDate"
        :is-date-unavailable="isDateUnavailable"
        :min-date="minDate"
        :max-date="maxDate"
        :year-controls="false"
        locale="pt-BR"
        class="w-full"
      >
        <template #day="{ day }">
          <UChip
            :show="isDateAvailable(day)"
            color="success"
            size="2xs"
            class="w-full h-full flex items-center justify-center"
          >
            <span>{{ day.day }}</span>
          </UChip>
        </template>
      </UCalendar>
    </div>
    <div v-if="selectedDate">
      <div
        class="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-lg"
      >
        <p class="font-semibold">Data selecionada:</p>
        <p class="text-lg">
          {{ new Date(selectedDate).toLocaleDateString('pt-BR') }}
        </p>
      </div>
    </div>
  </div>
</template>
