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
  ...rest
}: PayParcelRequest) {
  const formData = new FormData()

  Object.entries(rest).map(([key, value]) => formData.append(key, value!))

  const result = api
    .patch(`customer-transactions/${transactionId}/pay-parcel/${id}`, {
      body: formData,
    })
    .json()

  return result
}
