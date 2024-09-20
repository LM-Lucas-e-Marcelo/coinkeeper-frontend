import { api } from '../api-client'

interface addCustomerDocumentsRequest {
  customerId: number
  files: FormData
}

export async function addCustomerDocuments({
  customerId,
  files,
}: addCustomerDocumentsRequest) {
  const result = await api
    .post(`customers/${customerId}/medias`, {
      body: files,
    })
    .json()

  return result
}
