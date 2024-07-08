import { api } from '../api-client'

interface CreateRoleRequest {
  name: string
}

export async function createRole({ name }: CreateRoleRequest) {
  const result = api
    .post('roles', {
      json: {
        name,
      },
    })
    .json()

  return result
}
