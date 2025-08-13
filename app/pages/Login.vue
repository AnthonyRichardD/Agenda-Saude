<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import IconLogo from '~/assets/icons/logo.svg?component'
type Schema = z.output<typeof schema>

const auth = useAuthStore()
if (auth.isAuthenticated()) {
  navigateTo('/home')
}

const schema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const useLoading = useLoadingStore()
const { login } = useLoginStore()
const alertStore = useAlertStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  useLoading.loading = true
  const payload = {
    email: event.data.email,
    password: event.data.password,
  }

  try {
    const { data, error } = await login(payload)

    if (error.value) {
      alert(error.value)
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao entrar na conta.'
      alertStore.showAlert('Erro no login', errorMessage, 'error')

      console.error('Erro da API:', errorMessage)
      return
    }

    if (data.value) {
      if (!data.value.is_error) {
        const token = useCookie('auth_token')
        token.value = data.value.data.token

        const user = useCookie('user')
        user.value = data.value.data.user

        alertStore.hideAlert()
        navigateTo('/home')
      }
    }
  } catch (e) {
    console.error('Ocorreu um erro inesperado no processo:', e)
  } finally {
    useLoading.loading = false
  }
}
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
    <UIHeaderBack title="Entrar" link="/" />
    <div class="flex items-center justify-center h-full">
      <UCard
        class="w-full h-fit rounded-[15px] max-w-2xl border-2 border-[#CCFBF1]"
      >
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="flex flex-col items-center gap-1">
            <div
              class="bg-[#CCFBF1] rounded-[20px] w-[75px] h-[75px] flex items-center justify-center"
            >
              <IconLogo class="mr-[-3px]" width="57px" />
            </div>
            <h1 class="text-[#042F2E] font-semibold text-[22px]">
              Bem vindo de volta!
            </h1>
            <p class="text-[#0F766E] text-[14px] font-medium text-center">
              Entre com sua conta para continuar
            </p>
          </div>

          <UFormField label="Email" name="email" v-slot="{ error }">
            <CustomInput
              v-model="state.email"
              type="email"
              placeholder="seu@email.com"
              :error="!!error"
            />
          </UFormField>

          <UFormField label="Password" name="password" v-slot="{ error }">
            <CustomInput
              v-model="state.password"
              type="password"
              placeholder="Senha"
              :error="!!error"
            />
          </UFormField>

          <UFormField>
            <div class="flex items-center justify-between w-full gap-4">
              <UIFormCheckBox label="Lembrar de mim?" />
              <NuxtLink
                to="/recuperar-senha"
                class="text-[#115E59] text-[13px] font-bold text-center"
                >Esqueceu a senha?</NuxtLink
              >
            </div>
          </UFormField>

          <button
            type="submit"
            class="bg-[#134E4A] text-white font-extrabold text-[16px] w-full h-[50px] rounded-[15px] transition-colors duration-200"
          >
            Entrar
          </button>
        </UForm>

        <div class="mt-7">
          <p class="text-[#115E59] text-[13px] font-medium text-center">
            Não tem uma conta?
            <NuxtLink to="/cadastro" class="font-bold">Cadastre-se</NuxtLink>
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>
