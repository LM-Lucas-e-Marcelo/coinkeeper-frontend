import { api } from '../api-client'

interface CreateExpenseTransactionRequest {
  expenseId: string
  description: string
  value: number
  dueDate?: string | null
  paymentDate?: string | null
}

export async function createExpenseTransaction({
  description,
  expenseId,
  value,
  dueDate,
  paymentDate,
}: CreateExpenseTransactionRequest) {
  const result = await api
    .post('organization-expense-transactions', {
      json: {
        description,
        expenseId,
        value,
        dueDate,
        paymentDate,
      },
    })
    .json()

  return result
}
