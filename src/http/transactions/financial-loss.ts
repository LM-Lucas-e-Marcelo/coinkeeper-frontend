import { api } from '../api-client'

interface PayOffTransactionRequest {
  transactionId: string
}

export async function financialLoss({
  transactionId,
}: PayOffTransactionRequest) {
  const result = api
    .patch(`customer-transactions/${transactionId}/mark-prejudice`)
    .json()

  return result
}
