<script setup lang="ts">
import moment from 'moment'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

console.log(props.data)

const formattedDate = computed(() => {
  if (!props.data.slot?.start_time) return ''
  const date = new Date(props.data.slot?.start_time)

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
})
</script>

<template>
  <div
    v-if="props.data"
    class="flex flex-col w-full rounded-[15px] items-center max-w-2xl bg-white border-2 border-[#5EEAD4] pl-8 pt-6 pr-2 pb-4"
  >
    <div class="flex w-full">
      <div class="flex w-full flex-col">
        <h1 class="relative text-[#042F2E] w-full text-[16px] font-semibold">
          {{ data.consultation_type.name }}
          <div
            class="absolute top-0 right-0 px-3 py-0.5 rounded-full flex items-center justify-center bg-[#99F6E480]"
          >
            <p class="text-[#3F3F46] text-[14px] font-medium text-center">
              Confirmada
            </p>
          </div>
        </h1>
        <p class="text-[#3F3F46] text-[14px] font-normal">
          {{ data.professional.name }}
        </p>
      </div>
    </div>
    <div class="flex w-full flex-col gap-1.5 mb-[10px] mt-2.5">
      <div class="flex items-center gap-1">
        <LucideCalendar class="mt-[-1px]" color="#134E4A" :size="16" />
        <p class="text-[#3F3F46] text-[14px] font-normal text-start">
          {{ formattedDate }}
        </p>
      </div>
      <div class="flex flex-row items-center gap-1">
        <LucideClock color="#134E4A" :size="16" />
        <p class="text-[#3F3F46] text-[14px] font-normal text-start">
          {{ moment(data.slot?.start_time).format('HH:mm') }}
        </p>
      </div>
    </div>

    <div class="flex flex-row justify-center gap-4 w-full pr-4">
      <button
        class="flex-1 h-[40px] border-2 border-[#99F6E4] rounded-[10px] text-[#042F2E] hover:bg-[#f1f1f1b2] active:scale-95 transition-all duration-150 ease-in-out"
      >
        Ver Detalhes
      </button>
      <button
        class="flex-1 h-[40px] border-2 border-[#EF4444CC] rounded-[10px] text-[#EF4444CC] hover:bg-[#f1f1f1b2] active:scale-95 transition-all duration-150 ease-in-out"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>
