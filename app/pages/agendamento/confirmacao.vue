<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
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
            <h2 class="font-bold">Clínico Geral</h2>
            <p class="font-medium">Dr. João da Silva</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <LucideCalendar :size="24" color="#0F766E" />
          <div class="text-[15px] text-[#042F2E]">
            <h2 class="font-bold">15 de Agosto, 2025</h2>
            <p class="font-medium">Quarta-feira</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <LucideClock :size="24" color="#0F766E" />
          <div class="text-[15px] text-[#042F2E]">
            <h2 class="font-bold">09:30</h2>
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
