import { api } from '../api-client'

export interface ICustomerById {
  id: number
  isActive: boolean
  name: string
  totalDebt: number
  document: string
  phone: string
  phoneWhatsapp: string
  address: string
  email: string
}

export interface IGetCustomerById {
  id: string
}

export async function getCustomerById({
  id,
}: IGetCustomerById): Promise<{ customer: ICustomerById | null }> {
  if (!id) return { customer: null }

  const result = await api.get(`customers/${id}`, {
    next: {
      tags: ['customer-by-id'],
    },
  })

  const customer = await result.json<ICustomerById>()

  return { customer }
}
