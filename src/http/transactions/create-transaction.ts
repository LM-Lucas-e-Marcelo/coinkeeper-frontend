import { api } from '../api-client'

interface CreateTransactionRequest {
  customerId: string
  firstDueDate: string
  totalParcels: number
  description: string
  value: number
  differenceBetweenParcels?: number | null
  companyExpense?: number | null
  contractFile?: File
}

export async function createTransaction({
  customerId,
  firstDueDate,
  totalParcels,
  description,
  value,
  differenceBetweenParcels,
  companyExpense,
  contractFile,
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
        companyExpense,
        contractFile,
      },
    })
    .json()

  return result
}
