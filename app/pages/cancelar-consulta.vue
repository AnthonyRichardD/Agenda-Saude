<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

const auth = useAuthStore()
const user = ref(auth.getUser())
</script>

<template>
  <div
    class="flex flex-col w-full min-h-dvh bg-[#EAFDF9] p-[20px] pb-[70px] py-8 gap-3"
  >
    <UCard
      class="flex flex-col bg-[#FEE2E2CA] w-full h-fit rounded-[15px] items-center max-w-2xl"
    >
      <div class="flex flex-row items-center gap-1">
        <TriangleAlert color="#B91C1C" :size="22" />
        <h1 class="text-[#B91C1C] font-semibold text-[16px]">Atenção</h1>
      </div>
      <p class="text-[#B91C1C] text-[14px] font-normal pl-7 pt-2">
        O cancelamento da consulta deve ser feito com pelo menos 24 horas de
        antecedência. Cancelamentos frequentes podem afetar futuros
        agendamentos.
      </p>
    </UCard>
    <UCard
      class="flex flex-col w-full h-fit rounded-[15px] items-start max-w-2xl"
    >
      <h1 class="text-[#042F2E] text-[18px] font-normal">
        Consulta a ser cancelada
      </h1>
      <p class="text-[#3F3F46] text-[14px] font-normal">
        Clinico geral - Dr. Carlos Roberto <br />
        14/05/2025 às 15:20
      </p>
    </UCard>
    <UCard
      class="flex flex-col w-full h-fit rounded-[15px] items-start max-w-2xl"
    >
      <h1 class="text-[#B91C1C] font-semibold text-[16px]">
        Motivo do Cancelamento
      </h1>
      <UIFormCheckBox label="Conflito de hórario" />
      <UIFormCheckBox label="Problema de saúde" />
      <UIFormCheckBox label="Viagem" />
      <UIFormCheckBox label="Compromisso de trabalho" />
      <UIFormCheckBox label="Outro Motivo?" />
    </UCard>
    <UCard
      class="flex flex-col w-full h-fit rounded-[15px] items-start max-w-2xl"
    >
      <div class="flex flex-col">
        <h1 class="text-[#042F2E] text-[18px] font-normal">
          Observações (Opcional)
        </h1>
        <p class="text-[#3F3F46] text-[14px] font-normal">
          Detalhes adicionais
        </p>
      </div>
      <textarea
        class="w-[350px] h-fit border-2 border-[#3F3F4633] rounded-[10px] resize-none"
      >
      </textarea>
    </UCard>

    <div class="flex flex-col items-center justify-center gap-2">
      <button
        class="w-[400px] h-[40px] bg-[#EF4444CC] rounded-[10px] text-[#fff] active:scale-95 transition-all duration-150 ease-in-out"
      >
        Confirmar cancelamento
      </button>
      <button
        class="w-[400px] h-[40px] border-2 border-[#99F6E4] rounded-[10px] text-[#042F2E] hover:bg-[#f1f1f1b2] active:scale-95 transition-all duration-150 ease-in-out"
      >
        Voltar
      </button>
    </div>

    <NavMenu />
  </div>
</template>
