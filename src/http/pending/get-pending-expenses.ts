import { api } from '../api-client'

export interface IExpense {
  id: number
  name: string
  totalDebt: number
}

export interface IPendingExpenses {
  totalExpensesInDebt: number
  totalDue: number
  expenses: IExpense[]
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
    `pendings/organization-expenses?${queryParams.toString()}`,
    {
      next: {
        tags: ['pending-expenses'],
      },
    },
  )

  const pendingExpenses = await result.json<IPendingExpenses>()

  return { pendingExpenses }
}
