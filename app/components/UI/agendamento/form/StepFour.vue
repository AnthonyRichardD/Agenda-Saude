<script setup lang="ts">
const useScheduling = useSchedulingStore()
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useConsultationService } from '~/services/useConsultationService'
import moment from 'moment'

const schema = z.object({
  slot: z.union([
    z.undefined().refine((val) => !!val, {
      message: 'Selecione um horário',
    }),
    z.object({
      slot_id: z.number(),
      start_time: z.string(),
      end_time: z.string(),
    }),
  ]),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  slot: useScheduling.formData.slot || undefined,
})

const useLoading = useLoadingStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  useScheduling.formData.slot = event.data.slot

  useLoading.loading = true

  setTimeout(() => {
    useLoading.loading = false
    navigateTo('/agendamento/confirmacao')
  }, 4000)
}

const consultationService = useConsultationService()
const getAvailableSlot = async (professionalId: string, date: string) => {
  const { data, error } =
    await consultationService.getAvailableSlotByProfessional(
      professionalId,
      date
    )

  if (error.value) {
    console.error('Erro ao buscar serviços:', error.value.message)
  }

  if (data.value) {
    useScheduling.slots = data.value
  }
}

await getAvailableSlot(
  useScheduling.formData.doctor,
  useScheduling.formData.date
)

const form = ref()
watch(
  () => state.slot,
  () => {
    if (form.value) {
      form.value.validate('slot')
    }
  }
)
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
        class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-7"
      >
        <h1 class="text-[#042F2E] text-[24px] font-semibold">
          Escolha o Horário
        </h1>

        <UFormField class="text-center" name="slot" v-slot="{ error }">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="slot in useScheduling.slots"
              @click="state.slot = slot"
              :key="slot.slot_id"
              class="border-2 cursor-pointer border-[#99F6E4] rounded-[10px] p-3 text-center text-[#134E4A] text-[16px] font-medium"
              :class="{
                'bg-[#0F766E] text-white !border-[#0F766E]':
                  state.slot?.slot_id == slot.slot_id,
              }"
            >
              {{ moment(slot.start_time).format('HH:mm') }}
            </div>
          </div>
        </UFormField>
      </div>

      <div class="flex justify-end">
        <UButton
          type="submit"
          class="bg-[#134E4A] w-full text-[#F0F4F4] text-[16px] font-extrabold flex justify-center items-center h-[50px] rounded-[15px] hover:bg-[#134E4A]"
        >
          Confirmar Agendamento
        </UButton>
      </div>
    </UForm>
  </div>
</template>
