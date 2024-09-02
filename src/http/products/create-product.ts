import { api } from '../api-client'

interface CreateProductRequest {
  name: string
  parcels: number
  value: number
  companyExpense?: number | null
  differenceBetweenParcels?: number | null
}

export async function createProduct(props: CreateProductRequest) {
  const result = await api
    .post('products', {
      json: props,
    })
    .json()

  return result
}
