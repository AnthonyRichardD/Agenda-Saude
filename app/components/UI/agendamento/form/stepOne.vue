<script setup lang="ts">
const useScheduling = useSchedulingStore()
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  service: z.string().min(1, 'Serviço é obrigatório'),
})

type Schema = z.output<typeof schema>
const userScheduling = useSchedulingStore()

const state = reactive<Partial<Schema>>({
  service: useScheduling.formData.service || '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  useScheduling.formData.service = event.data.service
  useScheduling.nextStep()
}
</script>

<template>
  <div v-if="useScheduling.step === 1">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <div
        class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-7"
      >
        <h1 class="text-[#042F2E] text-[24px] font-semibold">
          Selecione o Serviço
        </h1>
        <UFormField label="Serviço" name="service" v-slot="{ error }">
          <UIFormSelect
            v-model="state.service"
            name="service"
            :error="!!error"
            :options="useScheduling.services"
            placeholder="Selecione um serviço"
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
