import { useApiFetch } from '~/composables/useApiFetch'
export const useConsultationService = () => {
  const getConsultations = () => {
    return useApiFetch<any>('/consultationtype/list', {
      method: 'GET',
    })
  }
  const getProfessionalsByService = (serviveId: string) => {
    return useApiFetch<any>(`/consultationtype/${serviveId}/professionals`, {
      method: 'GET',
    })
  }

  const getAvailableDaysByProfessional = (professionalId: string) => {
    return useApiFetch<any>(`/professionals/${professionalId}/available-days`, {
      method: 'GET',
    })
  }
  const getAvailableSlotByProfessional = (
    professionalId: string,
    date: string
  ) => {
    return useApiFetch<any>(
      `/professionals/${professionalId}/available-slots?date=${date}`,
      {
        method: 'GET',
      }
    )
  }

  const createConsultation = (data: {
    professional_id: number
    consultation_type_id: number
    slot_id: number
  }) => {
    return useApiFetch<any>('/appointments/create', {
      method: 'POST',
      body: data,
    })
  }

  return {
    getConsultations,
    getProfessionalsByService,
    getAvailableDaysByProfessional,
    getAvailableSlotByProfessional,
    createConsultation,
  }
}
