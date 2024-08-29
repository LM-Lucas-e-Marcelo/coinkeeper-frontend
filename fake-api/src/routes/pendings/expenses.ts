import { Elysia } from 'elysia'
import { PendingExpenses } from '../../schemas/pending/pending-expenses'

const pendingExpensesRoute = new Elysia()

pendingExpensesRoute.get('/pendings/organization-expenses', ({ set }) => {
  set.status = 200

  return PendingExpenses
})

export { pendingExpensesRoute }
