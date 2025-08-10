<script setup lang="ts">
const useScheduling = useSchedulingStore()
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  slot: z.union([
    z.undefined().refine((val) => !!val, {
      message: 'Selecione um horário',
    }),
    z.object({
      id: z.number(),
      value: z.string(),
    }),
  ]),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  slot: useScheduling.formData.slot || undefined,
})

const useLoading = useLoadingStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  useScheduling.formData.slot = event.data.slot
  useLoading.loading = true

  setTimeout(() => {
    useLoading.loading = false
  }, 4000)
}

const mockSlots = reactive([
  {
    id: 1,
    value: '10:00',
  },
  {
    id: 2,
    value: '11:00',
  },
  {
    id: 3,
    value: '12:00',
  },
  {
    id: 4,
    value: '13:00',
  },
  {
    id: 5,
    value: '14:00',
  },
  {
    id: 6,
    value: '15:00',
  },
  {
    id: 7,
    value: '16:00',
  },
])

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
              v-for="slot in mockSlots"
              @click="state.slot = slot"
              :key="slot.id"
              class="border-2 cursor-pointer border-[#99F6E4] rounded-[10px] p-3 text-center text-[#134E4A] text-[16px] font-medium"
              :class="{
                'bg-[#0F766E] text-white !border-[#0F766E]':
                  state.slot?.id == slot.id,
              }"
            >
              {{ slot.value }}
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
