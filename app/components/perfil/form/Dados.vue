<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { usePatientService } from '~/services/usePatientService'
import moment from 'moment'

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const birthDateSchema = z
  .string()
  .min(1, 'Data de Nascimento é obrigatório')
  .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
    message: 'Formato de data inválido. Use dd/mm/aaaa.',
  })
  .refine(
    (val) => {
      const [day, month] = val.split('/').map(Number)
      if (day < 1 || day > 31) return false
      if (month < 1 || month > 12) return false
      return true
    },
    {
      message: 'Dia ou mês inválido.',
    }
  )
  .refine(
    (val) => {
      const [day, month, year] = val.split('/').map(Number)

      const date = new Date(year, month - 1, day)
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      )
    },
    {
      message: 'Data inexistente',
    }
  )
const schema = z.object({
  full_name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .refine(
      (val) => {
        return val.length >= 3
      },
      {
        message: 'Porfavor, insira seu nome completo',
      }
    ),
  email: z.email('Digite um email válido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine(
      (val) => {
        return val.length === 15
      },
      {
        message: 'Porfavor, insira um telefone válido',
      }
    ),
  birth_date: birthDateSchema,
})

type Schema = z.output<typeof schema>

const userData = await ref(props.patient)

const state = reactive<Partial<Schema>>({
  full_name: userData.value.full_name ?? '',
  email: userData.value.email ?? '',
  phone: userData.value.phone ?? '',
  birth_date: moment(userData.value.birth_date).format('DD/MM/YYYY') ?? '',
})

const emit = defineEmits(['updateUserData'])
const useLoading = useLoadingStore()
const patientService = usePatientService()
const formIsSuccess = ref(false)
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  useLoading.loading = true

  const payload = {
    full_name: event.data.full_name,
    email: event.data.email,
    phone: event.data.phone.replace(/\D/g, ''),
    birth_date: event.data.birth_date,
  }

  try {
    const { data, error } = await patientService.updatePatient(payload)

    if (error.value) {
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao atualizar os dados'
      useAlert.showAlert('Erro na Atualização', errorMessage, 'error')
      formIsSuccess.value = false
    }

    if (data.value && !data.value.is_error) {
      useAlert.showAlert(
        'Sucesso',
        'Informações atualizadas com sucesso.',
        'success'
      )
      formIsSuccess.value = true
      emit('updateUserData', payload)
    }
  } catch (error) {
    console.error(error)
    formIsSuccess.value = false
  } finally {
    useLoading.loading = false
    isFormDisabled.value = true
  }
}

const form = ref()
const isFormDisabled = ref(true)
const useAlert = useAlertStore()
watch(isFormDisabled, (newValue) => {
  if (newValue == true && formIsSuccess.value == false) {
    state.full_name = userData.value.full_name ?? ''
    state.email = userData.value.email ?? ''
    form.value?.validate()
  }

  formIsSuccess.value = false
})
</script>

<template>
  <div
    class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-6"
  >
    <div class="w-full flex justify-between items-center">
      <h1 class="text-[#134E4A] text-[18px] font-semibold">
        Informações Pessoais
      </h1>

      <button
        type="button"
        @click="isFormDisabled = !isFormDisabled"
        :class="{
          'text-[#042F2E]': isFormDisabled,
          'bg-[#99F6E4]': !isFormDisabled,
        }"
        class="flex items-center gap-2 rounded-[10px] px-3 py-1 cursor-pointer"
      >
        <LucideSquarePen :size="16" :stroke-width="3" />
        <span class="font-medium">{{
          isFormDisabled ? 'Editar' : 'Cancelar'
        }}</span>
      </button>
    </div>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField name="full_name" v-slot="{ error }">
        <CustomInput
          label="Nome Completo"
          type="text"
          v-model="state.full_name"
          placeholder="Digite seu nome completo"
          :error="!!error"
          :is-disabled="isFormDisabled"
        />
      </UFormField>

      <UFormField name="email" v-slot="{ error }">
        <CustomInput
          label="E-mail"
          v-model="state.email"
          type="email"
          placeholder="seu@email.com"
          :error="!!error"
          :is-disabled="isFormDisabled"
        />
      </UFormField>

      <div class="flex flex-row gap-2">
        <UFormField name="phone" class="w-full" v-slot="{ error }">
          <CustomInput
            label="Telefone"
            v-model="state.phone"
            type="text"
            mask="(##) #####-####"
            placeholder="(00) 00000-0000"
            :error="!!error"
            :is-disabled="isFormDisabled"
          />
        </UFormField>

        <UFormField name="birth_date" class="w-full" v-slot="{ error }">
          <CustomInput
            label="Data de Nascimento"
            v-model="state.birth_date"
            type="text"
            mask="##/##/####"
            placeholder="dd/mm/aaaa"
            :error="!!error"
            :is-disabled="isFormDisabled"
          />
        </UFormField>
      </div>

      <div v-if="!isFormDisabled" class="grid grid-cols-2 gap-5">
        <button
          type="submit"
          class="bg-[#042F2E] text-white font-semibold text-[14px] px-5 py-2 rounded-[10px] cursor-pointer"
        >
          Salvar Alterações
        </button>

        <button
          @click.prevent="isFormDisabled = !isFormDisabled"
          type="button"
          class="text-[#3F3F46] font-medium border-2 border-[#99F6E4] rounded-[10px] px-5 py-2 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </UForm>
  </div>
</template>
