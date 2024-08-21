import { api } from '../api-client'

interface CreateExpenseRequest {
  name: string
}

export async function createExpense({ name }: CreateExpenseRequest) {
  const result = await api
    .post('organization-expenses', {
      json: { name },
    })
    .json()

  return result
}
