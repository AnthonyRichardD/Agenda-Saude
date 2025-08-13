<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import { LockKeyhole } from 'lucide-vue-next'
import CustomInput from '~/components/CustomInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRecoverService } from '~/services/useRecoverService'

definePageMeta({
  middleware: ['auth'],
})

const { resetPassword } = useRecoverService()

const schema = z
  .object({
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    password_confirmation: z
      .string()
      .min(8, 'A confirmação deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não correspondem',
    path: ['password_confirmation'],
  })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  password: '',
  password_confirmation: '',
})

const formRef = ref()

const isFormValid = computed(() => {
  return (
    state.password?.length &&
    state.password_confirmation?.length &&
    !formRef.value?.errors?.password &&
    !formRef.value?.errors?.password_confirmation
  )
})

const useAlert = useAlertStore()
const useLoading = useLoadingStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  useLoading.loading = true
  if (!isFormValid.value) return
  const payload = {
    new_password: event.data.password,
  }
  try {
    const tempToken = useCookie('auth_token')

    if (!tempToken.value) {
      navigateTo('/login')
    } else {
      const { data, error } = await resetPassword(payload, tempToken.value)

      if (error.value) {
        const errorMessage =
          error.value.data?.message || 'Ocorreu um erro ao atualizar a senha'
        useAlert.showAlert('Erro ao atualizar senha', errorMessage, 'error')
        return
      }

      if (data.value && !data.value.is_error) {
        useAlert.showAlert(
          'Sucesso',
          'Senha atualizada com sucesso.',
          'success'
        )
        tempToken.value = undefined
        setTimeout(() => {
          navigateTo('/login')
          useLoading.loading = false
        }, 500)
      }
    }
  } catch (err) {
    useAlert.showAlert(
      'Erro',
      'Erro interno no servidor, tente novamente mais tarde',
      'error'
    )
    useLoading.loading = false
  }
}
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
    <UIHeaderBack title="Nova senha" link="/recuperar-senha-code" />
    <div class="flex items-center justify-center h-full">
      <UCard class="w-full h-fit rounded-[15px] max-w-2xl">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="flex flex-col items-center gap-1">
            <div class="bg-[#0F766E] rounded-[20px] p-3.5">
              <LockKeyhole :size="42" stroke-width="1" color="#F0F4F4" />
            </div>
            <h1 class="text-[#042F2E] font-semibold text-[22px]">
              Criar nova Senha
            </h1>
            <p class="text-[#0F766E] text-[14px] font-medium text-center">
              Digite sua nova senha para a conta <br />
              Email
            </p>
          </div>

          <UFormField name="password" v-slot="{ error }">
            <CustomInput
              label="Nova Senha"
              v-model="state.password"
              type="password"
              placeholder="Digite sua nova Senha"
              :error="!!error"
            />
          </UFormField>

          <UFormField name="password_confirmation" v-slot="{ error }">
            <CustomInput
              label="Confirme sua Senha"
              v-model="state.password_confirmation"
              type="password"
              placeholder="Confirme sua nova Senha"
              :error="!!error"
            />
          </UFormField>

          <button
            type="submit"
            class="font-extrabold text-[16px] w-full h-[50px] rounded-[15px] transition-colors duration-200"
            :class="
              isFormValid
                ? 'bg-[#134E4A] text-white'
                : 'bg-[#134E4AB2] text-[#ffffff70]'
            "
            :disabled="!isFormValid"
          >
            Redefinir Senha
          </button>

          <UCard class="bg-[#D8E9FF80] w-full h-fit rounded-[15px] max-w-2xl">
            <h1 class="text-[#20488F] font-normal text-[14px]">
              Requisitos da Nova Senha
            </h1>
            <ul
              class="flex flex-col items-start ml-4 text-[#1A4592E5] text-[12px] font-normal text-start list-disc"
            >
              <li>Pelo menos 8 caracteres</li>
              <li>Uma letra maiúscula</li>
              <li>Uma letra minúscula</li>
              <li>Um caracter especial</li>
            </ul>
          </UCard>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
