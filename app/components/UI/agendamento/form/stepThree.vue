<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date'
import { useConsultationService } from '~/services/useConsultationService'
import moment from 'moment'

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const form = ref()

const schema = z.object({
  date: z.string().min(1, 'Selecione uma data.'),
})

type Schema = z.output<typeof schema>
const useScheduling = useSchedulingStore()

const selectedDate = ref<DateValue | undefined>()
const state = reactive<Partial<Schema>>({
  date: useScheduling.formData.date || '',
})

watch(selectedDate, () => {
  if (selectedDate.value === undefined) {
    state.date = ''
  } else {
    state.date = selectedDate.value.toString()
  }

  if (form.value) {
    form.value.validate('date')
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  useScheduling.formData.date = event.data.date
  console.log('data depois do passo 3', useScheduling.formData)
  useScheduling.nextStep()
}

const availableDatesSet = computed(() => new Set(useScheduling.availableDates))

const minDate = computed(() => {
  if (useScheduling.availableDates.length === 0) return new Date()
  const sortedDates = [...useScheduling.availableDates].sort()
  return new Date(sortedDates[0] + 'T00:00:00')
})

const maxDate = computed(() => {
  if (useScheduling.availableDates.length === 0) return undefined
  const sortedDates = [...useScheduling.availableDates].sort()
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

const consultationService = useConsultationService()
const getAvailableDays = async (professionalId: string) => {
  const { data, error } =
    await consultationService.getAvailableDaysByProfessional(professionalId)

  if (error.value) {
    console.error('Erro ao buscar serviços:', error.value.message)
  }

  if (data.value) {
    useScheduling.availableDates = data.value
  }
}

onMounted(async () => {
  if (useScheduling.formData.date) {
    selectedDate.value = new CalendarDate(
      Number(moment(useScheduling.formData.date).format('YYYY')),
      Number(moment(useScheduling.formData.date).format('MM')),
      Number(moment(useScheduling.formData.date).format('DD'))
    )
  }
  await getAvailableDays(useScheduling.formData.doctor)
})
</script>

<template>
  <div>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <div
        class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] flex flex-col justify-center items-center gap-4"
      >
        <h1 class="text-[#042F2E] text-[24px] font-semibold w-full text-start">
          Escolha a Data
        </h1>
        <UFormField class="w-full max-w-xs" name="date">
          <div
            class="w-full bg-white border-2 border-[#99F6E4] p-2 rounded-[15px]"
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
        </UFormField>
        <div
          v-if="state.date == ''"
          class="bg-[#D8E9FF] text-[13px] w-full max-w-xs h-[53px] text-[#1A4592CC] flex justify-center items-center rounded-[15px] p-3 pl-6"
        >
          <p>
            <span class="font-bold"> Dica: </span>
            <span
              >Os dias destacados são os únicos disponíveis para este
              médico.</span
            >
          </p>
        </div>
      </div>
      <div class="flex justify-end">
        <UButton
          type="submit"
          class="bg-[#134E4A] w-full text-[#F0F4F4] text-[16px] font-extrabold flex justify-center items-center h-[50px] rounded-[15px] hover:bg-[#134E4A]"
        >
          Continuar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
