import { Elysia } from 'elysia'
import { transactionList } from '../schemas/transactions'

const transactionsRoute = new Elysia()

transactionsRoute.delete('/customer-transactions/:customerId', ({ set }) => {
  set.status = 204
})

transactionsRoute.get(
  '/customer-transactions/customer/:customerId',
  ({ set }) => {
    set.status = 200

    return transactionList
  },
)

export { transactionsRoute }
