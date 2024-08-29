import { api } from '../api-client'

interface PayOffTransactionRequest {
  transactionId: string
}

export async function payOffTransaction({
  transactionId,
}: PayOffTransactionRequest) {
  const result = api
    .patch(`customer-transactions/${transactionId}/pay-off`)
    .json()

  return result
}
