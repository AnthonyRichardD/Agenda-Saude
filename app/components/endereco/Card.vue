<script setup lang="ts">
import type { IAddress } from '~/services/useAddressService'
import { useAddressService } from '~/services/useAddressService'

const props = defineProps({
  data: {
    type: Object as () => IAddress,
    required: true,
  },
})

const emit = defineEmits(['definedAsPrimary'])
const useLoading = useLoadingStore()
const useAlert = useAlertStore()
const addressSerice = useAddressService()
const updatePrimary = async (addressId: number) => {
  console.log('1. Botão clicado, iniciando updatePrimary.') // NOVO LOG
  useLoading.loading = true
  try {
    const response = await addressSerice.setPrimary(addressId)
    const { data, error } = response

    if (error.value) {
      const errorMessage =
        error.value.data?.message ||
        'Ocorreu um erro ao definir o endereço como principal'
      useAlert.showAlert(
        'Erro ao definir endereço como principal',
        errorMessage,
        'error'
      )
    }

    if (data.value && !data.value.is_error) {
      console.log('2. API respondeu com sucesso. Emitindo evento...') // NOVO LOG
      useAlert.showAlert(
        'Sucesso',
        'Endereço definido como principal.',
        'success'
      )
      emit('definedAsPrimary', props.data.id)
    }
  } catch (error) {
    console.error(error)
  } finally {
    useLoading.loading = false
  }
}
</script>

<template>
  <div
    class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-3.5 space-y-2.5"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <LucideMapPin :size="24" color="#115E59" />
        <span class="text-[#042F2E] text-[16px] font-medium">
          {{ data.address_name }}
        </span>

        <div
          v-if="data.active"
          class="flex items-center gap-1 bg-[#99F6E480] rounded-[60px] px-2 py-0.5 font-medium text-[#115E59]"
        >
          <LucideStar :size="12" />
          <span class="text-[10px]">Principal</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-3">
        <LucideSquarePen
          @click="console.log('editar')"
          class="cursor-pointer"
          :size="19"
          :stroke-width="2.5"
          color="#042F2E"
        />
        <LucideTrash2
          class="cursor-pointer"
          :size="19"
          :stroke-width="2"
          color="#B91C1C"
        />
      </div>
    </div>

    <div class="w-full gap-1.5">
      <p class="text-[#3F3F46B2] text-[13px] font-normal">
        {{ data.street }}, {{ data.number }}
      </p>
      <p class="text-[#3F3F46B2] text-[13px] font-normal">
        {{ data.neighborhood }} - {{ data.city }}/{{ data.state }}
      </p>
      <p class="text-[#3F3F46B2] text-[13px] font-normal">
        CEP: {{ (data.zip_code || '').replace(/(\d{5})(\d{3})/, '$1-$2') }}
      </p>
    </div>

    <button
      v-if="!data.active"
      type="button"
      @click="updatePrimary(data.id)"
      class="flex justify-center items-center gap-2 border-2 border-[#99F6E4] rounded-[10px] py-1 px-2 cursor-pointer"
    >
      <LucideStar :size="14" />
      <span class="text-[13px] font-medium text-[#115E59]">
        Definir como Principal
      </span>
    </button>
  </div>
</template>
