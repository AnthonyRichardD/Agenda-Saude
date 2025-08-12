import { useApiFetch } from '~/composables/useApiFetch'
export const useConsultationService = () => {
  const getConsultations = () => {
    return useApiFetch<any>('/consultationtype/list', {
      method: 'GET',
    })
  }

  return {
    getConsultations,
  }
}
