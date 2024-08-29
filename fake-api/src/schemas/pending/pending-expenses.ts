import { IExpense } from '../../../../src/http/pending/get-pending-expenses'
import { faker } from '@faker-js/faker'

export function createRandomExpense(): IExpense {
  return {
    id: faker.number.int({ max: 1000, min: 1 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ max: 1000, min: 1 }),
  }
}

const expensesList: IExpense[] = faker.helpers.multiple(createRandomExpense, {
  count: 20,
})

export const PendingExpenses = {
  totalExpensesInDebt: faker.number.int({ max: 1000, min: 1 }),
  totalDue: faker.number.int({ max: 1000, min: 1 }),
  expenses: expensesList,
}
