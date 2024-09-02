import { api } from '../api-client'

interface CreateRegionRequest {
  name: string
}

export async function createRegion(props: CreateRegionRequest) {
  const result = await api
    .post('regions', {
      json: props,
    })
    .json()

  return result
}
