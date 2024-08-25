import { api } from '../api-client'

export interface ICustomer {
  id: number
  name: string
  totalDebt: number
}

export interface IPendingCustomers {
  totalClientsInDebt: number
  totalReceiver: number
  customers: ICustomer[]
}

export interface IGetPendingCustomers {
  [key: string]: string
}

export async function getPendingCustomers(
  props: IGetPendingCustomers,
): Promise<{ pendingCustomers: IPendingCustomers }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = await api.get(`pendings/customers?${queryParams.toString()}`, {
    next: {
      tags: ['pending-customers'],
    },
  })

  const pendingCustomers = await result.json<IPendingCustomers>()

  return { pendingCustomers }
}
