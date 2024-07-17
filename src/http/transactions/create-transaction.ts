import { api } from '../api-client'

interface CreateTransactionRequest {
  customerId: string
  firstDueDate: string
  totalParcels: number
  description: string
  value: number
  differenceBetweenParcels?: number | null | undefined
  paymentDate?: string | null | undefined
}

export async function createTransaction({
  customerId,
  firstDueDate,
  totalParcels,
  description,
  value,
  differenceBetweenParcels,
  paymentDate,
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
        paymentDate,
      },
    })
    .json()

  return result
}
