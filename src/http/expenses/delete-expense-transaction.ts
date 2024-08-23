import { api } from '../api-client'

interface DeleteExpenseTransactionRequest {
  id: string
}

export async function deleteExpenseTransaction({
  id,
}: DeleteExpenseTransactionRequest) {
  const result = api.delete(`organization-expense-transactions/${id}`).json()

  return result
}
