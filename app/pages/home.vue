<script setup lang="ts">
import {
  Pill,
  Plus,
  CalendarPlus,
  FileText,
  Phone,
  Syringe,
} from 'lucide-vue-next'
import { useConsultationService } from '~/services/useConsultationService'

definePageMeta({
  middleware: ['auth'],
})

const auth = useAuthStore()
const user = ref(auth.getUser())

const nextConsultations = ref([])

const consultationService = useConsultationService()
const useLoading = useLoadingStore()

const getConsultations = async () => {
  useLoading.loading = true
  try {
    const { data, error } =
      await consultationService.getNextConsultations('upcoming')

    if (error.value) {
      console.error('Erro ao buscar serviços:', error.value.message)
    }

    if (data.value && !data.value.is_error) {
      nextConsultations.value = data.value
    }
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
  } finally {
    useLoading.loading = false
  }
}

await getConsultations()
</script>

<template>
  <div
    class="flex flex-col w-full min-h-dvh bg-[#EAFDF9] p-[20px] pb-[70px] py-8 gap-3"
  >
    <div class="flex flex-row items-center justify-between gap-3">
      <div class="flex flex-col">
        <h1 class="text-[#042F2E] font-semibold text-[22px]">
          Olá, {{ user?.full_name.split(' ')[0] }}
        </h1>
        <p class="text-[#0F766E] text-[14px] font-medium">
          Como está sua saúde hoje?
        </p>
      </div>
      <div
        class="w-[65px] h-[65px] border-2 border-[#99F6E4] rounded-full"
      ></div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <h1 class="text-[#042F2E] font-semibold text-[22px]">
        Proximas Consultas
      </h1>
      <button
        type="button"
        @click="navigateTo('/agendamento/consulta')"
        class="flex flex-row items-center justify-center gap-2 h-[40px] px-2 text-white bg-[#0D9488] rounded-[10px] hover:bg-[#0F766E] active:bg-[#115E59] active:scale-95 transition-all duration-150 ease-in-out"
      >
        <Plus />
        Agendar
      </button>
    </div>

    <UCarousel
      v-if="nextConsultations.length > 0"
      :items="nextConsultations"
      :ui="{
        item: 'basis-full',
        container: 'rounded-lg',
      }"
      loop
      :autoplay="{ delay: 8000 }"
      wheel-gestures
      class="w-full"
    >
      <template #default="{ item }">
        <CustomCard :data="item" />
      </template>
    </UCarousel>

    <UCard v-else>
      <div class="text-center p-4">
        <p class="font-medium text-[#0F766E]">
          Você não possui nenhuma consulta agendada.
        </p>
      </div>
    </UCard>

    <h1 class="text-[#042F2E] font-semibold text-[22px]">Acesso Rápido</h1>
    <UCard
      class="flex flex-col w-full h-fit rounded-[15px] items-center max-w-2xl"
    >
      <div class="flex flex-row justify-center gap-4 w-full">
        <NuxtLink
          to="/agendamento/consulta"
          class="group flex flex-col items-center justify-center gap-1 w-[120px]"
        >
          <div
            class="bg-[#CCFBF1] rounded-[10px] p-4 transition-all duration-150 group-hover:bg-[#99F6E4] group-active:scale-95"
          >
            <CalendarPlus :size="30" />
          </div>
          <p class="text-[#3F3F46] text-[14px] font-normal text-center">
            Agendar
          </p>
        </NuxtLink>

        <NuxtLink
          class="group flex flex-col items-center justify-center gap-1 w-[120px]"
        >
          <div
            class="bg-[#8165FFCC] rounded-[10px] p-4 transition-all duration-150 group-hover:bg-[#7C3AED] group-active:scale-95"
          >
            <FileText :size="30" />
          </div>
          <p class="text-[#3F3F46] text-[14px] font-normal text-center">
            Exames
          </p>
        </NuxtLink>
      </div>

      <div class="flex flex-row justify-center gap-4 mt-2 w-full">
        <NuxtLink
          class="group flex flex-col items-center justify-center gap-1 w-[120px]"
        >
          <div
            class="bg-[#C98CDD] rounded-[10px] p-4 transition-all duration-150 group-hover:bg-[#D946EF] group-active:scale-95"
          >
            <Pill :size="30" />
          </div>
          <p class="text-[#3F3F46] text-[14px] font-normal text-center">
            Medicamentos
          </p>
        </NuxtLink>

        <NuxtLink
          class="group flex flex-col items-center justify-center gap-1 w-[120px]"
        >
          <div
            class="bg-[#D49090] rounded-[10px] p-4 transition-all duration-150 group-hover:bg-[#EF4444] group-active:scale-95"
          >
            <Phone :size="30" />
          </div>
          <p class="text-[#3F3F46] text-[14px] font-normal text-center">
            Emergência
          </p>
        </NuxtLink>
      </div>
    </UCard>

    <h1 class="text-[#042F2E] font-semibold text-[22px]">Lembretes de Saúde</h1>
    <UCard
      class="bg-[#C8FFF6] flex flex-col w-full h-fit rounded-[15px] max-w-2xl"
    >
      <div class="flex flex-row items-start gap-1">
        <Syringe :size="20" />
        <h1 class="text-[#042F2E] text-[14px] font-semibold text-start">
          Campanha de Vacinação
        </h1>
      </div>
      <div class="flex items-start mt-2">
        <p class="text-[#0F766E] text-[14px] font-medium text-start">
          Não esqueça de tomar sua vacina anual <br />contra a gripe. <br />
          Disponivel em todas as UBS.
        </p>
      </div>
    </UCard>
  </div>
</template>
