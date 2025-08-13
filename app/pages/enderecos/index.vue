<script setup lang="ts">
import { useAddressService, type IAddress } from '~/services/useAddressService'

const myAddresses = ref<IAddress[]>([])

const addressSerice = useAddressService()
const useLoading = useLoadingStore()
const useAlert = useAlertStore()
const getMyAddresses = async () => {
  useLoading.loading = true
  try {
    const { data, error } = await addressSerice.getAddresses()

    if (error.value) {
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao listar os endereço'
      useAlert.showAlert('Erro na listagem de endereço', errorMessage, 'error')
    }

    if (data.value && !data.value.is_error) {
      myAddresses.value = data.value.data
    }
  } catch (error) {
    console.error(error)
  } finally {
    useLoading.loading = false
  }
}

const handlePrimaryChange = (updatedAddressId: number) => {
  const currentPrimary = myAddresses.value.find((addr) => addr.active === true)
  if (currentPrimary) {
    currentPrimary.active = false
  }

  const newPrimaryIndex = myAddresses.value.findIndex(
    (addr) => addr.id === updatedAddressId
  )

  if (newPrimaryIndex !== -1) {
    const [newPrimaryObject] = myAddresses.value.splice(newPrimaryIndex, 1)
    if (newPrimaryObject) {
      newPrimaryObject.active = true
      myAddresses.value.unshift(newPrimaryObject)
    }
  }
}
await getMyAddresses()
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <UIHeaderBack title="Meus Enderecos" link="/home">
      <button
        @click="navigateTo('/enderecos/novo')"
        type="button"
        class="flex items-center gap-2 bg-[#0D9488] text-white font-bold text-[18px] py-1 px-2 rounded-[10px]"
      >
        <LucidePlus :size="24" stroke-width="2" />
        Adicionar
      </button>
    </UIHeaderBack>

    <div class="w-full flex flex-col items-center justify-center gap-3.5">
      <EnderecoCard
        @defined-as-primary="handlePrimaryChange"
        v-for="address in myAddresses"
        :key="address.id"
        :data="address"
      />
    </div>
  </div>
</template>
