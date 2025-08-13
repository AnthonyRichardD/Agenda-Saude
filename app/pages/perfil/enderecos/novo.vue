<script setup lang="ts">
import {
  useAddressService,
  type ICreateAddress,
} from '~/services/useAddressService'

const useLoading = useLoadingStore()
const useAlert = useAlertStore()
const addressSerice = useAddressService()
const handleSubmit = async (data: ICreateAddress) => {
  useLoading.loading = true
  const payload = {
    ...data,
    zip_code: data.zip_code.replace(/\D/g, ''),
  }

  try {
    const { data, error } = await addressSerice.createAddress(payload)

    if (error.value) {
      const errorMessage =
        error.value.data?.message || 'Ocorreu um erro ao criar o endereço'
      useAlert.showAlert('Erro na Atualização', errorMessage, 'error')
    }

    if (data.value && !data.value.is_error) {
      useAlert.showAlert('Sucesso', 'Endereço criado com sucesso.', 'success')
      navigateTo('/perfil/enderecos')
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
    <UIHeaderBack title="Novo Endereço" link="/perfil/enderecos" />

    <EnderecoForm type="create" @form-submited="handleSubmit" />
  </div>
</template>
