import { api } from '../api-client'

interface CreateCustomerRequest {
  name: string
  email?: string | null
  address?: string | null
  document?: string | null
  phone?: string | null
  phoneWhatsapp?: string | null
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
