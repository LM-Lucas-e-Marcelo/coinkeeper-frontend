import { api } from '../api-client'

interface PayOffTransactionRequest {
  transactionId: string
  sendMessage?: string | null
}

export async function payOffTransaction({
  transactionId,
  sendMessage,
}: PayOffTransactionRequest) {
  const result = api
    .patch(
      `customer-transactions/${transactionId}/pay-off?sendMessage=${!!sendMessage}`,
    )
    .json()

  return result
}
