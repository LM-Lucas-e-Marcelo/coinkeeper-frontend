import { api } from '../api-client'

export interface IExpenseTransaction {
  id: number
  description: string
  value: number
  dueDate: string
  paymentDate: string
}

export interface IExpenseById {
  id: number
  name: string
  totalDebt: number
  transactions: IExpenseTransaction[]
}

export interface IGetExpenseById {
  expenseId: string
}

export async function getExpenseById({
  expenseId,
}: IGetExpenseById): Promise<{ expenseById: IExpenseById }> {
  const result = await api.get(`organization-expenses/${expenseId}`, {
    next: {
      tags: ['expense-by-id'],
    },
  })

  const expenseById = await result.json<IExpenseById>()

  return { expenseById }
}
