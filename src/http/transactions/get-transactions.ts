import { api } from '../api-client'

export interface IParcel {
  id: number
  dueDate: string
  observation: string | null
  parcel: number
  value: number
  paymentDate: string | null
}

export interface ITransactions {
  id: number
  totalParcels: number
  totalParcelsPaid: number
  differenceBetweenParcels: number
  description: string | null
  value: number
  paymentDate: string | null
  parcels: IParcel[]
}

export interface IGetTransactions {
  customerId: string
}

export async function getTransactions({
  customerId,
}: IGetTransactions): Promise<{ transactions: ITransactions[] }> {
  if (!customerId) return { transactions: [] }

  const result = await api.get(`customer-transactions/customer/${customerId}`, {
    next: {
      tags: ['transactions'],
    },
  })

  const transactions = await result.json<ITransactions[]>()

  return { transactions }
}
