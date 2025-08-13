<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import CustomInput from '~/components/CustomInput.vue'
import { Mail } from 'lucide-vue-next'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useRecoverService } from '~/services/useRecoverService'

const { requestRecoverEmail } = useRecoverService()

const schema = z.object({
  email: z.email('Email inválido'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
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

  try {
    await requestRecoverEmail(state.email!)

    startTimer()

    toast.add({
      title: 'Sucesso!',
      description: 'Código enviado para seu e-mail.',
      color: 'success',
    })

    router.push('/recuperar-senha-code')
  } catch (err) {
    toast.add({
      title: 'Erro',
      description: 'Não foi possível enviar o código.',
      color: 'error',
    })
  }
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
          <div class="bg-[#0F766E] rounded-[20px] p-3.5">
            <Mail :size="42" stroke-width="1" color="#F0F4F4" />
          </div>
          <h1 class="text-[#042F2E] font-semibold text-[22px]">
            Esqueceu sua senha?
          </h1>
          <p class="text-[#0F766E] text-[14px] font-medium text-center">
            Digite seu e-mail e enviaremos um <br />
            código para redefinir sua senha
          </p>
        </div>

        <UFormField label="Email" name="email" v-slot="{ error }">
          <CustomInput
            v-model="state.email"
            placeholder="seu@email.com"
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
