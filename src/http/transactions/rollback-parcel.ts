import { api } from '../api-client'

interface RollbackParcelRequest {
  id: string
  transactionId: string
}

export async function rollbackParcel({
  id,
  transactionId,
}: RollbackParcelRequest) {
  const result = api
    .patch(`customer-transactions/${transactionId}/rollback-parcel-pay/${id}`)
    .json()

  return result
}
