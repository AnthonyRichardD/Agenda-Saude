<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import IconLogo from '~/assets/icons/shield-icon.svg?component'
import CustomInput from '~/components/CustomInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useTimerPage } from '~/composables/userTimePage'

const timerPage = useTimerPage()
const remaining = ref(300) 
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (timerPage.value) {
    interval = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value--
      } else {
        clearInterval(interval!)
      }
    }, 1000)
    timerPage.value = false 
  }
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

const schema = z.object({
  code: z.string().min(6, 'A senha deve ter no mínimo 8 caracteres'),
})

const state = reactive<Partial<Schema>>({
  code: '',
})

type Schema = z.output<typeof schema>

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Sucesso!',
    description: 'O formulário foi enviado.',
    color: 'success',
  })
  console.log(event.data)
}

const formRef = ref()
const isFormValid = computed(() => {
  return (
    state.code?.length >= 6 &&
    !formRef.value?.errors?.code
  )
})

</script>

<template>
    <div class="flex justify-center w-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
        <UCard class="w-full h-fit rounded-[15px] max-w-2xl">   
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">  
                <div class="flex flex-col items-center gap-1">
                    <div>
                        <IconLogo width="57px" />
                    </div>
                    <h1 class="text-[#042F2E] font-semibold text-[22px]">Digite o Código</h1>
                    <p class="text-[#0F766E] text-[14px] font-medium text-center">
                        Enviamos um código de 6 digitos para <br> seu email
                    </p>  
                </div>

                <UFormField label="Código de verificação" name="code" v-slot="{ error }">
                    <CustomInput            
                        mask="######"
                        v-model="state.code"
                        placeholder="000000"
                        :error="!!error"
                    />
                    
                </UFormField>

                <button
                type="submit"
                class="font-extrabold text-[16px] w-full h-[50px] rounded-[15px] transition-colors duration-200"
                :class="isFormValid
                    ? 'bg-[#134E4A] text-white'
                    : 'bg-[#134E4AB2] text-[#ffffff70]'"
                :disabled="!isFormValid"
                >
                Verificar Código
                </button>

                <div class="mt-7">
                    <p class="text-[#115E59] text-[13px] font-medium text-center">
                    Não recebeu o código? 
                    <NuxtLink class="font-bold">Reenviar em 
                    {{ Math.floor(remaining / 60) }}:
                    {{ String(remaining % 60).padStart(2, '0') }}</NuxtLink>
                    </p>
                </div>
            </UForm>    
        </UCard>
    </div>
</template>