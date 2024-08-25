import { api } from '../api-client'

export interface ICustomerWithDebt {
  id: number
  name: string
  totalDebt: number
  totalParcels: number
}

export async function getCustomersWithDebt(): Promise<{
  customers: ICustomerWithDebt[]
}> {
  const result = await api.get(`customers/with-debt`, {
    next: {
      tags: ['customers-with-debt'],
    },
  })

  const customers = await result.json<ICustomerWithDebt[]>()

  return { customers }
}
