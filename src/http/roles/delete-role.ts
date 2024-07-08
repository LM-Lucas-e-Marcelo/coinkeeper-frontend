import { api } from '../api-client'

interface DeleteRoleRequest {
  id: string
}

export async function deleteRole({ id }: DeleteRoleRequest) {
  const result = api.delete(`roles/${id}`).json()

  return result
}
