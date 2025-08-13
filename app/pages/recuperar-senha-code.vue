<script setup lang="ts">
import { UCard } from '#components'
import * as z from 'zod'
import CustomInput from '~/components/CustomInput.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useTimerPage } from '~/composables/userTimePage'
import { Shield } from 'lucide-vue-next'
import { useRecoverService } from '~/services/useRecoverService'

const router = useRouter()
const queryCode = ref(router.currentRoute.value.query.code)

const { remainingTime, startTimer, updateRemainingTime } = useTimerPage()
const { verifyCode } = useRecoverService()

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

const schema = z.object({
  code: z.string().min(6, 'O código deve ter 6 dígitos'),
})

const state = reactive({
  code: queryCode.value ? String(queryCode.value) : '',
})

type Schema = z.infer<typeof schema>

const useAlert = useAlertStore()
const useLoading = useLoadingStore()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  useLoading.loading = true
  if (!isFormValid.value) return
  const payload = {
    code: event.data.code,
  }
  try {
    const { data, error } = await verifyCode(payload)

    if (error.value) {
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao verificar o código'
      useAlert.showAlert('Erro ao verificar código', errorMessage, 'error')
      return
    }

    if (data.value && !data.value.is_error) {
      useAlert.showAlert('Sucesso', 'Código verificado com sucesso.', 'success')
      const token = data?.value?.tempToken

      const tempToken = useCookie('auth_token', {
        maxAge: 600,
        sameSite: 'strict',
        secure: true,
      })
      tempToken.value = token
      navigateTo('/recuperar-senha-nova')
    }
  } catch (err) {
    useAlert.showAlert(
      'Erro',
      'Erro interno no servidor, tente novamente mais tarde',
      'error'
    )
  } finally {
    useLoading.loading = false
  }
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

const formRef = ref()
const isFormValid = computed(() => {
  return state.code?.length >= 6 && !formRef.value?.errors?.code
})
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8">
    <UIHeaderBack title="Código de Verificação" link="/recuperar-senha" />
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
              <Shield :size="42" stroke-width="1" color="#F0F4F4" />
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
  </div>
</template>
