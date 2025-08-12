<script setup lang="ts">
const useScheduling = useSchedulingStore()
const handleBackToHome = () => {
  if (useScheduling.step === 1) {
    navigateTo('/home')
    return
  }

  useScheduling.step--
}
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <div class="mb-8 mt-4">
      <button
        type="button"
        @click="handleBackToHome"
        class="flex items-center justify-start gap-4 cursor-pointer"
      >
        <LucideArrowLeft class="text-[#0D9488]" :size="28" />
        <h1 class="text-[#042F2E] font-bold text-[20px]">Agendar Consulta</h1>
      </button>
    </div>
    <UIAgendamentoSteps
      class="mt-2"
      :max-steps="4"
      :steps-label="['Serviço', 'Médico', 'Data', 'Horário']"
    />

    <UIAgendamentoFormStepOne v-if="useScheduling.step === 1" />
    <UIAgendamentoFormStepTwo v-if="useScheduling.step === 2" />
    <UIAgendamentoFormStepThree v-if="useScheduling.step === 3" />
    <UIAgendamentoFormStepFour v-if="useScheduling.step === 4" />
  </div>
</template>
