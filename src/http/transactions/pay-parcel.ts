import { api } from '../api-client'

interface PayParcelRequest {
  paymentDate: string
  id: string
  transactionId: string
  observation?: string | null
}

export async function payParcel({
  id,
  transactionId,
  observation,
  paymentDate,
}: PayParcelRequest) {
  const result = api
    .patch(`customer-transactions/${transactionId}/pay-parcel/${id}`, {
      json: {
        paymentDate,
        observation,
      },
    })
    .json()

  return result
}
