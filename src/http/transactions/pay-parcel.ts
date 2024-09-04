import { api } from '../api-client'

interface PayParcelRequest {
  paymentDate: string
  id: string
  transactionId: string
  observation?: string | null
  proofFile?: File
  sendMessage?: string | null
}

export async function payParcel({
  id,
  transactionId,
  sendMessage,
  ...rest
}: PayParcelRequest) {
  const formData = new FormData()

  Object.entries(rest).map(([key, value]) => formData.append(key, value!))

  const result = api
    .patch(
      `customer-transactions/${transactionId}/pay-parcel/${id}?sendMessage=${sendMessage}`,
      {
        body: formData,
      },
    )
    .json()

  return result
}
