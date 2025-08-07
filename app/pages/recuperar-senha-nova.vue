<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import IconLogo from '~/assets/icons/email-icon.svg?component'
import CustomInput from '~/components/CustomInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'

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
  return state.email?.length && !formRef.value?.errors?.email
})

const { startTimer } = useTimerPage()
const router = useRouter()

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!isFormValid.value) return

  startTimer()

  toast.add({
    title: 'Sucesso!',
    description: 'Código enviado para seu e-mail.',
    color: 'success',
  })

  router.push('/recuperar-senha-code')
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
          <div>
            <IconLogo width="57px" />
          </div>
          <h1 class="text-[#042F2E] font-semibold text-[22px]">
            Esqueceu sua senha?
          </h1>
          <p class="text-[#0F766E] text-[14px] font-medium text-center">
            Digite seu e-mail e enviaremos um <br />
            código para redefinir sua senha
          </p>
        </div>

        <<UFormField name="password" v-slot="{ error }">
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
          Enviar Código
        </button>

        <div class="mt-7">
          <p class="text-[#115E59] text-[13px] font-medium text-center">
            Lembrou da senha?
            <NuxtLink to="/login" class="font-bold">Voltar ao login</NuxtLink>
          </p>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
