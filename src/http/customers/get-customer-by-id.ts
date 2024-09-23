import { api } from '../api-client'

export interface IMedia {
  id: number
  fileName: string
  file: string
  fileUrl: string
}

export interface ICustomerById {
  id: number
  isActive: boolean
  name: string
  score: number
  totalDebt: number
  document: string
  phone: string
  phoneWhatsapp: string
  email: string
  businessAddress: string
  residentialAddress: string
  region: {
    id: number
    name: string
  }
  medias: IMedia[]
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
