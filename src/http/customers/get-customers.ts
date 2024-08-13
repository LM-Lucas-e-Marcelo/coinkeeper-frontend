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
  [key: string]: string
}

export async function getCustomers(
  props: IGetCustomers,
): Promise<{ customers: ICustomers }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = await api.get(`customers/search?${queryParams.toString()}`, {
    next: {
      tags: ['customers'],
    },
  })

  const customers = await result.json<ICustomers>()

  return { customers }
}
