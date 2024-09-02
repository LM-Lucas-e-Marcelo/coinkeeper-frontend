import { api } from '../api-client'

interface UpdateRegionRequest {
  id: string
  name: string
  document?: string | null
  phone?: string | null
  phoneWhatsapp?: string | null
  address?: string | null
  email?: string | null
  businessAddress?: string | null
  residentialAddress?: string | null
  documentFile?: File
  proofAddressFile?: File
  regionId?: string
}

export async function updateRegion(props: UpdateRegionRequest) {
  const { id, name } = props

  const result = await api
    .patch(`regions/${id}`, {
      json: {
        name,
      },
    })
    .json()

  return result
}
