import { useApiFetch } from '~/composables/useApiFetch'

export interface ICreateAddress {
  address_name: string
  zip_code: string
  street: string
  number: string
  city: string
  neighborhood: string
  state: string
  complement?: string
}

export interface IAddress {
  id: number
  patient_id: number
  address_name: string
  zip_code: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
  active: boolean
  registration_date: string
}
export const useAddressService = () => {
  const createAddress = async (data: ICreateAddress) => {
    return useApiFetch<any>('/address/create', {
      method: 'POST',
      body: data,
    })
  }
  const updateAddress = async (data: ICreateAddress, addressId: number) => {
    return useApiFetch(`/address/update/${addressId}`, {
      method: 'PATCH',
      body: data,
    })
  }

  const deleteAddress = async (addressId: number) => {
    return useApiFetch(`/address/delete/${addressId}`, {
      method: 'DELETE',
    })
  }

  const getAddresses = async () => {
    return useApiFetch<any>('/address/list', {
      method: 'GET',
    })
  }

  const setPrimary = async (addressId: number) => {
    return useApiFetch(`/address/set-primary/${addressId}`, {
      method: 'PATCH',
    })
  }
  return {
    createAddress,
    getAddresses,
    setPrimary,
    updateAddress,
    deleteAddress,
  }
}
