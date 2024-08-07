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

export async function createTransaction(props: CreateTransactionRequest) {
  const formData = new FormData()

  Object.entries(props).map(([key, values]) => formData.append(key, values))

  const result = await api
    .post('customer-transactions', {
      body: formData,
    })
    .json()

  return result
}
