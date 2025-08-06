<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import IconLogo from '~/assets/icons/logo.svg?component'

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

const schema = z
  .object({
    full_name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    birth_date: birthDateSchema,
    health_condition: z.string().min(1, 'Condição de Saúde é obrigatório'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    password_confirmation: z
      .string()
      .min(8, 'A confirmação deve ter no mínimo 8 caracteres'),
    accept_terms: z.boolean().refine((val) => val, {
      message: 'Aceite os termos de uso',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não correspondem',
    path: ['password_confirmation'],
  })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  full_name: '',
  email: '',
  phone: '',
  cpf: '',
  birth_date: '',
  health_condition: '',
  password: '',
  password_confirmation: '',
  accept_terms: false,
})

const useLoading = useLoadingStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  useLoading.loading = true

  console.log(event.data)
  setTimeout(() => {
    useLoading.loading = false
  }, 4000)
}
</script>

<template>
  <div class="flex justify-center w-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
    <UCard class="w-full h-fit rounded-[15px] max-w-2xl">
      <div class="flex flex-col items-center gap-1">
        <div class="bg-[#CCFBF1] rounded-[20px] p-2">
          <IconLogo width="57px" />
        </div>
        <h1 class="text-[#042F2E] font-semibold text-[22px]">Cadastre-se</h1>
        <p class="text-[#0F766E] text-[14px] font-medium text-center">
          Crie sua conta para acessar o sistema
        </p>
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 mt-3"
        @submit="onSubmit"
      >
        <UFormField name="full_name" v-slot="{ error }">
          <CustomInput
            label="Nome Completo"
            type="text"
            v-model="state.full_name"
            placeholder="Digite seu nome completo"
            :error="!!error"
          />
        </UFormField>

        <UFormField name="email" v-slot="{ error }">
          <CustomInput
            label="E-mail"
            v-model="state.email"
            type="email"
            placeholder="seu@email.com"
            :error="!!error"
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
            />
          </UFormField>
          <UFormField name="cpf" class="w-full" v-slot="{ error }">
            <CustomInput
              label="CPF"
              v-model="state.cpf"
              type="text"
              mask="###.###.###-##"
              placeholder="000.000.000-00"
              :error="!!error"
            />
          </UFormField>
        </div>
        <div class="flex flex-row gap-2">
          <UFormField name="birth_date" class="w-full" v-slot="{ error }">
            <CustomInput
              label="Data de Nascimento"
              v-model="state.birth_date"
              type="text"
              mask="##/##/####"
              placeholder="dd/mm/aaaa"
              :error="!!error"
            />
          </UFormField>
          <UFormField name="health_condition" class="w-full" v-slot="{ error }">
            <CustomInput
              label="Condição de Saúde"
              v-model="state.health_condition"
              type="text"
              placeholder="Ex: Diabetes, Hipertensão"
              :error="!!error"
            />
          </UFormField>
        </div>

        <UFormField name="password" v-slot="{ error }">
          <CustomInput
            label="Senha"
            v-model="state.password"
            type="password"
            placeholder="Senha"
            :error="!!error"
          />
        </UFormField>

        <UFormField name="password_confirmation" v-slot="{ error }">
          <CustomInput
            label="Confirme sua Senha"
            v-model="state.password_confirmation"
            type="password"
            placeholder="Confirme sua senha"
            :error="!!error"
          />
        </UFormField>

        <UFormField name="terms" v-slot="{ error }">
          <UFormField name="accept_terms" v-slot="{ error }">
            <UIFormCheckBox
              label="Eu aceito os Termos de Uso e a Política de Privacidade"
              v-model="state.accept_terms"
              :error="!!error"
            />
          </UFormField>
        </UFormField>

        <button
          type="submit"
          class="font-extrabold text-[16px] w-full h-[50px] rounded-[15px]"
          :disabled="!state.accept_terms"
          :class="{
            'bg-[#134E4AB2] text-[#ffffff70]': !state.accept_terms,
            'bg-[#134E4A] text-white': state.accept_terms,
          }"
        >
          Criar Conta
        </button>
      </UForm>

      <div class="mt-7">
        <p class="text-[#115E59] text-[13px] font-medium text-center">
          Já tem uma conta?
          <NuxtLink to="/login" class="font-bold">Entrar</NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>
