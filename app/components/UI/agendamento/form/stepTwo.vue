<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  medic: z.string().min(1, 'Escolha um médico'),
})

type Schema = z.output<typeof schema>

const useScheduling = useSchedulingStore()
const state = reactive<Partial<Schema>>({
  medic: useScheduling.formData.doctor || '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  useScheduling.formData.doctor = event.data.medic
  useScheduling.nextStep()
}

const medicosDisponiveis = ref([
  {
    value: 'carlos-roberto',
    label: 'Dr. Carlos Roberto',
    description: 'Disponível para consultas',
  },
  {
    value: 'ana-beatriz',
    label: 'Dra. Ana Beatriz',
    description: 'Disponível para consultas',
  },
  {
    value: 'bruna-tavares',
    label: 'Dra. Bruna Tavares',
    description: 'Disponível para consultas',
  },
])
</script>

<template>
  <div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div
        class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-7"
      >
        <h1 class="text-[#042F2E] text-[24px] font-semibold">
          Escolha o Médico
        </h1>

        <UFormField name="medic" v-slot="{ error }">
          <UIAgendamentoMedicSelect
            v-model="state.medic"
            :options="medicosDisponiveis"
            :error="!!error"
          />
        </UFormField>
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
