import { api } from '../api-client'

export interface IDay {
  day: string
  value: number
}
export interface IMonthData {
  totalPeriod: number
  sold: {
    totalSold: number
    totalReceived: number
    totalReceivedDays: IDay[]
  }
  expense: {
    totalExpense: number
    totalPaid: number
    totalCompanyExpense: number
    totalExpenseWithCompany: number
  }
}

export interface IGetMonthData {
  searchParams: {
    [key: string]: string
  }
}

export async function getMonthData(
  props: IGetMonthData,
): Promise<{ data: IMonthData | null }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props.searchParams).map(([key, value]) =>
      queryParams.append(key, value),
    )
  }

  const result = await api.get(`dashboard/month?${queryParams.toString()}`, {
    next: {
      tags: ['get-month-data'],
    },
  })

  const data = await result.json<IMonthData>()

  return { data }
}
