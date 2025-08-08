<script setup lang="ts">
import { Calendar, Clock } from 'lucide-vue-next'
definePageMeta({
  middleware: ['auth'],
})

const items = ref<TabsItem[]>([
  {
    label: 'Próximas',
    value: 'proxima',
  },
  {
    label: 'Histórico',
    value: 'historico',
  },
])

const currentTab = ref('proxima')
</script>

<template>
  <div
    class="flex flex-col w-full min-h-dvh bg-[#EAFDF9] p-[20px] pb-[70px] py-8 gap-3"
  >
    <UTabs
      v-model="currentTab"
      color="secondary"
      :items="items"
      class="w-full"
    />

    <div v-if="currentTab === 'proxima'">
      <UCard
        class="flex flex-col w-full h-fit rounded-[15px] items-center max-w-2xl"
      >
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <h1 class="text-[#042F2E] text-[18px] font-normal">Consulta</h1>
            <p class="text-[#3F3F46] text-[14px] font-normal">Doutor</p>
          </div>

          <div
            class="flex w-[103px] h-[25px] bg-[#99F6E480] rounded-[25px] justify-center items-center"
          >
            <p class="text-[#3F3F46] text-[14px] font-normal text-center">
              Confirmada
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-1 mb-[10px]">
          <div class="flex flex-row items-center gap-1">
            <Calendar :size="15" />
            <p class="text-[#3F3F46] text-[14px] font-normal text-start">
              Data
            </p>
          </div>
          <div class="flex flex-row items-center gap-1">
            <Clock :size="15" />
            <p class="text-[#3F3F46] text-[14px] font-normal text-start">
              Hora
            </p>
          </div>
        </div>

        <div class="flex flex-row justify-center gap-4">
          <button
            class="w-[160px] h-[40px] border-2 border-[#99F6E4] rounded-[10px] text-[#042F2E] hover:bg-[#f1f1f1b2] active:scale-95 transition-all duration-150 ease-in-out"
          >
            Ver Detalhes
          </button>
          <button
            class="w-[160px] h-[40px] border-2 border-[#EF4444CC] rounded-[10px] text-[#EF4444CC] hover:bg-[#f1f1f1b2] active:scale-95 transition-all duration-150 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </UCard>
    </div>

    <div v-else-if="currentTab === 'historico'">
      <UCard
        class="flex flex-col w-full h-fit rounded-[15px] items-center justify-between max-w-2xl"
      >
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <h1 class="text-[#042F2E] text-[18px] font-normal">Consulta</h1>
            <p class="text-[#3F3F46] text-[14px] font-normal">Doutor</p>
          </div>

          <div
            class="flex w-[103px] h-[25px] bg-[#99F6E480] rounded-[25px] justify-center items-center"
          >
            <p class="text-[#3F3F46] text-[14px] font-normal text-center">
              Confirmada
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-1 mb-[10px]">
          <div class="flex flex-row items-center gap-1">
            <Calendar :size="15" />
            <p class="text-[#3F3F46] text-[14px] font-normal text-start">
              Data
            </p>
          </div>
          <div class="flex flex-row items-center gap-1">
            <Clock :size="15" />
            <p class="text-[#3F3F46] text-[14px] font-normal text-start">
              Hora
            </p>
          </div>
        </div>
      </UCard>
    </div>
    <NavMenu />
  </div>
</template>
