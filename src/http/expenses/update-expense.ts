import { api } from '../api-client'

interface UpdateExpenseRequest {
  id: string
  name: string
}

export async function updateExpense({ id, name }: UpdateExpenseRequest) {
  const result = await api
    .patch(`organization-expenses/${id}`, {
      json: { name },
    })
    .json()

  return result
}
