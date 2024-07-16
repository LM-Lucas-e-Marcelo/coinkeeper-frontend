import { api } from '../api-client'

export interface ICustomer {
  id: number
  name: string
  totalDebt: number
}

export interface ICustomers {
  items: ICustomer[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetCustomers {
  per?: string
  content?: string
}

export async function getCustomers({
  content = '',
  per = '',
}: IGetCustomers): Promise<{ customers: ICustomers }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const result = await api.get(`customers/search?${queryParams.toString()}`, {
    next: {
      tags: ['customers'],
    },
  })

  const customers = await result.json<ICustomers>()

  return { customers }
}
