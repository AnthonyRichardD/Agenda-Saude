<script setup lang="ts">
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
      <CustomCard />
    </div>

    <div v-else-if="currentTab === 'historico'"></div>
    <NavMenu />
  </div>
</template>
