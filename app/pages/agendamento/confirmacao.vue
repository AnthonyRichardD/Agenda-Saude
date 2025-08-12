<script setup lang="ts">
import moment from 'moment'

definePageMeta({
  middleware: ['auth'],
})

const useScheduling = useSchedulingStore()
if (useScheduling.formData.slot == undefined) {
  navigateTo('/home')
}

const selectedDoctor = computed(() => {
  return useScheduling.doctors.find(
    (doc) => doc.value == useScheduling.formData.doctor
  )
})

const selectedService = computed(() => {
  return useScheduling.services.find(
    (service) => service.value == useScheduling.formData.service
  )
})

const formattedDate = computed(() => {
  if (!useScheduling.formData.slot?.start_time) return ''
  const date = new Date(useScheduling.formData.slot.start_time)

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
})

const dayOfWeek = computed(() => {
  if (!useScheduling.formData.slot?.start_time) return ''
  const date = new Date(useScheduling.formData.slot.start_time)

  const day = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date)
  return day.charAt(0).toUpperCase() + day.slice(1)
})

onUnmounted(() => {
  useScheduling.resetFormData()
})
</script>

<template>
  <div
    class="w-full p-5 bg-[#EAFDF9] min-h-full p-[20px flex justify-center items-center flex-col"
  >
    <LucideCircleCheck
      class="mb-5"
      :size="100"
      stroke-width="1"
      color="#0F766E"
    />
    <div class="space-y-[9px] text-center">
      <h1 class="text-[#042F2E] font-semibold text-[28px]">
        Agendamento Confirmado!
      </h1>
      <p class="text-black text-[16px] font-medium">
        Sua consulta foi agendada com sucesso
      </p>
    </div>

    <div
      class="w-full my-[26px] bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-7"
    >
      <div class="space-y-6">
        <div class="flex items-center gap-2">
          <LucideUser :size="24" color="#0F766E" />
          <div class="text-[15px] text-[#042F2E]">
            <h2 class="font-bold">{{ selectedService?.label }}</h2>
            <p class="font-medium">{{ selectedDoctor?.label }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <LucideCalendar :size="24" color="#0F766E" />
          <div class="text-[15px] text-[#042F2E]">
            <h2 class="font-bold">{{ formattedDate }}</h2>
            <p class="font-medium">{{ dayOfWeek }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <LucideClock :size="24" color="#0F766E" />
          <div class="text-[15px] text-[#042F2E]">
            <h2 class="font-bold">
              {{
                moment(useScheduling.formData.slot?.start_time).format('HH:mm')
              }}
            </h2>
            <p class="font-medium">Chegar 20 min antes</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full space-y-2">
      <UButton
        @click="navigateTo('/home')"
        type="button"
        class="cursor-pointer bg-[#134E4A] w-full text-[#F0F4F4] text-[16px] font-extrabold flex justify-center items-center h-[50px] rounded-[15px] hover:bg-[#134E4A] active:bg-[#134E4A]"
      >
        Voltar ao Início
      </UButton>
      <UButton
        type="button"
        class="cursor-pointer bg-transparent w-full border-2 border-[#99F6E4] text-[#042F2E] text-[16px] font-extrabold flex justify-center items-center h-[50px] rounded-[15px] hover:bg-transparent active:bg-transparent"
      >
        Ver minhas consultas
      </UButton>
    </div>
  </div>
</template>
