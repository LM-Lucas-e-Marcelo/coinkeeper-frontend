import { api } from '../api-client'

interface CreateTransactionRequest {
  customerId: string
  firstDueDate: string
  totalParcels: number
  description: string
  value: number
  differenceBetweenParcels?: number | null | undefined
}

export async function createTransaction({
  customerId,
  firstDueDate,
  totalParcels,
  description,
  value,
  differenceBetweenParcels,
}: CreateTransactionRequest) {
  const result = await api
    .post('customer-transactions', {
      json: {
        customerId,
        firstDueDate,
        totalParcels,
        description,
        value,
        differenceBetweenParcels,
      },
    })
    .json()

  return result
}
