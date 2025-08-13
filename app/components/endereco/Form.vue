<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

type FormType = 'create' | 'update'

defineProps({
  type: {
    type: String as () => FormType,
    required: true,
  },
})

const schema = z.object({
  address_name: z.string().min(3, 'Digite no mínimo de 3 letras'),
  zip_code: z.string().length(9, 'CEP deve ter 8 digitos'),
  street: z.string().min(3, 'Digite no mínimo de 3 letras'),
  neighborhood: z.string().min(3, 'Digite no mínimo de 3 letras'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 letras'),
  state: z
    .string()
    .min(2, 'Estado deve ter pelo menos 2 letras')
    .max(2, 'Estado deve ter apenas 2 letras'),
})

type Schema = z.infer<typeof schema>

const useAddress = useAddressStore()

const { address } = storeToRefs(useAddress)

const state = reactive<Partial<Schema>>({
  address_name: address.value ? address.value.address_name : '',
  zip_code: address.value ? address.value.zip_code : '',
  street: address.value ? address.value.street : '',
  neighborhood: address.value ? address.value.neighborhood : '',
  number: address.value ? address.value.number : '',
  complement: address.value ? address.value.complement : '',
  city: address.value ? address.value.city : '',
  state: address.value ? address.value.state : '',
})

const emit = defineEmits(['formSubmited'])
const onSubmit = (event: FormSubmitEvent<Schema>) => {
  emit('formSubmited', event.data)
}

onUnmounted(() => {
  address.value = undefined
})
</script>

<template>
  <div
    class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px]"
  >
    <div class="flex justify-start items-center gap-2 mb-4">
      <LucideMapPin :size="24" color="#115E59" />
      <h1 class="text-[#042F2E] text-[24px] font-semibold">
        {{ type === 'create' ? 'Adicionar Endereço' : 'Editar Endereço' }}
      </h1>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField name="address_name" v-slot="{ error }">
        <CustomInput
          label="Nome do endereço"
          type="text"
          v-model="state.address_name"
          placeholder="Ex: Casa, Trabalho"
          :error="!!error"
        />
      </UFormField>

      <UFormField name="zip_code" v-slot="{ error }">
        <CustomInput
          label="CEP"
          type="text"
          v-model="state.zip_code"
          mask="#####-###"
          placeholder="00000-000"
          :error="!!error"
        />
      </UFormField>

      <UFormField name="street" v-slot="{ error }">
        <CustomInput
          label="Rua"
          type="text"
          v-model="state.street"
          placeholder="Nome da rua"
          :error="!!error"
        />
      </UFormField>

      <UFormField name="neighborhood" v-slot="{ error }">
        <CustomInput
          label="Bairro"
          type="text"
          v-model="state.neighborhood"
          placeholder="Nome do bairro"
          :error="!!error"
        />
      </UFormField>

      <div class="flex flex-row gap-2">
        <UFormField name="number" v-slot="{ error }">
          <CustomInput
            label="Número"
            type="text"
            v-model="state.number"
            placeholder="Ex: 123"
            :error="!!error"
          />
        </UFormField>

        <UFormField name="complement" v-slot="{ error }">
          <CustomInput
            label="Complemento"
            type="text"
            v-model="state.complement"
            placeholder="Ex: Apto, Bloco"
            :error="!!error"
          />
        </UFormField>
      </div>
      <div class="flex flex-row gap-2">
        <UFormField class="w-3/4" name="city" v-slot="{ error }">
          <CustomInput
            label="Cidade"
            type="text"
            v-model="state.city"
            placeholder="Nome da cidade"
            :error="!!error"
          />
        </UFormField>

        <UFormField class="w-1/4" name="state" v-slot="{ error }">
          <CustomInput
            label="Estado"
            type="text"
            v-model="state.state"
            placeholder="UF"
            :error="!!error"
          />
        </UFormField>
      </div>

      <div
        class="flex flex-col items-end gap-5 justify-between mt-9 min-[384px]:flex-row"
      >
        <button
          type="submit"
          class="bg-[#042F2E] font-medium text-white w-full text-[12px] min-[423px]:text-[14px] p-3 rounded-[10px] border-2 border-[#042F2E] cursor-pointer"
        >
          {{ type === 'create' ? 'Adicionar Endereço' : 'Salvar Alterações' }}
        </button>

        <button
          @click.prevent="navigateTo('/perfil/enderecos')"
          type="button"
          class="border-2 border-[#99F6E4] font-medium w-full text-[#3F3F46] text-[12px] min-[423px]:text-[14px] p-3 rounded-[10px] cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </UForm>
  </div>
</template>
