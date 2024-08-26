import { api } from '../api-client'

export interface ITotalData {
  totalReceive: number
  totalExpense: number
}

export async function getTotalData(): Promise<{ data: ITotalData }> {
  const result = await api.get(`dashboard/total`, {
    next: {
      tags: ['get-total-data'],
    },
  })

  const data = await result.json<ITotalData>()

  return { data }
}
