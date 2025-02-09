import { api } from '../api-client'

interface UpdateProductRequest {
  name: string
  value: number
  parcels: number
  id: string
  companyExpense?: number | null
  differenceBetweenParcels?: number | null
}

export async function updateProduct(props: UpdateProductRequest) {
  const { id, ...rest } = props
  const result = await api
    .patch(`products/${id}`, {
      json: rest,
    })
    .json()

  return result
}
