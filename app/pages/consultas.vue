<script setup lang="ts">
import { useConsultationService } from '~/services/useConsultationService'

definePageMeta({
  middleware: ['auth'],
})

interface TabsItem {
  label: string
  value: string
}
const items = ref<TabsItem[]>([
  {
    label: 'Próximas',
    value: 'next',
  },
  {
    label: 'Histórico',
    value: 'history',
  },
])

const currentTab = ref('next')

const consultationService = useConsultationService()
const appointments = ref([])
const useLoading = useLoadingStore()
const getnextAppointments = async () => {
  useLoading.loading = true
  const path = currentTab.value === 'next' ? 'upcoming' : 'history'
  try {
    const { data, error } = await consultationService.getNextConsultations(path)

    if (error.value) {
      console.error('Erro ao buscar serviços:', error.value.message)
    }

    if (data.value) {
      appointments.value = data.value
    }
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
  } finally {
    useLoading.loading = false
  }
}

await getnextAppointments()

watch(currentTab, async () => {
  await getnextAppointments()
})
</script>

<template>
  <div
    class="flex flex-col w-full min-h-dvh bg-[#EAFDF9] p-[20px] pb-[70px] py-8 gap-3"
  >
    <UIHeaderBack title="Minhas Consultas" link="/home" />

    <UTabs
      v-model="currentTab"
      color="secondary"
      :items="items"
      class="w-full"
    />

    <div v-if="appointments.length > 0" class="flex flex-col gap-3">
      <CustomCard
        v-for="item in appointments"
        :key="item.id"
        :data="item"
        type="next"
      />
    </div>
    <div class="w-full flex items-center justify-center" v-else>
      <p class="text-[#0F766E] text-[16px]">Nenhuma Registro encontrado</p>
    </div>
    <NavMenu />
  </div>
</template>
