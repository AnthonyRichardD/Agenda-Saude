<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import IconLogo from '~/assets/icons/shield-icon.svg?component'
import CustomInput from '~/components/CustomInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useTimerPage } from '~/composables/userTimePage'

const { remainingTime, startTimer, updateRemainingTime } = useTimerPage()
const toast = useToast()

const canResend = computed(() => remainingTime.value <= 0)
const displayTime = ref('05:00')

const updateDisplay = () => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  displayTime.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateRemainingTime()

  interval = setInterval(() => {
    updateRemainingTime()
    updateDisplay()

    if (remainingTime.value <= 0 && interval) {
      clearInterval(interval)
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Sucesso!',
    description: 'Código verificado com sucesso.',
  })
}

async function resendCode() {
  if (!canResend.value) return

  try {
    startTimer()
    if (!interval) {
      interval = setInterval(() => {
        updateRemainingTime()
        updateDisplay()
      }, 1000)
    }
  } catch (error) {}
}

const schema = z.object({
  code: z.string().min(6, 'O código deve ter 6 dígitos'),
})

const state = reactive({
  code: '',
})

const formRef = ref()
const isFormValid = computed(() => {
  return state.code?.length >= 6 && !formRef.value?.errors?.code
})
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
            Digite o Código
          </h1>
          <p class="text-[#0F766E] text-[14px] font-medium text-center">
            Enviamos um código de 6 digitos para <br />
            seu email
          </p>
        </div>

        <UFormField
          label="Código de verificação"
          name="code"
          v-slot="{ error }"
        >
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
          :class="
            isFormValid
              ? 'bg-[#134E4A] text-white'
              : 'bg-[#134E4AB2] text-[#ffffff70]'
          "
          :disabled="!isFormValid"
        >
          Verificar Código
        </button>

        <div class="mt-7">
          <p class="text-[#115E59] text-[13px] font-medium text-center">
            Não recebeu o código?
            <button
              @click="resendCode"
              :disabled="!canResend"
              class="font-bold"
              :class="
                canResend
                  ? 'text-[#134E4A] cursor-pointer'
                  : 'text-[#134E4A70] cursor-default'
              "
            >
              <span v-if="!canResend"> Reenviar em {{ displayTime }} </span>
              <span v-else>Reenviar código</span>
            </button>
          </p>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
