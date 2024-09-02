import { api } from '../api-client'

interface DeleteRegionRequest {
  id: string
}

export async function deleteRegion({ id }: DeleteRegionRequest) {
  const result = await api.delete(`regions/${id}`).json()

  return result
}
