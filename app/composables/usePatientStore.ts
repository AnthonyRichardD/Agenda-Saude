import { useApiFetch } from '~/composables/useApiFetch'
interface CreateData {
  cpf: string
  full_name: string
  email: string
  phone: string
  birth_date: string
  health_conditions: string
  password: string
  confirmPassword: string
}

export const usePatientStore = () => {
  const createPatient = (data: CreateData) => {
    return useApiFetch<any>('/patient/create', {
      method: 'POST',
      body: data,
    })
  }

  return {
    createPatient,
  }
}
