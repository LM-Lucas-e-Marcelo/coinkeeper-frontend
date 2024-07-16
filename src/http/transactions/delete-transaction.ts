import { api } from '../api-client'

interface DeleteTransactionRequest {
  id: string
}

export async function deleteTransaction({ id }: DeleteTransactionRequest) {
  const result = api.delete(`customer-transactions/${id}`).json()

  return result
}
