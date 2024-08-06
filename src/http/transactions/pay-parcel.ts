import { api } from '../api-client'

interface PayParcelRequest {
  paymentDate: string
  id: string
  transactionId: string
  observation?: string | null
  proofFile?: File
}

export async function payParcel({
  id,
  transactionId,
  observation,
  paymentDate,
  proofFile,
}: PayParcelRequest) {
  const result = api
    .patch(`customer-transactions/${transactionId}/pay-parcel/${id}`, {
      json: {
        paymentDate,
        observation,
        proofFile,
      },
    })
    .json()

  return result
}
