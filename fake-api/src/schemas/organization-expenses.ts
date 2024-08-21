import { faker } from '@faker-js/faker'
import { IOrganizationExpense } from '../../../src/http/expenses/get-expenses'
import { formatGenericPayload } from '../utils/format-generic-payload'
import {
  IExpenseById,
  IExpenseTransaction,
} from '../../../src/http/expenses/get-expense-by-id'

export function createRandomOrganizationExpense(): IOrganizationExpense {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
  }
}

const expenseList = faker.helpers.multiple(createRandomOrganizationExpense, {
  count: 20,
})

export const OrganizationExpenses = formatGenericPayload<
  IOrganizationExpense[]
>({
  data: expenseList,
})

function createRandomExpenseTransaction(): IExpenseTransaction {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    description: faker.person.fullName(),
    value: faker.number.int({ min: 1, max: 1000 }),
    paymentDate: '2024-04-09',
    dueDate: '2024-04-05',
  }
}

const expenseTransactionList: IExpenseTransaction[] = faker.helpers.multiple(
  createRandomExpenseTransaction,
  {
    count: 10,
  },
)

function createRandomExpense(): IExpenseById {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    transactions: expenseTransactionList,
  }
}

export const randomExpense = createRandomExpense()
