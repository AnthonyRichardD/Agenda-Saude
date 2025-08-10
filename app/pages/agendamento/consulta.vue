<script setup lang="ts">
const useScheduling = useSchedulingStore()
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <div class="select-none">
      <div class="" @click="useScheduling.nextStep()">next</div>
      <div @click="useScheduling.prevStep()">prev</div>
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
