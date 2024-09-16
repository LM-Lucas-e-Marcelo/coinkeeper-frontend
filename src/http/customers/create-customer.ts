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
  regionId?: string | null
}

export async function createCustomer(props: CreateCustomerRequest) {
  const formData = new FormData()

  Object.entries(props).map(([key, value]) => formData.append(key, value))

  const result = await api
    .post('customers', {
      body: formData,
    })
    .json()

  return result
}
