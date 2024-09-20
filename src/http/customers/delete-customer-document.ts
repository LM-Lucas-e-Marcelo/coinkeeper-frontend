import { api } from '../api-client'

interface DeleteCustomerDocumentRequest {
  customerId: string
  fileId: string
}

export async function deleteCustomerDocument({
  customerId,
  fileId,
}: DeleteCustomerDocumentRequest) {
  const result = api.delete(`customers/${customerId}/media/${fileId}`).json()

  return result
}
