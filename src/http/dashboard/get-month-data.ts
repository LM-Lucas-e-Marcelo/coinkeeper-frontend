import { api } from '../api-client'

export interface IMonthData {
  totalPeriod: number
  sold: {
    totalSold: number
    totalReceived: number
  }
  expense: {
    totalExpense: number
    totalPaid: number
    totalCompanyExpense: number
  }
}

export interface IGetMonthData {
  date: Date
}

export async function getMonthData({
  date,
}: IGetMonthData): Promise<{ data: IMonthData | null }> {
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const result = await api.get(`dashboard/month?date=${year}-${month}`, {
    next: {
      tags: ['get-month-data'],
    },
  })

  const data = await result.json<IMonthData>()

  return { data }
}
