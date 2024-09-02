import { api } from '../api-client'

export interface IRegion {
  id: number
  name: string
}

export interface IRegions {
  items: IRegion[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export async function getRegions(): Promise<{ regions: IRegions }> {
  const result = await api.get(`regions/search`, {
    next: {
      tags: ['regions'],
    },
  })

  const regions = await result.json<IRegions>()

  return { regions }
}
