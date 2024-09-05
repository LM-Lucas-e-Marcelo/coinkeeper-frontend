import { api } from '../api-client'

export interface ITotalData {
  totalReceive: number
  totalExpense: number
}

export interface IGetTotalData {
  searchParams: {
    [key: string]: string
  }
}

export async function getTotalData(
  props: IGetTotalData,
): Promise<{ total: ITotalData }> {
  const queryParams = new URLSearchParams()

  if (props.searchParams) {
    Object.entries(props.searchParams).map(([key, value]) =>
      queryParams.append(key, value),
    )
  }

  const result = await api.get(`dashboard/total?${queryParams.toString()}`, {
    next: {
      tags: ['get-total-data'],
    },
  })

  const total = await result.json<ITotalData>()

  return { total }
}
