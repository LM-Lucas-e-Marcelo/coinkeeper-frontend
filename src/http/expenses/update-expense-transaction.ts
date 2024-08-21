import { api } from '../api-client'

interface UpdateExpenseTransactionRequest {
  transactionId: string
  dueDate?: string | null
  paymentDate?: string | null
  description?: string | null
  value?: number | null
}

export async function updateExpenseTransaction({
  description,
  dueDate,
  paymentDate,
  transactionId,
}: UpdateExpenseTransactionRequest) {
  const result = await api
    .patch(`organization-expense-transactions/${transactionId}`, {
      json: {
        description,
        dueDate,
        paymentDate,
      },
    })
    .json()

  return result
}
