import { api } from '../api-client'

export interface IProduct {
  id: number
  name: string
  value: number
  parcels: number
}

export interface IProducts {
  items: IProduct[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetProducts {
  per?: string
  content?: string
}

export async function getProducts({
  content = '',
  per = '',
}: IGetProducts): Promise<{ products: IProducts }> {
  const queryParams = new URLSearchParams()

  if (content) {
    queryParams.append(per, content)
  }

  const result = await api.get(`products/search?${queryParams.toString()}`, {
    next: {
      tags: ['products'],
    },
  })

  const products = await result.json<IProducts>()

  return { products }
}
