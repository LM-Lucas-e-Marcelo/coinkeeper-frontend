import { api } from '../api-client'

interface UpdateCustomerRequest {
  id: string
  name: string
  document?: string | null
  phone?: string | null
  phoneWhatsapp?: string | null
  address?: string | null
  email?: string | null
  businessAddress?: string | null
  residentialAddress?: string | null
  regionId?: string
}

export async function updateCustomer(props: UpdateCustomerRequest) {
  const { id, ...rest } = props
  const formData = new FormData()

  Object.entries(rest).map(([key, value]) => formData.append(key, value!))

  const result = await api
    .patch(`customers/${id}`, {
      body: formData,
    })
    .json()

  return result
}
