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

  return {
    getConsultations,
    getProfessionalsByService,
    getAvailableDaysByProfessional,
  }
}
