import { useApiFetch } from '~/composables/useApiFetch'

interface IEditPatientData {
  full_name: string
  email: string
  phone: string
  birth_date: string
}
export const usePatientService = () => {
  const updatePatient = (data: IEditPatientData) => {
    return useApiFetch<any>('/patient/me/edit', {
      method: 'PATCH',
      body: data,
    })
  }

  return {
    updatePatient,
  }
}
