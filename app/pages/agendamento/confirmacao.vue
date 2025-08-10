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
      <h1 class="text-[#042F2E] text-[24px] font-semibold">
        Informações do Agendamento
      </h1>
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
