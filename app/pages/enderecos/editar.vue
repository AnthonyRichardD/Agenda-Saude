<script setup lang="ts">
import {
  useAddressService,
  type IAddress,
  type ICreateAddress,
} from '~/services/useAddressService'

const useAddress = useAddressStore()

const { address } = storeToRefs(useAddress)
if (!address.value) {
  navigateTo('/enderecos')
}

const addressService = useAddressService()
const useAlert = useAlertStore()
const useLoading = useLoadingStore()
const handleSubmit = async (data: ICreateAddress) => {
  useLoading.loading = true
  const payload = {
    ...data,
    zip_code: data.zip_code.replace(/\D/g, ''),
  }

  try {
    const { data, error } = await addressService.updateAddress(
      payload,
      address.value.id
    )

    if (error.value) {
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao atualzar o endereço'
      useAlert.showAlert('Erro na Atualização', errorMessage, 'error')
    }

    if (data.value && !data.value.is_error) {
      useAlert.showAlert(
        'Sucesso',
        'Endereço atualizado com sucesso.',
        'success'
      )
      navigateTo('/enderecos')
      address.value = undefined
    }
  } catch (error) {
    useAlert.showAlert(
      'Erro na Atualização',
      'Erro interno no servidor, tente novamente mais tarde',
      'error'
    )
  } finally {
    useLoading.loading = false
  }
}
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <UIHeaderBack title="Editar Endereço" link="/enderecos" />

    <EnderecoForm type="update" @form-submited="handleSubmit" />
  </div>
</template>
