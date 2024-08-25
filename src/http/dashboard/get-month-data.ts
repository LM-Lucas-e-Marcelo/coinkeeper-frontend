import { api } from '../api-client'

export interface IMonthData {
  sold: {
    totalSold: number
    totalReceived: number
  }
  expense: {
    totalExpense: number
    totalPaid: number
    companyExpenses: number
  }
}

export interface IGetMonthData {
  date: Date
}

export async function getMonthData({
  date,
}: IGetMonthData): Promise<{ data: IMonthData | null }> {
  const month = date.getMonth()
  const year = date.getFullYear()
  const result = await api.get(`dashboard/month?${year}-${month}`)

  const data = await result.json<IMonthData>()

  return { data }
}
