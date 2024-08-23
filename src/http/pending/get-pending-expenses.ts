import { api } from '../api-client'

export interface IExpense {
  id: number
  name: string
  totalDebt: number
}

export interface IItem {
  totalExpensesInDebt: number
  totalDue: number
  expenses: IExpense[]
}

export interface IPendingExpenses {
  items: IItem
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetPendingExpenses {
  [key: string]: string
}

export async function getPendingExpenses(
  props: IGetPendingExpenses,
): Promise<{ pendingExpenses: IPendingExpenses }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = await api.get(
    `pendings/organization-expenses/search?${queryParams.toString()}`,
    {
      next: {
        tags: ['pending-expenses'],
      },
    },
  )

  const pendingExpenses = await result.json<IPendingExpenses>()

  return { pendingExpenses }
}
