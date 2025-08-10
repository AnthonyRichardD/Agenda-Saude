<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import IconLogo from '~/assets/icons/logo.svg?component'

const schema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const formRef = ref()

const isFormValid = computed(() => {
  return (
    state.email?.length &&
    state.password?.length &&
    !formRef.value?.errors?.email &&
    !formRef.value?.errors?.password
  )
})
const useLoading = useLoadingStore()
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  useLoading.loading = true
  toast.add({
    title: 'Sucesso!',
    description: 'O formulário foi enviado.',
    color: 'success',
  })
  console.log(event.data)
  setTimeout(() => {
    const token = useCookie('token')
    token.value = 'token'
    navigateTo('/home')
    useLoading.loading = false
  }, 4000)
}
</script>

<template>
  <div class="flex justify-center w-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
    <UCard class="w-full h-fit rounded-[15px] max-w-2xl">
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
              to="/"
              class="text-[#115E59] text-[13px] font-bold text-center"
              >Esqueceu a senha?</NuxtLink
            >
          </div>
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
</template>
