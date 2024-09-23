import { Elysia } from 'elysia'
import { transactionList } from '../schemas/transactions'

const transactionsRoute = new Elysia()

transactionsRoute.post('/customer-transactions', ({ set }) => {
  set.status = 201
})

transactionsRoute.patch(
  '/customer-transactions/:id/pay-parcel/:parcelId',
  ({ set }) => {
    set.status = 200
  },
)

transactionsRoute.patch(
  '/customer-transactions/:id/rollback-parcel-pay/:parcelId',
  ({ set }) => {
    set.status = 200
  },
)

transactionsRoute.patch(
  '/customer-transactions/:id/mark-prejudice',
  ({ set }) => {
    set.status = 200
  },
)

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

transactionsRoute.patch('/customer-transactions/:id/pay-off', ({ set }) => {
  set.status = 200
})

export { transactionsRoute }
