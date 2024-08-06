import { api } from '../api-client'

interface CreateCustomerRequest {
  name: string
  document?: string | null
  phone?: string | null
  phoneWhatsapp?: string | null
  address?: string | null
  email?: string | null
  businessAddress?: string | null
  residentialAddress?: string | null
  documentFile?: File
  proofAddressFile?: File
}

export async function createCustomer({
  name,
  address,
  document,
  email,
  phone,
  phoneWhatsapp,
}: CreateCustomerRequest) {
  const result = await api
    .post('customers', {
      json: {
        name,
        address,
        document,
        email,
        phone,
        phoneWhatsapp,
      },
    })
    .json()

  return result
}
