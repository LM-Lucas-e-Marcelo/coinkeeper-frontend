import { Elysia } from 'elysia'
import {
  OrganizationExpenses,
  randomExpense,
} from '../schemas/organization-expenses'

const organizationExpensesRoute = new Elysia()

organizationExpensesRoute.get('/organization-expenses/search', ({ set }) => {
  set.status = 200

  return OrganizationExpenses
})

organizationExpensesRoute.get('/organization-expenses/:id', ({ set }) => {
  set.status = 200

  return randomExpense
})

organizationExpensesRoute.post('/organization-expenses', ({ set }) => {
  set.status = 201
})

organizationExpensesRoute.post(
  '/organization-expense-transactions',
  ({ set }) => {
    set.status = 201
  },
)

organizationExpensesRoute.patch('/organization-expenses/:id', ({ set }) => {
  set.status = 204
})

organizationExpensesRoute.patch(
  '/organization-expense-transactions/:id',
  ({ set }) => {
    set.status = 200
  },
)

organizationExpensesRoute.delete(
  '/organization-expense-transactions/:id',
  ({ set }) => {
    set.status = 204
  },
)

export { organizationExpensesRoute }
