import { api } from '../api-client'

export interface IOrganizationExpense {
  id: number
  name: string
  totalDebt: number
}

export interface IOrganizationExpenses {
  items: IOrganizationExpense[]
  total: number
  currentPage: number
  lastPage: number
  limit: number
}

export interface IGetExpenses {
  [key: string]: string
}

export async function getExpenses(
  props: IGetExpenses,
): Promise<{ expenses: IOrganizationExpenses }> {
  const queryParams = new URLSearchParams()

  if (props) {
    Object.entries(props).map(([key, value]) => queryParams.append(key, value))
  }

  const result = await api.get(
    `organization-expenses/search?${queryParams.toString()}`,
    {
      next: {
        tags: ['expenses'],
      },
    },
  )

  const expenses = await result.json<IOrganizationExpenses>()

  return { expenses }
}
